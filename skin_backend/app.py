import os
import numpy as np
import pickle
import io
import json
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image

# Senin yazdığın Alışkanlık Motoru (habit_engine.py dosyasından)
from habit_engine import get_detailed_plan 

app = Flask(__name__)

# ==========================================================
# 1. MODELLERİ YÜKLEME (Resimdeki Dosya İsimlerine Göre)
# ==========================================================
print("\n⏳ SİSTEM BAŞLATILIYOR... MODELLER YÜKLENİYOR...")

# --- A. GÖRÜNTÜ MODELLERİ ---
try:
    # Resimdeki isim: skin_disease_model.h5
    MODEL_DISEASE = load_model('skin_disease_model.h5')
    
    # Resimdeki isim: best_skin_model.h5
    MODEL_SKIN = load_model('best_skin_model.h5')
    
    print("✅ Görüntü Modelleri (Hastalık & Cilt Tipi) Yüklendi.")
except Exception as e:
    print(f"❌ HATA: .h5 modelleri yüklenemedi! Dosya isimlerini kontrol et. Hata: {e}")
    MODEL_DISEASE = None
    MODEL_SKIN = None

try:
    with open('tfidf_model.pkl', 'rb') as f: tfidf = pickle.load(f)
    with open('tfidf_matrix.pkl', 'rb') as f: matrix = pickle.load(f)
    with open('products_df.pkl', 'rb') as f: products_df = pickle.load(f)
    from sklearn.metrics.pairwise import linear_kernel
    print("✅ Ürün Öneri Modelleri (Pickle Dosyaları) Yüklendi.")
except Exception as e:
    print(f"⚠️ UYARI: Model-3 dosyaları eksik veya hatalı. Hata: {e}")
    tfidf = None

LABELS_SKIN = ['Kuru', 'Normal', 'Yagli'] 
LABELS_DISEASE = ['Akne', 'GozTorbasi', 'Kizariklik'] 

# ==========================================================
# 3. YARDIMCI FONKSİYONLAR
# ==========================================================
def preprocess_image(img_bytes):
    """Resmi 224x224 boyutuna getirir ve normalize eder"""
    img = Image.open(io.BytesIO(img_bytes)).convert('RGB')
    img = img.resize((224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Normalize (0-1 arası)
    return img_array

def get_product_recommendations(cilt_tipi, sorun):
    """Model-3: Ürün Önerisi"""
    if tfidf is None: return []
    
    QUERY_MAP = {
        "akne": "salicylic acid benzoyl peroxide tea tree niacinamide pimple",
        "yagli": "oil control mattifying clay charcoal zinc sebum",
        "kuru": "hyaluronic acid ceramide moisturizing shea butter hydrating",
        "leke": "vitamin c retinol glycolic acid brightening dark spot",
        "kizariklik": "aloe vera panthenol soothing sensitive cica",
        "normal": "gentle daily cleanser spf balanced",
        "goztorbasi": "caffeine eye cream cooling peptide",
        "yok": "daily care protection"
    }
    
    cilt_key = cilt_tipi.lower() if cilt_tipi else "normal"
    sorun_key = sorun.lower() if sorun else "yok"
    
    keywords = f"{QUERY_MAP.get(cilt_key, '')} {QUERY_MAP.get(sorun_key, '')}"
    
    try:
        user_tfidf = tfidf.transform([keywords])
        cosine_sim = linear_kernel(user_tfidf, matrix)
        sim_scores = sorted(list(enumerate(cosine_sim[0])), key=lambda x: x[1], reverse=True)
        
        top_products = []
        for i in range(min(4, len(sim_scores))):
            idx = sim_scores[i][0]
            p = products_df.iloc[idx].fillna("").to_dict()
            top_products.append(p)
        return top_products
    except Exception as e:
        print(f"Ürün önerisi hatası: {e}")
        return []

# ==========================================================
# 4. ANA ENDPOINT (BEYİN)
# ==========================================================
@app.route('/analyze_full', methods=['POST'])
def analyze_full():
    if 'image' not in request.files:
        return jsonify({"error": "Resim gönderilmedi"}), 400
        
    file = request.files['image']
    
    try:
        answers = json.loads(request.form.get('answers', '{}'))
        user_bio = json.loads(request.form.get('user_biometrics', '{}'))
    except:
        answers = {}
        user_bio = {}
    
    ai_result = {
        "saglik_durumu": "Bilinmiyor",
        "cilt_tipi": "Bilinmiyor", 
        "sorun": "Yok",
        "guven_skoru": 0.0
    }
    
    try:
        processed_img = preprocess_image(file.read())
        
        if MODEL_DISEASE:
            disease_preds = MODEL_DISEASE.predict(processed_img, verbose=0)
            top_prob = np.max(disease_preds)
            THRESHOLD = 0.40 

            if top_prob < THRESHOLD:
                ai_result["saglik_durumu"] = "Saglikli"
            else:
                ai_result["saglik_durumu"] = "Sagliksiz"
                
            print(f"Model-1 (Hastalık): Skor={top_prob:.2f} -> Karar={ai_result['saglik_durumu']}")
        
        if MODEL_SKIN:
            preds = MODEL_SKIN.predict(processed_img, verbose=0)
            pred_skin = preds[0][0]  
            pred_issue = preds[1][0] 
            
            idx_skin = np.argmax(pred_skin)
            idx_issue = np.argmax(pred_issue)
            
            detected_skin = LABELS_SKIN[idx_skin]
            
            if pred_issue[idx_issue] > 0.40:
                detected_issue = LABELS_DISEASE[idx_issue]
            else:
                detected_issue = "yok"
            
            ai_result["cilt_tipi"] = detected_skin.lower()
            ai_result["sorun"] = detected_issue.lower()
            ai_result["guven_skoru"] = float(np.max(pred_skin))
            
    except Exception as e:
        print(f"AI Analiz Hatası: {e}")

    print(f"🧠 AI Sonuç (App'e Giden): {ai_result}")

    # --- 3. ÜRÜN ÖNERİSİ ---
    products = get_product_recommendations(ai_result['cilt_tipi'], ai_result['sorun'])

    # --- 4. ALIŞKANLIK TAVSİYESİ ---
    habits = get_detailed_plan(ai_result, answers)

    # --- 5. CEVAP ---
    return jsonify({
        "status": "success",
        "ai_analysis": ai_result,
        "recommended_products": products,
        "habit_plan": habits
    })

if __name__ == "__main__":
    print("\n🚀 SERVER BAŞLATILIYOR... IP ADRESİNİ NOT ET!")
    app.run(host='0.0.0.0', port=5000, debug=True)