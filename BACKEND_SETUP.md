# Backend IP Yapılandırma Kılavuzu

Bu kılavuz, backend server IP adresini dinamik olarak yapılandırmanız için adımları içerir.

## 🚀 Hızlı Başlangıç

### 1. Backend Server'ı Başlatın

```bash
cd skin_backend
python app.py
```

Server başladığında terminalde IP adresinizi göreceksiniz.

### 2. IP Adresini Güncelleyin

#### Yöntem 1: Otomatik Güncelleme (Önerilen)

**Windows PowerShell:**
```powershell
cd skin_backend
.\get_ip.ps1
```

Script IP adresinizi bulacak ve `config.ts` dosyasını güncellemeniz için talimat verecek.

**Python Script:**
```bash
cd skin_backend
python update_config.py
```

Script IP adresinizi bulacak ve otomatik olarak `config.ts` dosyasını güncelleyecek.

#### Yöntem 2: Manuel Güncelleme

1. IP adresinizi bulun:
   - Windows PowerShell: `ipconfig` komutunu çalıştırın
   - "IPv4 Address" değerini not edin (genellikle 192.168.x.x veya 172.x.x.x)

2. `config.ts` dosyasını açın ve `BACKEND_IP` değerini güncelleyin:

```typescript
export const BACKEND_IP = '192.168.1.100'; // Buraya kendi IP'nizi yazın
```

## 📝 Config Dosyası Yapısı

`config.ts` dosyası şu şekilde yapılandırılmıştır:

```typescript
export const BACKEND_IP = '172.20.10.4'; // Backend server IP adresi
export const BACKEND_PORT = 5000;        // Backend server portu
export const BACKEND_URL = `http://${BACKEND_IP}:${BACKEND_PORT}`;
export const BACKEND_ENDPOINTS = {
  ANALYZE_FULL: `${BACKEND_URL}/analyze_full`,
};
```

## 🔍 IP Adresi Nasıl Bulunur?

### Windows PowerShell Komutları:

**Yöntem 1: Get-NetIPAddress (Önerilen)**
```powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*" -or $_.IPAddress -like "172.*"} | Select-Object -First 1 IPAddress
```

**Yöntem 2: ipconfig**
```powershell
ipconfig | Select-String "IPv4"
```

### Linux/Mac:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

## ⚠️ Sorun Giderme

### Server'a bağlanılamıyor

1. **Aynı Wi-Fi ağında mısınız?**
   - Bilgisayarınız ve telefonunuz aynı Wi-Fi ağına bağlı olmalı

2. **Firewall ayarları:**
   - Windows Firewall Flask uygulamasına izin vermeli
   - Port 5000'in açık olduğundan emin olun

3. **IP adresi doğru mu?**
   - `config.ts` dosyasındaki IP adresini kontrol edin
   - Backend server'ın çalıştığı IP ile eşleşmeli

4. **Server çalışıyor mu?**
   - Terminalde hata mesajı var mı kontrol edin
   - Server başladığında "Running on http://0.0.0.0:5000" mesajını görmelisiniz

### IP adresi sürekli değişiyor

Eğer IP adresiniz her Wi-Fi bağlantısında değişiyorsa:

1. **Router ayarlarınızda DHCP rezervasyonu yapın:**
   - Router yönetim paneline girin
   - MAC adresinize sabit IP atayın

2. **Veya her seferinde script çalıştırın:**
   ```powershell
   cd skin_backend
   python update_config.py
   ```

## 📚 Daha Fazla Bilgi

- Backend dokümantasyonu: `skin_backend/README.md`
- Supabase entegrasyonu: `SUPABASE_INTEGRATION.md`
