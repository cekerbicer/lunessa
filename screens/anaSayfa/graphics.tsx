import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
// 1. Geri butonu için useNavigation'ı import ediyoruz
import { useNavigation } from '@react-navigation/native'; 

import statsStyles from '../../design/GraphicScreenStyles';

const { width } = Dimensions.get('window');

// Temanızdaki renkler
const DARK_GREEN = '#16B576';
const DARK_BLUE = '#2F3A66';
const MOR = '#5F4890'; 
const GREY = '#F3F4F6';

const STATS_DATA = [
    { title: "Tamamlanan Görev", value: "3/5", icon: "check-circle" as const, color: DARK_GREEN },
    { title: "Streak (Gün)", value: "7 Gün", icon: "activity" as const, color: DARK_BLUE },
    { title: "Ortalama Başarı", value: "%60", icon: "trending-up" as const, color: MOR },
    { title: "En İyi Alışkanlık", value: "Su Tüketimi", icon: "droplet" as const, color: MOR },
];

export default function StatsScreen() {
    // 2. navigation objesini kullanıyoruz
    const navigation = useNavigation();

    // Geri gitme fonksiyonu
    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <ScrollView style={statsStyles.container}>
            {/* --- Başlık ve Geri Butonu Alanı --- */}
            <View style={statsStyles.header}>
                <TouchableOpacity onPress={handleGoBack} style={statsStyles.backButton}>
                    {/* Chevron-left ikonu, geri butonunu temsil eder */}
                    <Feather name="chevron-left" size={30} color={DARK_BLUE} />
                </TouchableOpacity>
                <Text style={statsStyles.title}>Gelişim ve İstatistikler</Text>
                {/* Başlık ve butonun hizalanması için boş bir View eklendi (Opsiyonel) */}
                <View style={statsStyles.backButton} /> 
            </View>
            {/* ------------------------------------- */}
            
            <View style={statsStyles.grid}>
                {STATS_DATA.map((item, index) => (
                    <View key={index} style={[statsStyles.card, { borderColor: item.color, borderLeftWidth: 5 }]}>
                        <Feather name={item.icon} size={24} color={item.color} style={{ marginBottom: 10 }} />
                        <Text style={statsStyles.cardValue}>{item.value}</Text>
                        <Text style={statsStyles.cardTitle}>{item.title}</Text>
                    </View>
                ))}
            </View>

            <Text style={statsStyles.sectionTitle}>Gelişim Grafiği (Placeholder)</Text>
            <View style={statsStyles.chartPlaceholder}>
                <Text style={statsStyles.chartText}>Grafik Alanı (Haftalık İlerleme)</Text>
            </View>
        </ScrollView>
    );
}
