import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions, // Kullanılmadığı için kaldırıldı (sadece stil dosyasında kaldı)
    StatusBar,
    Animated,
    Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 👈 YENİ: Navigasyon için
import { Feather, Ionicons } from '@expo/vector-icons';

// İçe aktarılan stil dosyası
import styles from '../../design/photoScreen';

// Renk tanımlarını sadece Icon bileşeninde kullanmak için tanımlıyoruz
const DARK_BLUE = '#2F3A66';
const LIGHT_GREEN = '#B7EACD';
const DARK_GREEN = '#16B576'; // Test butonu için kullanılacak


export default function PhotoScreen() {
    const navigation = useNavigation(); // 👈 YENİ: Navigasyon hook'u

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Ekranın içeriğinin yavaşça görünmesi için
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();

        // Yüz çerçevesi için nabız (pulse) animasyonu
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.05,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );
        pulse.start();

        return () => {
            pulse.stop();
        };
    }, []);

    const handleTakePhoto = () => {
        // Fotoğraf çekme mantığı buraya gelecek
        alert('Kamera entegrasyonu ve fotoğraf çekme işlemi burada yapılacak.');
    };

    const handleOpenGallery = () => {
        // Galeriye erişim mantığı buraya gelecek
        alert('Galeri entegrasyonu burada yapılacak.');
    };

    // 🚀 YENİ FONKSİYON: Test sayfasına yönlendirir
    const handleTest = () => {
        // App.tsx'te tanımlanan 'Test' ekranına yönlendir
        navigation.navigate('Test' as never);
    };

    // Alt butonlar için üç öğe kullanıyoruz: Galeri butonu, Çekim butonu ve bir placeholder
    return (
        <View style={styles.fullScreenContainer}>
            <StatusBar barStyle="light-content" />

            {/* Arkaplan gradient'i (placeholder) */}
            <View style={styles.gradientOverlay} />

            <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
                {/* Kamera Önizleme Alanı (Placeholder) */}
                <View style={styles.cameraPreview}>
                    {/* Yüzü hizalama metni */}
                    <Text style={styles.alignFaceText}>Yüzünüzü şeklin içine yerleştirin</Text>

                    {/* Yüz çerçevesi - Oval Şekil */}
                    <Animated.View
                        style={[
                            styles.faceFrame,
                            { transform: [{ scale: pulseAnim }] }
                        ]}
                    />

                    {/* Kamera Önizleme (Yer Tutucu Metin) */}
                    <Text style={{ color: LIGHT_GREEN, marginTop: 100 }}>Kamera Önizlemesi</Text>
                </View>

                {/* Alt butonlar: Sol (Galeri), Orta (Çekim), Sağ (Boşluk) */}
                <View style={styles.bottomControls}>

                    {/* 1. Galeri Butonu (Sol) */}
                    <TouchableOpacity style={styles.controlButton} onPress={handleOpenGallery}>
                        <Feather name="image" size={28} color={LIGHT_GREEN} />
                    </TouchableOpacity>
                 
                    {/* 2. Fotoğraf Çek Butonu (Orta) */}
                    <TouchableOpacity style={styles.captureButton} onPress={handleTakePhoto}>
                        <Ionicons name="scan-outline" size={36} color={DARK_BLUE} />
                    </TouchableOpacity>
                    
                    {/*Silinecek*/}
                    <TouchableOpacity style={styles.controlButton} onPress={handleTest}>
                        <Feather name="code" size={20} color={DARK_GREEN} />
                        <Text style={styles.controlButton}>Test</Text>
                    </TouchableOpacity>

                    {/* 3. Boşluk (Sağ) - Çekim butonunu ortalamak için */}
                    <View style={styles.placeholder} />
                </View>
            </Animated.View>
        </View>
    );
}
