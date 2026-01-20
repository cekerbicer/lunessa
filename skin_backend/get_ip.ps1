# Windows PowerShell Script - Backend IP Adresini Otomatik Bulma
# Bu script bilgisayarınızın yerel IP adresini bulur ve config.ts dosyasını günceller

Write-Host "`n🔍 IP Adresi Aranıyor..." -ForegroundColor Cyan

# Yerel ağ IP adresini bul (192.168.x.x veya 172.x.x.x)
$ipAddress = Get-NetIPAddress -AddressFamily IPv4 | 
    Where-Object { 
        ($_.IPAddress -like "192.168.*") -or 
        ($_.IPAddress -like "172.*") -or
        ($_.IPAddress -like "10.*")
    } | 
    Where-Object { $_.InterfaceAlias -notlike "*Loopback*" -and $_.InterfaceAlias -notlike "*Virtual*" } |
    Select-Object -First 1 -ExpandProperty IPAddress

if ($ipAddress) {
    Write-Host "✅ IP Adresi Bulundu: $ipAddress" -ForegroundColor Green
    Write-Host "`n📝 Config dosyasını güncellemek için:" -ForegroundColor Yellow
    Write-Host "   config.ts dosyasındaki BACKEND_IP değerini '$ipAddress' olarak değiştirin" -ForegroundColor Yellow
    Write-Host "`n💡 Veya manuel olarak şu komutu kullanabilirsiniz:" -ForegroundColor Cyan
    Write-Host "   (Get-Content config.ts) -replace \"BACKEND_IP = '.*'\", \"BACKEND_IP = '$ipAddress'\" | Set-Content config.ts" -ForegroundColor Gray
} else {
    Write-Host "❌ IP Adresi Bulunamadı!" -ForegroundColor Red
    Write-Host "   Lütfen manuel olarak IP adresinizi kontrol edin:" -ForegroundColor Yellow
    Write-Host "   ipconfig" -ForegroundColor Gray
}

Write-Host "`n"
