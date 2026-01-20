import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Dimensions,
    ActivityIndicator,
    Image,
    ScrollView,
    ImageBackground
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../supabase';
import styles from '../../design/ResultScreenStyles';

const { height } = Dimensions.get('window');

export default function ResultScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    // Animasyon başlangıç değerini height yerine 100 yaparak kayma efektini daha yumuşak tuttuk
    const slideAnim = useRef(new Animated.Value(100)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // --- SENİN VERİ MANTIĞIN (BOZULMADI) ---
    // @ts-ignore
    const { analysisResult } = route.params || {};
    const aiData = analysisResult?.ai_analysis || { cilt_tipi: 'Bilinmiyor', sorun: 'Yok' };
    const habits = analysisResult?.habit_plan || [];
    const isUnhealthy = aiData.saglik_durumu?.toLowerCase() === 'sagliksiz';
    const products = analysisResult?.recommended_products || [];

    const [userName, setUserName] = useState('Kullanıcı');
    const [loadingUser, setLoadingUser] = useState(true);

    const getCiltTypeInfo = (type: string) => {
        const t = type?.toLowerCase() || '';
        if (t.includes('yagli') || t.includes('yağlı')) {
            return { image: require('../../assets/yagli.png'), label: 'YAĞLI', textColor: '#e17055' };
        }
        if (t.includes('kuru')) {
            return { image: require('../../assets/kuru.png'), label: 'KURU', textColor: '#e67e22' };
        }
        if (t.includes('normal')) {
            return { image: require('../../assets/normal.png'), label: 'NORMAL', textColor: '#16B576' };
        }
        return { image: require('../../assets/normal.png'), label: t.toUpperCase() || 'BİLİNMİYOR', textColor: '#16B576' };
    };
    const ciltTypeInfo = getCiltTypeInfo(aiData.cilt_tipi);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
            Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true })
        ]).start();

        fetchUser();
        saveAnalysisToSupabase();
    }, []);

    const fetchUser = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase.from('profiles').select('username').eq('id', user.id).single();
                if (data?.username) setUserName(data.username);
                else if (user.email) setUserName(user.email.split('@')[0]);
            }
        } catch (e) { console.log('Hata:', e); } finally { setLoadingUser(false); }
    };

    const saveAnalysisToSupabase = async () => {
        if (!analysisResult) return;
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            const { error } = await supabase.from('output').insert([{
                user_id: user.id,
                hastalik_riski: isUnhealthy,
                saglik_durumu: aiData.saglik_durumu,
                cilt_tipi: aiData.cilt_tipi,
                sorun: aiData.sorun,
                habit_plan: habits,
                products: products,
                ai_analysis_full: aiData
            }]);
            if (error) console.error("Kayıt Hatası:", error.message);
        } catch (err) { console.error("Beklenmeyen hata:", err); }
    };

    const goToHabits = () => {
        // Alışkanlık listesini 'Habit' sayfasına taşıyoruz
        // @ts-ignore
        navigation.navigate('Habit', {
            habitPlan: habits,
            // Eğer ürünleri Habit sayfasından sonra Ana Sayfaya taşımak istersen 
            // buraya ekleyebilirsin, ama şimdilik sadece habits gidiyor.
            allAnalysisData: analysisResult
        });
    };

    return (
        <ImageBackground
            source={require('../../assets/arkaplan.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerContainer}>
                    {loadingUser ? <ActivityIndicator color="#fff" /> : (
                        <Text style={styles.headerTitle}>Analiz Tamamlandı, {userName}!</Text>
                    )}
                    <Text style={styles.subHeader}>Yapay zeka cildini inceledi ve sonuçları çıkardı.</Text>
                </View>

                {/* Sonuç Kartı */}
                <Animated.View style={[styles.resultCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    <View style={styles.cardTopSection}>
                        <Image source={ciltTypeInfo.image} style={styles.ciltImage} />
                        <Text style={styles.ciltTipiTitle}>{aiData.cilt_tipi.toUpperCase()} CİLT</Text>
                        {!isUnhealthy && (
                            <Text style={styles.durumText}>
                                Hedef Bölge: <Text style={styles.sorunHighlight}>{aiData.sorun.toUpperCase()}</Text>
                            </Text>
                        )}

                        <View style={[styles.statusBadge, {
                            backgroundColor: isUnhealthy ? '#ffebee' : '#e8f5e9',
                            borderColor: isUnhealthy ? '#ef5350' : '#16B576'
                        }]}>
                            <Ionicons
                                name={isUnhealthy ? "alert-circle" : "checkmark-circle"}
                                size={24}
                                color={isUnhealthy ? "#c62828" : "#16B576"}
                            />
                            <Text style={{
                                color: isUnhealthy ? "#c62828" : "#16B576",
                                fontWeight: 'bold', fontSize: 16, marginLeft: 8
                            }}>
                                {isUnhealthy ? "SAĞLIK RİSKİ" : "SAĞLIKLI"}
                            </Text>
                        </View>
                    </View>

                    {/* DOKTOR UYARISI - GÖRSEL UYUMSUZLUK DÜZELTİLDİ */}
                    {isUnhealthy ? (
                        // 1. DURUM: Sağlık Riski Varsa Sadece Bu Kısım Görünür
                        <View style={styles.warningContainer}>
                            <View style={styles.warningHeader}>
                                <Ionicons name="medical" size={18} color="#92400E" />
                                <Text style={styles.warningTitle}>Doktora Görünmelisin</Text>
                            </View>
                            <Text style={styles.warningText}>
                                Cildindeki analiz sonuçları bir cilt problemi olabileceğini gösteriyor.
                                Kesin teşhis ve tedavi için lütfen bir dermatoloğa görünmeyi ihmal etme.
                            </Text>
                        </View>
                    ) : (
                        // 2. DURUM: Sağlıklıysa Sadece Bu Bilgi Metni Görünür
                        <View style={{ marginTop: 25, width: '100%' }}>
                            <Text style={styles.infoText}>
                                Cildin gayet sağlıklı görünüyor! Sonuçlarına göre sana özel bir rutin hazırladık.
                                Detayları görmek ve takibe başlamak için aşağıdaki butona tıkla.
                            </Text>
                        </View>
                    )}

                    {/* BUTON ALANI: Her iki durumda da buton görünmeye devam eder (veya istersen bunu da isUnhealthy içine alabilirsin) */}
                    <View style={styles.cardBottomSection}>
                        <TouchableOpacity
                            style={styles.habitButton}
                            onPress={goToHabits}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.habitButtonText}>
                                {isUnhealthy ? "Yine de Önerileri Gör" : "Önerileri Görelim"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </ScrollView>
        </ImageBackground>
    );
}