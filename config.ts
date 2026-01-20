/**
 * Backend Server Configuration
 * Bu dosya backend server IP adresini yönetir.
 * 
 * IP adresini otomatik bulmak için:
 * Windows PowerShell: Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*" -or $_.IPAddress -like "172.*"} | Select-Object -First 1 IPAddress
 * 
 * Veya manuel olarak backend'i başlattığınızda gösterilen IP adresini buraya yazın.
 */

// Backend server IP adresi
// Windows'ta IP'yi bulmak için PowerShell'de şu komutu çalıştırın:
// Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*" -or $_.IPAddress -like "172.*"} | Select-Object -First 1 IPAddress
export const BACKEND_IP = '172.20.10.4'; // Bu IP'yi güncelleyin

// Backend server portu
export const BACKEND_PORT = 5000;

// Backend base URL'i oluştur
export const BACKEND_URL = `http://${BACKEND_IP}:${BACKEND_PORT}`;

// Backend endpoint'leri
export const BACKEND_ENDPOINTS = {
  ANALYZE_FULL: `${BACKEND_URL}/analyze_full`,
};
