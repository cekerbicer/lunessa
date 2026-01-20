import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, StatusBar, Image, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../supabase';
import { Feather } from '@expo/vector-icons';
import styles from '../../design/HomeScreensStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const formatDate = (date: Date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function HomeScreen() {
    const navigation = useNavigation();
    const calendarScrollRef = useRef<ScrollView>(null);
    const [registrationDate, setRegistrationDate] = useState<Date | null>(null);    
    const [streakCount, setStreakCount] = useState(0);
    const [isStreakVisible, setIsStreakVisible] = useState(false);  

    const [userName, setUserName] = useState('Kullanıcı');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [habits, setHabits] = useState<any[]>([]);
    const [baseHabits, setBaseHabits] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [calendarDays, setCalendarDays] = useState<any[]>([]);
    const [analysisDate, setAnalysisDate] = useState<Date | null>(null);
    const [showReanalysis, setShowReanalysis] = useState(false);
    const [loadingData, setLoadingData] = useState(true);


    useEffect(() => {
        if (baseHabits.length > 0) {
            fetchDailyStatus(selectedDate);
        }
    }, [selectedDate, baseHabits]);

    const fetchBaseData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            const { data: profile } = await supabase.from('profiles').select('created_at, username').eq('id', user.id).single();

            if (profile?.created_at) {
                setRegistrationDate(new Date(profile.created_at));
            }

            fetchUserName(user);

            const { data: userHabits } = await supabase.from('user_habits').select('*').eq('user_id', user.id);
            if (userHabits) setBaseHabits(userHabits);

            // STREAK HESAPLAMA
            const { data: allLogs } = await supabase
                .from('daily_logs')
                .select('log_date')
                .eq('user_id', user.id)
                .eq('is_completed', true)
                .order('log_date', { ascending: false });

            if (allLogs && allLogs.length > 0) {
                const calculated = calculateStreak(allLogs);
                setStreakCount(calculated);

                if (calculated > 0) {
                    const today = new Date().toISOString().split('T')[0];
                    const lastShownDate = await AsyncStorage.getItem(`streak_shown_${user.id}`);

                    if (lastShownDate !== today) {
                        setIsStreakVisible(true);
                        await AsyncStorage.setItem(`streak_shown_${user.id}`, today);
                    }
                }
            }

            const { data: outputData } = await supabase
                .from('output')
                .select('products, created_at')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (outputData) {
                if (outputData.products) setProducts(outputData.products);
                if (outputData.created_at) {
                    const createdDate = new Date(outputData.created_at);
                    setAnalysisDate(createdDate);
                    const today = new Date();
                    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    if (diffDays >= 30) setShowReanalysis(true);
                    else setShowReanalysis(false);
                }
            }
        } catch (error) {
            console.error("Veri hatası:", error);
        } finally {
            setLoadingData(false);
        }
    };

    const fetchDailyStatus = async (date: Date) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            const dateStr = formatDate(date);
            const todayStr = formatDate(new Date());

            const { data: logs } = await supabase
                .from('daily_logs')
                .select('habit_id, is_completed')
                .eq('user_id', user.id)
                .eq('log_date', dateStr);

            const currentLogs = logs || [];

            if (dateStr < todayStr) {
                const existingHabitIds = currentLogs.map(l => l.habit_id);
                const missingHabits = baseHabits.filter(h => !existingHabitIds.includes(h.habit_id));

                if (missingHabits.length > 0) {
                    const newLogEntries = missingHabits.map(h => ({
                        user_id: user.id,
                        habit_id: h.habit_id,
                        log_date: dateStr,
                        is_completed: false
                    }));
                    const { error: insertError } = await supabase.from('daily_logs').insert(newLogEntries);
                    if (!insertError) {
                        newLogEntries.forEach(entry => currentLogs.push(entry));
                    }
                }
            }

            const mergedHabits = baseHabits.map(h => {
                const log = currentLogs.find(l => l.habit_id === h.habit_id);
                return {
                    ...h,
                    id: h.habit_id,
                    completed: log ? log.is_completed : false
                };
            });
            setHabits(mergedHabits);
        } catch (error) { console.error(error); }
    };

    const fetchUserName = async (user: any) => {
        try {
            const { data } = await supabase.from('profiles').select('username').eq('id', user.id).single();
            if (data?.username) setUserName(data.username);
        } catch (e) { }
    };
    const getGreetingMessage = () => {
        const total = habits.length;
        const completed = habits.filter(h => h.completed).length;

        if (total === 0) return "Bugün için bir planın var mı? ✨";

        const percentage = (completed / total) * 100;

        if (percentage === 0) return "Güne harika bir başlangıç yapmaya ne dersin? ☕";
        if (percentage < 50) return "Güzel bir başlangıç! Devamını getirebilirsin. 💪";
        if (percentage < 100) return "Yolun yarısını geçtin, harika gidiyorsun! ✨";
        if (percentage === 100) return "Bugünün şampiyonu sensin! Her şey tamam. 🏆";

        return "Harika bir gün dilerim! 😊";
    };
    useEffect(() => {
        if (!registrationDate) return;
    
        const days: { dayName: string; dayNumber: number; fullDate: Date }[] = [];        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        const sixtyDaysAgo = new Date(today);
        sixtyDaysAgo.setDate(today.getDate() - 60);
    
        let startDate = registrationDate < sixtyDaysAgo ? sixtyDaysAgo : registrationDate;
        startDate.setHours(0, 0, 0, 0);
    
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 2);
    
        let currentIterDate = new Date(startDate);
        
        while (currentIterDate <= endDate) {
            days.push({
                dayName: currentIterDate.toLocaleDateString('tr-TR', { weekday: 'short' }),
                dayNumber: currentIterDate.getDate(),
                fullDate: new Date(currentIterDate)
            });
            currentIterDate.setDate(currentIterDate.getDate() + 1);
        }
        
        setCalendarDays(days);
    
        setTimeout(() => {
            const todayIndex = days.findIndex(d => formatDate(d.fullDate) === formatDate(new Date()));
            if (todayIndex !== -1 && calendarScrollRef.current) {
                calendarScrollRef.current.scrollTo({ x: todayIndex * 65, animated: true });
            }
        }, 600);
    }, [registrationDate]); 

    const calculateStreak = (logs: any[]) => {
        if (!logs || logs.length === 0) return 0;
        const sortedDates = [...new Set(logs.map(l => l.log_date))].sort().reverse();
        const getLocalDateString = (date: Date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        let streak = 0;
        let checkDate = new Date();
        let todayStr = getLocalDateString(checkDate);
        let yesterdayStr = getLocalDateString(new Date(Date.now() - 86400000));

        if (sortedDates[0] !== todayStr && sortedDates[0] !== yesterdayStr) return 0;

        let currentCheckDate = sortedDates[0] === todayStr ? new Date() : new Date(Date.now() - 86400000);

        for (let i = 0; i < 100; i++) {
            const dStr = getLocalDateString(currentCheckDate);
            if (sortedDates.includes(dStr)) {
                streak++;
                currentCheckDate.setDate(currentCheckDate.getDate() - 1);
            } else break;
        }
        return streak;
    };

    const isDateInChallenge = (date: Date) => {
        if (!analysisDate) return false;
        const start = new Date(analysisDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(end.getDate() + 30);
        const current = new Date(date);
        current.setHours(0, 0, 0, 0);
        return current >= start && current <= end;
    };

    const toggleHabit = async (habitId: string, currentStatus: boolean) => {
        setHabits(prev => prev.map(h => h.id === habitId ? { ...h, completed: !currentStatus } : h));
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            const dateStr = formatDate(selectedDate);
            await supabase.from('daily_logs').upsert(
                { user_id: user.id, habit_id: habitId, log_date: dateStr, is_completed: !currentStatus },
                { onConflict: 'user_id, habit_id, log_date' }
            );
        } catch (error) { console.error(error); }
    };
    const calculateRemainingDays = () => {
        if (!analysisDate) return 30; 
        const start = new Date(analysisDate);
        start.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diffTime = today.getTime() - start.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const remaining = 30 - diffDays;

        return remaining > 0 ? remaining : 0;
    };

    const daysLeft = calculateRemainingDays();
    const challengeProgress = Math.min(((30 - daysLeft) / 30) * 100, 100);

    useFocusEffect(
        useCallback(() => {
            fetchBaseData();
        }, [])
    );
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <Modal animationType="fade" transparent={true} visible={isStreakVisible} onRequestClose={() => setIsStreakVisible(false)}>
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setIsStreakVisible(false)}>
                    <View style={styles.streakCard}>
                        <View style={styles.streakIconWrapper}>
                            <Feather name="zap" size={48} color="#FFD700" />
                        </View>
                        <Text style={styles.streakTitle}>TEBRİKLER!</Text>
                        <Text style={styles.streakCountText}>{streakCount} GÜN</Text>
                        <Text style={styles.streakSubText}>Işıltını koruma yolunda harika bir seri yakaladın! 🔥</Text>
                        <TouchableOpacity style={styles.streakCloseBtn} onPress={() => setIsStreakVisible(false)}>
                            <Text style={styles.streakCloseBtnText}>IŞILDAMAYA DEVAM ET</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* ÜST BÖLÜM: Dinamik Renkli Header */}
            <View style={styles.topSection}>
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.welcomeText}>Merhaba,</Text>
                        <Text style={styles.userNameText}>{userName} ✨</Text>
                    </View>
                    <TouchableOpacity style={styles.profileGlassBtn} onPress={() => (navigation as any).navigate('Profile' as any)}>
                        <Feather name="user" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {/* SPOTLIGHT: Günün Mesajı Kartı */}
                {/* SPOTLIGHT: Sade, Mercan Çerçeveli ve Şık */}
<TouchableOpacity 
    activeOpacity={0.8}
    onPress={() => showReanalysis ? navigation.navigate('Photo' as never) : null}
    style={[
        styles.spotlightCard, 
        showReanalysis && styles.spotlightReanalysis 
    ]}
>
    <View style={styles.spotlightInfo}>
        <Text style={[styles.spotlightTag, showReanalysis && { color: '#ef4444',fontSize:12, opacity: 1 }]}>
            {showReanalysis ? "YENİLEME VAKTİ" : "GÜNÜN MOTİVASYONU"}
        </Text>

        {showReanalysis ? (
            <Text style={[styles.greetingMsg, { color: '#FFF' }]}>
                30 günlük sürecin doldu. Yeni bir analiz ile gelişimini gör ✨
            </Text>
        ) : (
            <Text style={styles.greetingMsg}>{getGreetingMessage()}</Text>
        )}
    </View>

    {/* Sağ taraftaki Streak (Seri) Göstergesi */}
    <View style={[styles.miniStreak, showReanalysis && { borderColor: '#FF8E6D' }]}>
        <Feather name="zap" size={14} color="#FFD700" />
        <Text style={styles.miniStreakText}>{streakCount}</Text>
    </View>
</TouchableOpacity>
            </View>

            {/* CALENDAR: Hap Şeklinde Modern Takvim */}
            <View style={styles.calendarSection}>
            {calendarDays.length > 0 ? (
                <ScrollView ref={calendarScrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.calendarScroll}>
                    {calendarDays.map((day, index) => {
                        const isSelected = formatDate(day.fullDate) === formatDate(selectedDate);
                        const isFuture = day.fullDate > new Date();
                        return (
                            <TouchableOpacity
                                key={index}
                                disabled={isFuture}
                                style={[styles.dateBox, isSelected && styles.dateBoxActive, isFuture && { opacity: 0.3 }]}
                                onPress={() => setSelectedDate(day.fullDate)}
                            >
                                <Text style={[styles.dateDay, isSelected && styles.dateTextActive]}>{day.dayName}</Text>
                                <Text style={[styles.dateNum, isSelected && styles.dateTextActive]}>{day.dayNumber}</Text>
                                {isSelected && <View style={styles.activeIndicator} />}
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
                ) : (
                    <View style={styles.calendarEmpty}>
                        <Text style={styles.calendarEmptyText}>Takvim henüz yüklenmedi. Lütfen bekleyin...</Text>
                    </View>
                )}
            </View>

            <ScrollView contentContainerStyle={styles.mainScroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionHeading}>
                    {formatDate(selectedDate) === formatDate(new Date()) ? "Bugünün Rutini" : "Geçmiş Kayıtlar"}
                </Text>

                {/* RUTİNLER: Renkli ve İkonik Kartlar */}
                {loadingData ? <ActivityIndicator color="#5F4890" style={{ marginTop: 20 }} /> : habits.map((habit, index) => (
                    <TouchableOpacity
                        key={habit.id || index}
                        style={[styles.habitItem, habit.completed && styles.habitItemDone]}
                        onPress={() => toggleHabit(habit.id, habit.completed)}
                    >
                        <View style={[styles.habitIconBg, { backgroundColor: habit.completed ? '#16B576' : '#7996da' }]}>
                            <Feather name={habit.icon || 'star'} size={20} color={habit.completed ? "#FFF" : "#fff"} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.habitTitle, habit.completed && styles.habitTitleDone]}>{habit.title}</Text>
                            <Text style={styles.habitStatus}>{habit.completed ? 'Harika Görünüyorsun!' : 'Tamamlanmayı Bekliyor'}</Text>
                        </View>
                        <View style={[styles.checkNode, habit.completed && styles.checkNodeActive]}>
                            {habit.completed && <Feather name="check" size={14} color="#FFF" />}
                        </View>
                    </TouchableOpacity>
                ))}

                {/* İSTATİSTİK KARTI */}
                <TouchableOpacity
                    style={styles.statsCard}
                    onPress={() => navigation.navigate('Graphic' as never)}
                >
                    <View style={{ flex: 1 }}>
                        <Text style={styles.statsTitleText}>Gelişimini Gör</Text>
                        <View style={styles.progressRow}>
                            <View style={styles.barBg}>
                                <View style={[styles.barFill, { width: `${challengeProgress}%` }]} />
                            </View>
                        </View>
                        <Text style={{ fontSize: 11, color: '#5F4890', marginTop: 5, opacity: 0.7 }}>
                            {30 - daysLeft}. günündesin. İstikrarını bozma!
                        </Text>
                    </View>
                    <Feather name="award" size={24} color="#5F4890" />
                </TouchableOpacity>

                {products.length > 0 && (
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.sectionHeading}>Sana Özel Ürünler</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {products.map((prod, index) => (
                                <View key={index} style={styles.productCard}>
                                    <View style={styles.productImgWrapper}>
                                        {prod.image_url && prod.image_url !== "" ? (
                                            <Image
                                                source={{ uri: prod.image_url }}
                                                style={styles.prodImg}
                                                resizeMode="contain" 
                                            />
                                        ) : (
                                            <View style={styles.imagePlaceholder}>
                                                <Feather name="image" size={32} color="#CBD5E1" />
                                            </View>
                                        )}
                                    </View>
                                    <Text numberOfLines={1} style={styles.prodName}>{prod.product_name}</Text>
                                    <Text style={styles.prodType}>{prod.product_type}</Text>
                                    <View style={styles.productBadge}>
                                        <Text style={styles.productBadgeText}>Analiz Seçimi</Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}