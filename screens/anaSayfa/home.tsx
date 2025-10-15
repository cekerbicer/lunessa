import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import styles from '../../design/HOmeScreensStyles';

// 💡 Statik Kullanıcı ve Alışkanlık Verileri (Normalde Context/API'den gelir)
const STATIC_USER_NAME = 'Ceren';

const DEFAULT_HABITS = [
    { id: 'nem', title: 'Yoğun Nem Takviyesi', icon: 'droplet' as const, completed: true },
    { id: 'koruma', title: 'Güneş Koruması', icon: 'sun' as const, completed: false },
    { id: 'su', title: 'Günde 2L Su Tüketimi', icon: 'activity' as const, completed: false },
];

export default function HomeScreen() {
    const navigation = useNavigation();
    // Alışkanlıklar state'i, başlangıçta seçilen alışkanlıklarla doldurulur
    const [habits, setHabits] = useState(DEFAULT_HABITS);

    const handleProfileNavigation = () => {
        // İleride Profile.tsx'e yönlendirecek
        navigation.navigate('Profile' as never);
    };

    // ✨ Yeni: Grafik sayfasına yönlendirme fonksiyonu
    const handleGraphicsNavigation = () => {
        // 'Graphics' adında bir route'a yönlendirir.
        navigation.navigate('Graphic' as never);
    };

    const toggleCompletion = (habitId: string) => {
        setHabits(prevHabits =>
            prevHabits.map(habit =>
                habit.id === habitId
                    ? { ...habit, completed: !habit.completed }
                    : habit
            )
        );
        // Tamamlanma durumunun kaydedilmesi (API/Storage) ileride buraya eklenecektir.
    };

    const renderHabitCard = (habit: typeof DEFAULT_HABITS[0]) => (
        <TouchableOpacity
            key={habit.id}
            style={styles.habitCard}
            onPress={() => toggleCompletion(habit.id)}
            activeOpacity={0.8}
        >
            <View style={styles.habitInfo}>
                <View style={styles.habitIconContainer}>
                    {/* Feather ikonu, habit.icon değişkeni ile dinamikleştirildi */}
                    <Feather name={habit.icon} size={20} style={styles.habitIcon} />
                </View>
                <Text style={styles.habitText}>{habit.title}</Text>
            </View>

            {/* Tamamlanma Durumu (Checkbox Yerine Dairesel Gösterge) */}
            <View style={[
                styles.completionStatus,
                { backgroundColor: habit.completed ? styles.completionStatus.borderColor : 'transparent' }
            ]}>
                {habit.completed && (
                    <MaterialIcons name="done" size={20} style={styles.completedIcon} />
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={styles.header.backgroundColor} />

            {/* Başlık Alanı */}
            <View style={styles.header}>
                <View style={styles.greetingContainer}>
                    <Text style={styles.greetingText}>Hoş Geldin,</Text>
                    <Text style={styles.userName}>{STATIC_USER_NAME}</Text>
                </View>

                {/* Profil Butonu (Sağ Üst) */}
                <TouchableOpacity style={styles.profileButton} onPress={handleProfileNavigation}>
                    <Feather name="user" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Alışkanlık Listesi */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Bugünün Görevleri</Text>
                {habits.map(renderHabitCard)}

                {/* --- Grafik Bileşeni --- */}
                <TouchableOpacity
                    style={styles.graphCard} // Stil dosyanızda bunu tanımlamanız gerekecek
                    onPress={handleGraphicsNavigation}
                    activeOpacity={0.8}
                >
                    <View style={styles.graphContent}>
                        <Feather name="trending-up" size={30} style={styles.graphIcon} />         
                           <View style={{ marginLeft: 10 }}>
                            <Text style={styles.graphTitle}>İlerlemeni Gör</Text>
                            <Text style={styles.graphSubtitle}>Alışkanlık takibini ve istatistiklerini incele.</Text>
                        </View>
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color="#C4C4C4" />
                </TouchableOpacity>
                {/* ------------------------- */}

            </ScrollView>
        </View>
    );
}
