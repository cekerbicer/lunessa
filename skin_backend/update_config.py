"""
Backend IP Adresini Otomatik Bulma ve Config Güncelleme Scripti
Windows'ta çalışır ve config.ts dosyasını otomatik günceller.
"""

import socket
import re
import os
import sys

def get_local_ip():
    """Yerel ağ IP adresini bulur"""
    try:
        # Dummy bir bağlantı yaparak yerel IP'yi bulur
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception as e:
        print(f"❌ IP bulunamadı: {e}")
        return None

def update_config_file(ip_address):
    """config.ts dosyasını günceller"""
    # Proje kök dizinine git
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    config_path = os.path.join(project_root, 'config.ts')
    
    if not os.path.exists(config_path):
        print(f"❌ config.ts dosyası bulunamadı: {config_path}")
        return False
    
    try:
        # Dosyayı oku
        with open(config_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # IP adresini güncelle
        pattern = r"export const BACKEND_IP = '[^']*';"
        replacement = f"export const BACKEND_IP = '{ip_address}';"
        
        new_content = re.sub(pattern, replacement, content)
        
        # Dosyayı yaz
        with open(config_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ config.ts güncellendi: BACKEND_IP = '{ip_address}'")
        return True
        
    except Exception as e:
        print(f"❌ Dosya güncellenirken hata: {e}")
        return False

if __name__ == "__main__":
    print("\n🔍 IP Adresi Aranıyor...")
    
    ip = get_local_ip()
    
    if ip:
        print(f"✅ IP Adresi Bulundu: {ip}")
        
        # Kullanıcıya sor
        response = input("\nconfig.ts dosyasını otomatik güncellemek ister misiniz? (e/h): ").strip().lower()
        
        if response == 'e' or response == 'evet':
            if update_config_file(ip):
                print("\n✅ Güncelleme tamamlandı!")
            else:
                print("\n⚠️  Manuel güncelleme gerekebilir.")
        else:
            print(f"\n💡 Manuel olarak config.ts dosyasında BACKEND_IP değerini '{ip}' olarak güncelleyin.")
    else:
        print("❌ IP adresi bulunamadı. Lütfen manuel olarak kontrol edin.")
        sys.exit(1)
