# Skin Backend - Flask AI Server

Bu klasör, cilt analizi için Flask tabanlı AI backend server'ını içerir.

## 📋 Gereksinimler

- Python 3.8+
- TensorFlow/Keras
- Flask
- PIL (Pillow)
- NumPy
- scikit-learn

## 🚀 Kurulum

1. Gerekli paketleri yükleyin:
```bash
pip install flask tensorflow pillow numpy scikit-learn pandas
```

2. Model dosyalarının mevcut olduğundan emin olun:
   - `best_skin_model.h5`
   - `skin_disease_model.h5`
   - `tfidf_model.pkl`
   - `tfidf_matrix.pkl`
   - `products_df.pkl`

## ▶️ Server'ı Başlatma

### Windows PowerShell:
```powershell
python app.py
```

### Linux/Mac:
```bash
python3 app.py
```

Server başladığında terminalde IP adresinizi göreceksiniz. Bu IP'yi `config.ts` dosyasına yazmanız gerekecek.

## 🔧 IP Adresini Otomatik Bulma

### Yöntem 1: PowerShell Script (Önerilen)
```powershell
cd skin_backend
.\get_ip.ps1
```

### Yöntem 2: Python Script
```bash
cd skin_backend
python update_config.py
```

### Yöntem 3: Manuel
Windows PowerShell'de:
```powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*" -or $_.IPAddress -like "172.*"} | Select-Object -First 1 IPAddress
```

Bulduğunuz IP'yi `config.ts` dosyasındaki `BACKEND_IP` değerine yazın.

## 📡 API Endpoint'leri

### POST /analyze_full
Cilt analizi için ana endpoint.

**Request:**
- `image`: Resim dosyası (multipart/form-data)
- `answers`: JSON string - Test cevapları
- `user_biometrics`: JSON string - Kullanıcı biyometrik verileri

**Response:**
```json
{
  "status": "success",
  "ai_analysis": {
    "saglik_durumu": "Saglikli",
    "cilt_tipi": "normal",
    "sorun": "akne",
    "guven_skoru": 0.95
  },
  "recommended_products": [...],
  "habit_plan": [...]
}
```

## 🔍 Sorun Giderme

### Server'a bağlanılamıyor
1. Bilgisayarınız ve telefonunuz aynı Wi-Fi ağında mı?
2. Firewall Flask uygulamasına izin veriyor mu?
3. IP adresi doğru mu? (`config.ts` dosyasını kontrol edin)
4. Server çalışıyor mu? (Terminalde hata var mı?)

### Model dosyaları bulunamıyor
- Model dosyalarının `skin_backend` klasöründe olduğundan emin olun
- Dosya isimlerinin doğru olduğunu kontrol edin

## 📝 Notlar

- Server varsayılan olarak `0.0.0.0:5000` adresinde çalışır
- Geliştirme modunda (`debug=True`) çalışır, production için değiştirin
- Model dosyaları büyük olduğu için ilk yükleme biraz zaman alabilir
