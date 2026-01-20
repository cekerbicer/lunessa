import json

# ==========================================
# 1. GÜNCEL TAVSİYE KÜTÜPHANESİ
# ==========================================
ADVICE_DB = {
    # --- SU & ALKOL & KAHVE ---
    "hydration_urgent": {
        "id": "1", "priority": "critical", "category": "Beslenme",
        "title": "🚨 Acil Nem Desteği: Su İç!", 
        "desc": "Kilona göre günde en az {0} litre su içmelisin. 1 litrenin altı cildini kurutur."
    },
    "hydration_warning": {
        "id": "2", "priority": "high", "category": "Beslenme",
        "title": "💧 Su Hedefini Güncelle",
        "desc": "Günde 1 litre su yetersiz. Cilt bariyerini güçlendirmek için en az 2 litreyi hedefle."
    },
    "alcohol_limit": {
        "id": "3", "priority": "high", "category": "Sağlık",
        "title": "🚫 Alkolü Sınırla, Nemini Koru",
        "desc": "Düzenli alkol tüketimi cildi aşırı kurutur, kızarıklığı ve erken yaşlanmayı artırır."
    },
    "coffee_balance": {
        "id": "4", "priority": "low", "category": "Beslenme",
        "title": "☕ Kahveye 'Su Eşlikçisi' Ekle",
        "desc": "Çok kahve içiyorsun. Her fincan kahve için ekstra bir bardak su içerek cildini nemli tutmalısın."
    },

    # --- BESLENME & AKNE ---
    "sugar_acne": {
        "id": "5", "priority": "critical", "category": "Diyet",
        "title": "🍭 Şeker Detoksuna Başla",
        "desc": "Şekerli gıdalar insülini yükseltip sivilceyi tetikler. Tüketimi azaltmak fark yaratacaktır."
    },
    "fastfood_warning": {
        "id": "6", "priority": "high", "category": "Diyet",
        "title": "🍔 Paketli Gıdalara Ara Ver",
        "desc": "İşlenmiş ve fast-food gıdalar vücutta inflamasyonu artırarak cildi matlaştırır."
    },
    "hormonal_acne": {
        "id": "7", "priority": "medium", "category": "Bilgi",
        "title": "🧬 Hormonal Dönem Koruması",
        "desc": "Çene hattındaki sivilceler genelde hormonaldir. Bu dönemlerde cildini daha nazik temizle."
    },

    # --- RUTİN & TEMİZLİK ---
    "soap_warning": {
        "id": "8", "priority": "critical", "category": "Rutin",
        "title": "🧼 Temizleme Jeliyle Tanış",
        "desc": "Cildini sadece suyla yıkamak gün boyu biriken yağı temizlemez. Nazik bir jel kullanmaya başla."
    },
    "cleansing_regular": {
        "id": "9", "priority": "medium", "category": "Rutin",
        "title": "✨ Rutini Asla Aksatma",
        "desc": "Düzensiz temizlik gözenekleri tıkar. Sabah ve akşam rutinini mutlaka her gün uygula."
    },
    "moisturizer_skip": {
        "id": "10", "priority": "high", "category": "Rutin",
        "title": "🧴 Nemi Cildine Hapset",
        "desc": "Cildin yağlı olsa bile neme ihtiyacı vardır. Nemlendiriciyi ihmal etmek cildi daha çok yağlandırır."
    },
    "sun_critical": {
        "id": "11", "priority": "critical", "category": "Koruma",
        "title": "☀️ Güneş Kremini Kalkan Yap",
        "desc": "Güneş kremi kullanmamak leke ve kırışıklığın ana sebebidir. Her sabah sürerek dışarı çık."
    },

    # --- YAŞAM TARZI & HİJYEN ---
    "pillow_hygiene": {
        "id": "12", "priority": "medium", "category": "Hijyen",
        "title": "🛌 Temiz Yastık, Temiz Cilt",
        "desc": "Yastık kılıfında biriken bakteriler sivilce yapar. Haftada en az 2 kez değiştirmeyi unutma."
    },
    "hand_face_contact": {
        "id": "13", "priority": "high", "category": "Hijyen",
        "title": "🛑 Ellerini Yüzünden Çek!",
        "desc": "Ellerindeki bakterileri yüzüne taşıyorsun. Sivilcelerle oynamak kalıcı iz bırakabilir."
    },
    "sleep_repair": {
        "id": "14", "priority": "high", "category": "Uyku",
        "title": "🌙 Gece Onarımına İzin Ver",
        "desc": "Cilt kendini gece onarır. 6 saatten az uyku, cildin yenilenme sürecini durdurur."
    },
    "stress_control": {
        "id": "15", "priority": "medium", "category": "Mental",
        "title": "🧘 Sakinleş ve Parlamasını İzle",
        "desc": "Yüksek stres cildin yağ dengesini bozar. Rahatlama egzersizleri cildine de iyi gelecektir."
    },
    "smoking_damage": {
        "id": "16", "priority": "critical", "category": "Sağlık",
        "title": "🚬 Oksijen Engellerini Kaldır",
        "desc": "Sigara cildin oksijen almasını engeller. Cildini onarmak için C Vitamini desteği alabilirsin."
    },
    "sweat_acne": {
        "id": "17", "priority": "medium", "category": "Spor",
        "title": "🏃 Terini Cildinde Bekletme",
        "desc": "Aktif olmak harika! Ancak ter gözenekleri tıkar, antrenman sonrası yüzünü hemen yıkamalısın."
    },

    # --- CİLT TİPİ FIX ---
    "oily_fix": {
        "id": "20", "priority": "info", "category": "Rutin",
        "title": "💎 Parlama Karşıtı Hamle",
        "desc": "Parlamayı kontrol altına almak için niacinamide içeren ürünler tercih edebilirsin."
    },
    "dry_fix": {
        "id": "21", "priority": "info", "category": "Rutin",
        "title": "🛡️ Bariyerini Onar ve Besle",
        "desc": "Kuruluk için seramid ve hyaluronik asit odaklı ürünlerle cildini besle."
    }
}

# ==========================================
# 2. MOTOR FONKSİYONU
# ==========================================
def get_detailed_plan(ai_result, answers):
    """
    answers: {'1': 'a', '2': '175', '3': '70', ...} şeklinde bir sözlük
    """
    recommendations = []
    
    # --- 1. SU TÜKETİMİ (Soru 3 ve 14) ---
    try:
        kilo = float(answers.get('3', 65))
    except:
        kilo = 65
    
    ideal_su = round(kilo * 0.033, 1)
    
    water_ans = answers.get('14')
    if water_ans == 'd': # Çok az
        rec = ADVICE_DB['hydration_urgent'].copy()
        rec['desc'] = rec['desc'].format(ideal_su)
        recommendations.append(rec)
    elif water_ans == 'c': # Orta
        recommendations.append(ADVICE_DB['hydration_warning'])

    # --- 2. BESLENME (Soru 15) ---
    diet_ans = answers.get('15')
    if diet_ans == 'c': # Şekerli/Hamur işi
        recommendations.append(ADVICE_DB['sugar_acne'])
    elif diet_ans == 'b': # Fast food
        recommendations.append(ADVICE_DB['fastfood_warning'])

    # --- 3. SİVİLCE BÖLGESİ (Soru 8) ---
    acne_loc = answers.get('8')
    if acne_loc == 'a': # Hormonal/Çene
        recommendations.append(ADVICE_DB['hormonal_acne'])

    # --- 4. TEMİZLİK ALIŞKANLIĞI (Soru 9) ---
    wash_ans = answers.get('9')
    if wash_ans == 'c': # Sadece su
        recommendations.append(ADVICE_DB['soap_warning'])
    elif wash_ans == 'd': # Düzensiz
        recommendations.append(ADVICE_DB['cleansing_regular'])

    # --- 5. NEMLENDİRİCİ (Soru 10) ---
    if answers.get('10') == 'd': # Genellikle kullanmam
        recommendations.append(ADVICE_DB['moisturizer_skip'])

    # --- 6. GÜNEŞ KREMİ (Soru 11) ---
    sun_ans = answers.get('11')
    if sun_ans in ['c', 'd']: # Sadece yazın veya Hiç
        recommendations.append(ADVICE_DB['sun_critical'])

    # --- 7. YASTIK KILIFI (Soru 12) ---
    pillow_ans = answers.get('12')
    if pillow_ans in ['c', 'd']: # 2 haftada bir veya ayda bir
        recommendations.append(ADVICE_DB['pillow_hygiene'])

    # --- 8. YÜZE DOKUNMA (Soru 13) ---
    touch_ans = answers.get('13')
    if touch_ans in ['c', 'd']: # Sürekli dokunma veya Sıkma
        recommendations.append(ADVICE_DB['hand_face_contact'])

    # --- 9. UYKU (Soru 16) ---
    sleep_ans = answers.get('16')
    if sleep_ans in ['c', 'd']: # Düzensiz veya Çok kötü
        recommendations.append(ADVICE_DB['sleep_repair'])

    # --- 10. KAFEİN (Soru 17) ---
    if answers.get('17') == 'd': # 4+ fincan
        recommendations.append(ADVICE_DB['coffee_balance'])

    # --- 11. ALKOL (Soru 18) ---
    if answers.get('18') in ['c', 'd']: # Sosyal veya Düzenli
        recommendations.append(ADVICE_DB['alcohol_limit'])

    # --- 12. SİGARA (Soru 19) ---
    if answers.get('19') in ['b', 'c']: # Sosyal veya Düzenli
        recommendations.append(ADVICE_DB['smoking_damage'])

    # --- 13. SPOR (Soru 20) ---
    if answers.get('20') == 'a': # Yüksek aktivite
        recommendations.append(ADVICE_DB['sweat_acne'])

    # --- 14. STRES (Soru 21) ---
    if answers.get('21') == 'c': # Yüksek
        recommendations.append(ADVICE_DB['stress_control'])

    # --- 15. CİLT TİPİ ÖZEL (AI Result) ---
    cilt_tipi = ai_result.get('cilt_tipi', 'normal').lower()
    if 'yagli' in cilt_tipi or 'karma' in cilt_tipi:
        recommendations.append(ADVICE_DB['oily_fix'])
    elif 'kuru' in cilt_tipi:
        recommendations.append(ADVICE_DB['dry_fix'])

    # Sıralama: Önce kritik olanlar
    priority_map = {'critical': 0, 'high': 1, 'medium': 2, 'low': 3, 'info': 4}
    recommendations.sort(key=lambda x: priority_map.get(x['priority'], 99))

    return recommendations

# ==========================================
# 3. FULL KAPSAM TEST ALANI (STRES TESTİ)
# ==========================================
if __name__ == "__main__":
    print("\n--- HABIT ENGINE FULL STRES TESTİ (KÖTÜ SENARYO) ---")
    
    # 1. AI Analiz Sonucu (Örn: Fotoğraf analizinden gelen veri)
    mock_ai = {
        "cilt_tipi": "yagli", 
        "sorun": "akne ve parlama"
    }
    
    # 2. Kullanıcı Cevapları (21 Soruluk Sisteme Göre)
    # Şıklar genellikle d veya c seçilerek 'en kötü' senaryo simüle edilmiştir.
    mock_answers = {
        "1": "a",   # Hedef: Sivilce azaltmak
        "2": "170", # Boy
        "3": "80",  # Kilo (Su hesabı için 80 * 0.033 = 2.6L çıkmalı)
        "4": "b",   # Genetik: Akne eğilimi
        "5": "d",   # İlaç: Ciltle alakalı ilaç kullanıyor
        "6": "b",   # Hassasiyet: Alerjik bünye
        "7": "b",   # Hissiyat: Her yer parlak ve yağlı
        "8": "a",   # Sivilce: Hormonal/Çene hattı (Tetikleyici uyarısı vermeli)
        "9": "c",   # Temizlik: Sadece suyla (Sabun/Su uyarısı vermeli)
        "10": "d",  # Nemlendirici: Kullanmıyor (Nemlendirici şart uyarısı)
        "11": "d",  # Güneş Kremi: Hiç kullanmıyor (Kritik uyarı)
        "12": "d",  # Yastık: Ayda bir (Hijyen uyarısı)
        "13": "d",  # Dokunma: Sivilce sıkma alışkanlığı (Kritik uyarı)
        "14": "d",  # Su: Çok az, 1-2 bardak (Dehidrasyon uyarısı)
        "15": "c",  # Beslenme: Şekerli/Hamur işi (Şeker detoksu uyarısı)
        "16": "d",  # Uyku: Çok kötü/Uykusuz (Onarım uyarısı)
        "17": "d",  # Kafein: 4+ fincan (Denge uyarısı)
        "18": "d",  # Alkol: Haftada 3+ (Kuruluk uyarısı)
        "19": "c",  # Sigara: Düzenli kullanıcı (Kolajen uyarısı)
        "20": "d",  # Aktivite: Hareketsiz
        "21": "c",  # Stres: Yüksek (Mental/Kortizol uyarısı)
    }
    
    # Fonksiyonu Çağırıyoruz
    results = get_detailed_plan(mock_ai, mock_answers)
    
    # Sonuçları Yazdırıyoruz
    print(f"Tespit Edilen Kritik Alışkanlık Sorunları: {len(results)}\n")
    
    for item in results:
        # Öncelik durumuna göre görsel işaret ekleyelim
        prefix = "🔴" if item['priority'] == 'critical' else "🟠" if item['priority'] == 'high' else "🟡"
        
        print(f"{prefix} [{item['priority'].upper()}] - {item['category']}")
        print(f"   Başlık: {item['title']}")
        print(f"   Öneri: {item['desc']}")
        print("-" * 50)