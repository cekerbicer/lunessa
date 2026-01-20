import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { supabase } from '../../supabase';
import styles from '../../design/HabitSelectionStyles';

// --- İKON EŞLEŞTİRME ---
const getIconForCategory = (category: string) => {
    switch (category?.toLowerCase()) {
        case 'beslenme': return 'droplet';
        case 'diyet': return 'pie-chart';
        case 'uyku': return 'moon';
        case 'mental': return 'smile';
        case 'koruma': return 'sun';
        case 'hijyen': return 'shield';
        case 'rutin': return 'check-circle';
        case 'sağlık': return 'activity';
        default: return 'star';
    }
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'critical': return '#ef4444';
        case 'high': return '#f97316';
        default: return 'transparent';
    }
};

const DARK_BLUE = '#2F3A66';
const MAX_HABITS = 10;
const MIN_HABITS = 1;

export default function HabitSelectionScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    // Parametrelerden gelen veri (Analizden hemen sonra gelindiyse dolu olur)
    // @ts-ignore
    const { habitPlan } = route.params || {};

    const [dynamicHabits, setDynamicHabits] = useState<any[]>([]); // Görüntülenecek liste (Havuz)
    const [selectedHabits, setSelectedHabits] = useState<any[]>([]); // Seçili olanlar
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // --- VERİLERİ YÜKLE ---
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // 1. HAVUZU BELİRLE (Önerilecekler Listesi)
            let sourceHabits = [];

            if (habitPlan && habitPlan.length > 0) {
                // A) Eğer analizden yeni geldiysek, parametreyi kullan
                sourceHabits = habitPlan;
            } else {
                // B) Eğer Profil'den geldiysek, veritabanındaki son 'output' tablosundan önerileri çek
                const { data: outputData } = await supabase
                    .from('output')
                    .select('habit_plan')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single();

                if (outputData && outputData.habit_plan) {
                    sourceHabits = outputData.habit_plan;
                }
            }
            setDynamicHabits(sourceHabits);

            // 2. SEÇİLİ OLANLARI BELİRLE (Database'den)
            // Kullanıcının daha önce kaydettiği aktif alışkanlıkları çek
            const { data: activeHabits } = await supabase
                .from('user_habits')
                .select('*')
                .eq('user_id', user.id);

            if (activeHabits && activeHabits.length > 0) {
                // Veritabanından gelen formatı, yerel formatımıza uyduralım
                // (Önemli: id karşılaştırması için map yapıyoruz)
                const formattedActive = activeHabits.map(h => ({
                    id: h.habit_id, // habit_id bizim orijinal ID'miz
                    title: h.title,
                    desc: h.description,
                    category: h.category,
                    priority: h.priority
                }));
                setSelectedHabits(formattedActive);
            }

        } catch (error) {
            console.error("Veri yükleme hatası:", error);
            Alert.alert("Hata", "Veriler yüklenemedi.");
        } finally {
            setLoading(false);
        }
    };

    // --- SEÇİM MANTIĞI ---
    const toggleHabit = (habitItem: any) => {
        setSelectedHabits(prevSelected => {
            const isSelected = prevSelected.some(h => h.id === habitItem.id);

            if (isSelected) {
                // Kaldır
                return prevSelected.filter(h => h.id !== habitItem.id);
            } else if (prevSelected.length < MAX_HABITS) {
                // Ekle
                return [...prevSelected, habitItem];
            } else {
                Alert.alert("Sınır Aşıldı", `En fazla ${MAX_HABITS} alışkanlık seçebilirsiniz.`);
                return prevSelected;
            }
        });
    };

    const isStartButtonEnabled = selectedHabits.length >= MIN_HABITS;

    // --- KAYDET VE ÇIK ---
    const handleSaveAndStart = async () => {
        if (!isStartButtonEnabled) {
            Alert.alert("Eksik Seçim", `Lütfen en az ${MIN_HABITS} alışkanlık seçiniz.`);
            return;
        }

        setSaving(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // 1. Önce eski kayıtları temizle (Sync mantığı: Eskileri sil, yenileri ekle)
            // Bu yöntem en temizidir, update ile uğraşmayız.
            const { error: deleteError } = await supabase
                .from('user_habits')
                .delete()
                .eq('user_id', user.id);

            if (deleteError) throw deleteError;

            // 2. Seçilenleri formatla ve ekle
            const habitsToInsert = selectedHabits.map(habit => ({
                user_id: user.id,
                habit_id: habit.id,
                title: habit.title,
                description: habit.desc || habit.description, // desc veya description gelebilir
                category: habit.category,
                priority: habit.priority,
                icon: getIconForCategory(habit.category)
            }));

            const { error: insertError } = await supabase
                .from('user_habits')
                .insert(habitsToInsert);

            if (insertError) throw insertError;

            console.log("✅ Alışkanlıklar başarıyla güncellendi.");

            // 3. Home sayfasına git (Home sayfası veriyi DB'den çekecek)
            navigation.navigate('Home' as never);

        } catch (error) {
            console.error("Kaydetme hatası:", error);
            Alert.alert("Hata", "Alışkanlıklar kaydedilemedi.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={DARK_BLUE} />
                <Text style={{ marginTop: 10, color: '#666' }}>Veriler yükleniyor...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Rutinini Belirle</Text>
                <Text style={styles.headerSubtitle}>
                    Sana özel hazırlanan listeden takip etmek{'\n'}istediklerini seçerek başla.
                </Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContentContainer}
            >
                <View style={styles.habitGrid}>
                    {dynamicHabits.length === 0 ? (
                        <View style={{ width: '100%', alignItems: 'center', marginTop: 50 }}>
                            <Feather name="search" size={40} color="#CBD5E1" />
                            <Text style={{ textAlign: 'center', marginTop: 15, color: '#64748B' }}>
                                Öneri havuzu henüz oluşturulmamış.
                            </Text>
                        </View>
                    ) : (
                        dynamicHabits.map((habit: any, index: number) => {
                            const uniqueId = habit.id || `habit_${index}`;
                            const habitWithId = { ...habit, id: uniqueId };
                            const isSelected = selectedHabits.some(h => h.id === uniqueId);
                            const iconName = getIconForCategory(habit.category);

                            return (
                                <View key={uniqueId} style={styles.habitCardWrapper}>
                                    <TouchableOpacity
                                        style={[
                                            styles.habitCard,
                                            isSelected && styles.habitCardSelected,
                                            // Öncelik rengini ince bir çizgi olarak bırakıyoruz
                                            { borderTopWidth: habit.priority === 'critical' ? 4 : 0, borderTopColor: '#EF4444' }
                                        ]}
                                        onPress={() => toggleHabit(habitWithId)}
                                        activeOpacity={0.8}
                                    >
                                        {/* Seçili İkonu - Daha modern Badge */}
                                        {isSelected && (
                                            <View style={styles.checkBadge}>
                                                <Ionicons name="checkmark-circle" size={22} color="#16B576" />
                                            </View>
                                        )}

                                        {/* Kritiklik Badge */}
                                        {habit.priority === 'critical' && (
                                            <View style={styles.priorityBadge}>
                                                <Text style={styles.priorityText}>ÖNCELİKLİ</Text>
                                            </View>
                                        )}

                                        <Feather
                                            name={iconName as any}
                                            size={32}
                                            color={isSelected ? '#ef4444' : '#2F3A66'}
                                            style={styles.habitIcon}
                                        />

                                        <Text style={[
                                            styles.habitTitle,
                                            isSelected && { color: '#ef4444' } 
                                        ]}>
                                            {habit.title}
                                        </Text>
                                        <Text
                                            numberOfLines={3}
                                            style={[
                                                styles.habitDesc,
                                                isSelected && { color: '#ef4444', opacity: 1 }
                                            ]}
                                        >
                                            {habit.desc || habit.description}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    )}
                </View>
            </ScrollView>
            <View style={styles.startButtonContainer}>
                <TouchableOpacity
                    style={[
                        styles.startButton,
                        (!isStartButtonEnabled || saving)
                            ? styles.startButtonDisabled
                            : styles.startButtonEnabled
                    ]}
                    onPress={handleSaveAndStart}
                    disabled={!isStartButtonEnabled || saving}
                >
                    {saving ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.startButtonText}>TAKİBE BAŞLA</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}