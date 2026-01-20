import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BACKEND_ENDPOINTS } from '../../config';

// Temanızdaki renkler
const MOR = '#5a7ede';

export default function WaitScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    // 1. TEST EKRANINDAN GELEN VERİLERİ AL
    // @ts-ignore
    const { imageUri, answers, userBio } = route.params || {};

    useEffect(() => {
        const connectToServer = async () => {
            // Veri kontrolü
            if (!imageUri) {
                Alert.alert("Hata", "Veri bulunamadı!");
                navigation.goBack();
                return;
            }

            try {
                console.log("🚀 WaitScreen: Server'a bağlanılıyor...");

                // 2. FORMDATA HAZIRLA
                const formData = new FormData();
                
                // Dosya adını ve türünü çıkar
                let filename = imageUri.split('/').pop();
                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image/jpeg`;

                // Resmi Ekle
                // @ts-ignore
                formData.append('image', { uri: imageUri, name: filename, type });
                
                // Cevapları Ekle
                formData.append('answers', JSON.stringify(answers));
                formData.append('user_biometrics', JSON.stringify(userBio));
                // 3. SERVER'A POST İSTEĞİ AT (Config'den IP alınıyor)
                const response = await fetch(BACKEND_ENDPOINTS.ANALYZE_FULL, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                const result = await response.json();
                console.log("✅ Server Cevabı:", result);

                if (result.status === 'success') {
                    // 4. BAŞARILI İSE RESULT EKRANINA GİT
                    // (navigation as any) kullanarak TypeScript'i susturuyoruz
                    (navigation as any).navigate('Result', { 
                        analysisResult: result // Tüm raporu (AI, Ürünler, Alışkanlıklar) taşıyoruz
                    });
                } else {
                    Alert.alert("Analiz Hatası", result.error || "Bilinmeyen bir hata oluştu.");
                    navigation.goBack();
                }

            } catch (error) {
                console.error("Server Hatası:", error);
                Alert.alert(
                    "Bağlantı Hatası", 
                    `Server'a ulaşılamadı.\n1. Bilgisayarın ve telefonun aynı Wi-Fi'da mı?\n2. Server açık mı?\n3. IP adresini kontrol edin: ${BACKEND_ENDPOINTS.ANALYZE_FULL}`
                );
                navigation.goBack();
            }
        };

        // Sayfa açılınca fonksiyonu çalıştır
        connectToServer();

    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={MOR} />
            <Text style={styles.title}>Analiz yapılıyor...</Text>
            <Text style={styles.subtitle}>
                Cildiniz analiz ediliyor ve size özel tavsiyeler hazırlanıyor.
                Lütfen bekleyiniz.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#aae8af', // Senin yeşil arka planın
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        marginTop: 10,
        textAlign: 'center',
        paddingHorizontal: 40,
        opacity: 0.9
    }
});