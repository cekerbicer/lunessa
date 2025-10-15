import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; // İkonlar için

// Stilleri import ediyoruz (Canvas'tan alınıyor)
import styles from '../../design/ResultScreenStyles'; 

const { height } = Dimensions.get('window');

// 💡 Statik Veriler (Normalde API'den gelecek)
const USER_NAME = "Ceren";
const STATIC_RESULT_TITLE = `Harika iş çıkardın, ${USER_NAME}! İşte cilt analiz sonuçların.`;
const STATIC_RECOMMENDATIONS = [
    { id: 1, text: "Yüksek nemlendirme gereksinimi tespit edildi. Günde 2.5 litre su tüketmelisin." },
    { id: 2, text: "Haftada 2 kez salisilik asit içeren ürün kullanmalısın. Fazlası cildini kurutur." },
    { id: 3, text: "UVA/UVB korumalı güneş kremini (SPF 50+) asla atlama. Her iki saatte bir yenile." },
    { id: 4, text: "Cilt bariyerini güçlendirecek seramid takviyesi önerilir. Özellikle geceleri kullan." },
    { id: 5, text: "Antioksidan içeren serumları rutinine ekle. Sabahları C vitamini harika olur." },
];

export default function ResultScreen() {
    const navigation = useNavigation();
    // Animasyon değeri: Ekran yüksekliğinden başlasın
    const slideAnim = useRef(new Animated.Value(height)).current; 

    useEffect(() => {
        // Kartın alttan yukarı doğru gelmesi
        Animated.timing(slideAnim, {
            toValue: 0, // Ekranın üstüne (0 pozisyonuna) kaydır
            duration: 700,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleHabitSelection = () => {
        // App.tsx'te tanımlı olan HabitSelection ekranına yönlendirme
        navigation.navigate('Habit' as never); 
    };

    return (
        <View style={styles.container}>
            {/* Metin 1: Başlık */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>{STATIC_RESULT_TITLE}</Text>
            </View>

            {/* Sonuç Kartı - Animasyonla Kaydırılan Kutu */}
            <Animated.View 
                style={[
                    styles.resultCard,
                    { transform: [{ translateY: slideAnim }] } // Animasyonu uygula
                ]}
            >
                {/* Metin 2 Topluluğu Başlığı */}
                <Text style={styles.sectionTitle}>Kişisel Öneriler ve Alışkanlıklar</Text>

                {/* Kaydırılabilir Liste Alanı */}
                <ScrollView 
                    style={{ width: '100%' }}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Metin 2 Topluluğu: Liste Öğeleri */}
                    {STATIC_RECOMMENDATIONS.map((item) => (
                        <View key={item.id} style={styles.listItem}>
                            <Feather 
                                name="check-circle" 
                                size={20} 
                                style={styles.iconStyle} 
                            />
                            <Text style={styles.listItemText}>{item.text}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* Alışkanlık Seçimi Butonu */}
                <TouchableOpacity style={styles.habitButton} onPress={handleHabitSelection}>
                    <Text style={styles.habitButtonText}>Alışkanlıklarıma Başla</Text>
                </TouchableOpacity>

            </Animated.View>
        </View>
    );
}
