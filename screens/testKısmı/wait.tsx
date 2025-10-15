import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Temanızdaki renkler
const DARK_BLUE = '#2F3A66';
const MOR = '#5F4890';

// Analiz süresi (örneğin 3 saniye)
const ANALYSIS_DURATION_MS = 3000;

export default function WaitScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        // 3 saniye sonra yönlendirme yap
        const timer = setTimeout(() => {
            // ✅ DÜZELTME: replace yerine navigate kullanıldı.
            // rotate olarak 'Result' ekranına yönlendirildi
            navigation.navigate('Result' as never);
        }, ANALYSIS_DURATION_MS);

        // Komponent kaldırıldığında zamanlayıcıyı temizle
        return () => clearTimeout(timer);

        // 🚨 navigation bağımlılığı kaldırıldı.
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={MOR} />
            <Text style={styles.title}>Analiz Ediliyor...</Text>
            <Text style={styles.subtitle}>Test sonuçlarınız değerlendiriliyor. Lütfen bekleyiniz.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: DARK_BLUE,
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        color: DARK_BLUE,
        marginTop: 10,
        textAlign: 'center',
        paddingHorizontal: 40,
    }
});
