# Lunessa (Skin Mobile)

Expo (React Native) ile geliştirilmiş mobil cilt analizi uygulaması. Kullanıcı fotoğraf + test cevaplarını gönderir, `skin_backend` (Flask) üzerinde çalışan modeller analiz yapar; sonuçlar ve öneriler Supabase’e kaydedilir ve uygulamada takip edilir.

## Özellikler

- **Auth**: Supabase e-posta/şifre giriş & kayıt
- **Fotoğraf + Test**: kamera/galeri + 21 soruluk test
- **AI Analiz**: Flask backend (`/analyze_full`) üzerinden cilt tipi / sorun / risk
- **Öneriler**: ürün önerileri + alışkanlık planı
- **Takip**: seçilen alışkanlıklar ve günlük log’lar (streak dahil)

## Proje Yapısı (kısaca)

- `screens/ilkAdım/*`: login/register/animasyon
- `screens/testKısmı/*`: photo/test/wait/results/habit
- `screens/anaSayfa/*`: home/graphics/profile
- `skin_backend/`: Flask AI server + modeller + öneri motoru
- `supabase-tablolar/`: örnek SQL çıktı dosyaları

## Kurulum

### 1) Mobil uygulama (Expo)

```bash
npm install
npm run start
```

Android için:

```bash
npm run android
```

### 2) Backend (Flask)

```bash
cd skin_backend
python app.py
```

Backend varsayılan olarak `0.0.0.0:5000` üzerinde çalışır.

## Backend IP Ayarı (Önemli)

Mobil uygulama backend’e `config.ts` üzerinden bağlanır:

- `config.ts` içindeki `BACKEND_IP` değerini **PC’nin güncel local IP’si** ile güncelle.
- `screens/testKısmı/wait.tsx` endpoint’i `BACKEND_ENDPOINTS.ANALYZE_FULL` üzerinden çağırır.

Windows’ta IP bulmak için:

```powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*" -or $_.IPAddress -like "172.*" -or $_.IPAddress -like "10.*"} | Select-Object -First 1 IPAddress
```

Alternatif: `skin_backend/get_ip.ps1` ve `skin_backend/update_config.py` yardımcı scriptleri mevcut.

Detay: `BACKEND_SETUP.md`

## Supabase

Supabase client ayarları `supabase.js` içindedir fakat **secret içerdiği için git ignore’dadır**.

Kendi bilgilerinizle local’de oluşturmanız beklenir:

- `supabaseUrl`
- `supabaseAnonKey`

Detay: `SUPABASE_INTEGRATION.md`

## Notlar

- Mobil cihaz ve PC **aynı Wi‑Fi** ağında olmalı (backend erişimi için).
- Windows Firewall port `5000` için izin isteyebilir.

