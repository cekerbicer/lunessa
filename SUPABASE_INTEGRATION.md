# Supabase Entegrasyon Dokümantasyonu

Bu dokümantasyon, projedeki Supabase veritabanı entegrasyonunu açıklar.

## 📊 Kullanılan Tablolar

### 1. `profiles`
Kullanıcı profil bilgileri.

**Sütunlar:**
- `id` (UUID, Primary Key) - Kullanıcı ID'si (auth.users ile ilişkili)
- `username` (Text) - Kullanıcı adı
- `email` (Text) - E-posta adresi
- `created_at` (Timestamp) - Kayıt tarihi

**Kullanım Yerleri:**
- `screens/anaSayfa/home.tsx` - Kullanıcı adı ve kayıt tarihi
- `screens/anaSayfa/profile.tsx` - Profil bilgileri
- `screens/testKısmı/results.tsx` - Kullanıcı adı gösterimi

### 2. `user_tests`
Kullanıcı test cevapları.

**Sütunlar:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key -> auth.users)
- `created_at` (Timestamp)
- `answers` (JSONB) - Test cevapları (21 soru)
- `result_summary` (Text, nullable)

**Kullanım Yerleri:**
- `screens/testKısmı/test.tsx` - Test cevaplarının kaydedilmesi

### 3. `output`
AI analiz sonuçları ve öneriler.

**Sütunlar:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key -> auth.users)
- `created_at` (Timestamp)
- `hastalik_riski` (Boolean) - Sağlık riski var mı?
- `saglik_durumu` (Text) - "Saglikli" veya "Sagliksiz"
- `cilt_tipi` (Text) - "kuru", "normal", "yagli"
- `sorun` (Text) - Tespit edilen sorun (akne, kizariklik, vb.)
- `habit_plan` (JSONB) - Önerilen alışkanlıklar listesi
- `products` (JSONB) - Önerilen ürünler listesi
- `ai_analysis_full` (JSONB) - Tam AI analiz sonucu

**Kullanım Yerleri:**
- `screens/testKısmı/results.tsx` - Analiz sonuçlarının kaydedilmesi
- `screens/anaSayfa/home.tsx` - Son analiz ve ürün önerileri
- `screens/anaSayfa/graphics.tsx` - İstatistikler ve grafikler
- `screens/testKısmı/habit.tsx` - Önerilen alışkanlıklar
- `screens/ilkAdım/login.tsx` - Kullanıcı durumu kontrolü

### 4. `user_habits`
Kullanıcının seçtiği aktif alışkanlıklar.

**Sütunlar:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key -> auth.users)
- `created_at` (Timestamp)
- `habit_id` (Text) - Alışkanlık ID'si (1-21 arası)
- `title` (Text) - Alışkanlık başlığı
- `description` (Text) - Alışkanlık açıklaması
- `category` (Text) - Kategori (Beslenme, Rutin, vb.)
- `priority` (Text) - Öncelik (critical, high, medium, low, info)
- `icon` (Text) - İkon adı

**Kullanım Yerleri:**
- `screens/anaSayfa/home.tsx` - Aktif alışkanlıklar listesi
- `screens/testKısmı/habit.tsx` - Alışkanlık seçimi ve kaydetme
- `screens/anaSayfa/graphics.tsx` - İstatistikler

### 5. `daily_logs`
Günlük alışkanlık takip kayıtları.

**Sütunlar:**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key -> auth.users)
- `habit_id` (Text) - Alışkanlık ID'si
- `log_date` (Date) - Tarih (YYYY-MM-DD formatında)
- `is_completed` (Boolean) - Tamamlandı mı?

**Kullanım Yerleri:**
- `screens/anaSayfa/home.tsx` - Günlük durum ve streak hesaplama
- `screens/anaSayfa/graphics.tsx` - Haftalık tamamlama oranları

## 🔐 Authentication

Supabase Auth kullanılıyor:
- E-posta/Şifre ile giriş (`signInWithPassword`)
- Kayıt (`signUp`)
- Şifre sıfırlama (`resetPasswordForEmail`)

**Kullanım Yerleri:**
- `screens/ilkAdım/login.tsx`
- `screens/ilkAdım/register.tsx`
- `screens/anaSayfa/profile.tsx`

## 📝 Veri Akışı

1. **Kullanıcı Kaydı:**
   - `register.tsx` → `profiles` tablosuna kayıt

2. **Test Süreci:**
   - `test.tsx` → `user_tests` tablosuna cevaplar kaydedilir
   - `wait.tsx` → Backend'e analiz isteği gönderilir
   - `results.tsx` → Backend'den gelen sonuçlar `output` tablosuna kaydedilir

3. **Alışkanlık Seçimi:**
   - `habit.tsx` → Kullanıcı seçtiği alışkanlıklar `user_habits` tablosuna kaydedilir

4. **Günlük Takip:**
   - `home.tsx` → Kullanıcı alışkanlıkları tamamladıkça `daily_logs` tablosuna kayıt eklenir

## 🔧 Yapılandırma

Supabase yapılandırması `supabase.js` dosyasında:

```javascript
const supabaseUrl = 'https://xvhbqouyqafmcuimkbmn.supabase.co'
const supabaseAnonKey = 'sb_publishable_Pnz6yDP3iQC5EzTY9YPvrw_YRr5VFZ2'
```

## 📋 SQL Dosyaları

`supabase-tablolar/` klasöründe örnek veri dosyaları bulunur:
- `profiles_rows.sql`
- `user_tests_rows.sql`
- `user_habits_rows.sql`
- `output_rows.sql`
- `daily_logs_rows.sql`

Bu dosyalar tablo yapılarını ve örnek verileri gösterir.

## ⚠️ Önemli Notlar

1. **Row Level Security (RLS):** Supabase'de RLS politikalarının doğru yapılandırıldığından emin olun. Her kullanıcı sadece kendi verilerine erişebilmelidir.

2. **Foreign Key İlişkileri:** `user_id` sütunları `auth.users` tablosuna referans verir.

3. **JSONB Verileri:** `answers`, `habit_plan`, `products`, ve `ai_analysis_full` sütunları JSONB formatında saklanır.

4. **Tarih Formatı:** `log_date` sütunu Date tipindedir ve 'YYYY-MM-DD' formatında saklanır.
