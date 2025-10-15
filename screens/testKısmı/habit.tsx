import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons'; // İkonlar

// Stilleri import ediyoruz
import styles from '../../design/HabitSelectionStyles'; 

// 💡 Statik Alışkanlık Verileri (Normalde API'den gelecek)
const HABIT_DATA = [
    { id: 'nem', title: 'Yoğun Nem Takviyesi', icon: 'droplet' as const, description: 'Cildin nem bariyerini destekler.' },
    { id: 'koruma', title: 'Güneş Koruması', icon: 'sun' as const, description: 'UV hasarını önler, yaşlanmayı yavaşlatır.' },
    { id: 'su', title: 'Günde 2L Su', icon: 'activity' as const, description: 'Vücudun nem dengesini içten sağlar.' },
    { id: 'yikama', title: 'Çift Aşamalı Temizlik', icon: 'minimize' as const, description: 'Cildi makyaj ve kirden derinlemesine arındırır.' },
    { id: 'serum', title: 'C Vitamini Serumu', icon: 'maximize' as const, description: 'Cilde parlaklık ve antioksidan destek verir.' },
    { id: 'uyku', title: 'Erken Uyku', icon: 'moon' as const, description: 'Hücre yenilenmesini hızlandırır.' },
];

// Sabit Kısıtlama: Kaç alışkanlık seçileceği
const MAX_HABITS = 3;
const DARK_BLUE = '#2F3A66';

export default function HabitSelectionScreen() {
    const navigation = useNavigation();
    const [selectedHabits, setSelectedHabits] = useState<string[]>([]);

    // Seçim Mantığı
    const toggleHabit = (id: string) => {
        setSelectedHabits(prevSelected => {
            const isSelected = prevSelected.includes(id);

            if (isSelected) {
                // Seçiliyse kaldır
                return prevSelected.filter(habitId => habitId !== id);
            } else if (prevSelected.length < MAX_HABITS) {
                // Seçili değilse ve sınır aşılmamışsa ekle
                return [...prevSelected, id];
            } else {
                // Sınır aşılmışsa uyarı ver
                Alert.alert("Sınır Aşıldı", `Sadece ${MAX_HABITS} adet alışkanlık seçebilirsiniz.`);
                return prevSelected;
            }
        });
    };

    // Butonun Etkinlik Durumu
    const isStartButtonEnabled = useMemo(() => {
        return selectedHabits.length === MAX_HABITS;
    }, [selectedHabits]);

    const handleStart = () => {
        if (!isStartButtonEnabled) {
            Alert.alert("Eksik Seçim", `Lütfen devam etmek için tam ${MAX_HABITS} adet alışkanlık seçiniz.`);
            return;
        }

        // 💡 İLERİ AŞAMA NOTU: Normalde seçilen alışkanlıklar bir yere kaydedilir (API, AsyncStorage vb.)
        console.log("Seçilen Alışkanlıklar:", selectedHabits);
        
        // Şimdilik ana sayfaya yönlendiriyoruz (App.tsx'te 'Home' tanımlı olmalı)
        navigation.navigate('Home' as never); 
    };

    const renderHabitCard = (habit: typeof HABIT_DATA[0]) => {
        const isSelected = selectedHabits.includes(habit.id);
        
        return (
            <View key={habit.id} style={styles.habitCardWrapper}>
                <TouchableOpacity 
                    style={[
                        styles.habitCard, 
                        isSelected && styles.habitCardSelected
                    ]}
                    onPress={() => toggleHabit(habit.id)}
                    activeOpacity={0.7}
                >
                    <Feather 
                        name={habit.icon} 
                        size={40} 
                        style={styles.habitIcon}
                    />
                    <Text style={styles.habitTitle}>{habit.title}</Text>
                    <Text style={{ fontSize: 12, color: DARK_BLUE, opacity: 0.6, textAlign: 'center', marginTop: 5 }}>
                        {habit.description}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Başlık Alanı */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Alışkanlıklarını Seç ({selectedHabits.length}/{MAX_HABITS})</Text>
                <Text style={styles.headerSubtitle}>Lütfen günlük rutinine ekleyeceğin 3 alışkanlığı seç.</Text>
            </View>

            {/* Alışkanlık Listesi */}
            <ScrollView contentContainerStyle={styles.listContentContainer}>
                <View style={styles.habitGrid}>
                    {HABIT_DATA.map(renderHabitCard)}
                </View>
            </ScrollView>

            {/* Başlayalım Butonu */}
            <View style={styles.startButtonContainer}>
                <TouchableOpacity 
                    style={[
                        styles.startButton,
                        isStartButtonEnabled ? styles.startButtonEnabled : styles.startButtonDisabled
                    ]}
                    onPress={handleStart}
                    disabled={!isStartButtonEnabled}
                    activeOpacity={0.8}
                >
                    <Text style={styles.startButtonText}>Başlayalım</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
