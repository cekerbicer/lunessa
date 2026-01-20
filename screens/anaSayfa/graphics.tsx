import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LineChart } from "react-native-chart-kit";
import { supabase } from '../../supabase';
import statsStyles from '../../design/GraphicScreenStyles';

const { width } = Dimensions.get('window');
const DARK_GREEN = '#ff7e52';
const MOR = '#fbb299';

// Kart bileşeni 
const StatCard = ({ title, value, icon, color, bgColor, isBig }: any) => (
    <View style={statsStyles.modernCard}>
        <View style={[statsStyles.cardIconBg, { backgroundColor: bgColor }]}>
            <Feather name={icon} size={20} color={color} />
        </View>
        <Text style={[
            statsStyles.cardValueText, 
            isBig && { fontSize: 26, fontWeight: '800', marginTop: 8 } 
        ]}>
            {value ? String(value) : "-"}
        </Text>
        <Text style={statsStyles.cardTitleText}>{title}</Text>
    </View>
);

export default function StatsScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        completedToday: "0/0",
        streak: "0 Gün",
        avgSuccess: "%0",
        bestHabit: "-"
    });

    const [weeklyChartData, setWeeklyChartData] = useState({
        labels: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
        datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }]
    });

    const [longTermChartData, setLongTermChartData] = useState({
        labels: ["-"],
        datasets: [{ data: [0] }]
    });

    useFocusEffect(
        useCallback(() => {
            fetchAllData();
        }, [])
    );

    const calculateAnalysisScore = (answers: any) => {
        if (!answers) return 0;
        const values = Object.values(answers);
        if (values.length === 0) return 0;
        const scoreMap: { [key: string]: number } = { a: 100, b: 70, c: 40, d: 10 };
        const total = values.reduce((acc: number, val: any) => acc + (scoreMap[String(val).toLowerCase()] || 0), 0);
        return Math.round(total / values.length);
    };

    const calculateOutputScore = (saglik_durumu: string, sorun: string): number => {
        let score = 50; // Başlangıç puanı
    
        const durum = String(saglik_durumu).toLowerCase();
        if (durum === 'saglikli') score += 30;
        else if (durum === 'sagliksiz') score -= 30;
    
        const problem = String(sorun).toLowerCase();
        if (problem !== 'null' && problem !== '' && problem !== 'undefined') {
            score -= 20; 
        } else {
            score += 10; 
        }
    
        return Math.max(0, Math.min(100, score)); 
    };

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
    
            // Tablo isimlerini ve sütunları güncelledik
            const { data: logs } = await supabase.from('daily_logs').select('*').eq('user_id', user.id);
            const { data: habits } = await supabase.from('user_habits').select('*').eq('user_id', user.id);
            
            // Output tablosundan saglik_durumu ve sorun verilerini çekiyoruz
            const { data: outputRecords } = await supabase
                .from('output')
                .select('created_at, saglik_durumu, sorun')
                .eq('user_id', user.id)
                .order('created_at', { ascending: true });
    
            if (!logs || !habits) { setLoading(false); return; }
    
            // --- Haftalık Tamamlama Mantığı ---
            const daysArr: string[] = [];
            const ratesArr: number[] = [];
            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const dStr = d.toISOString().split('T')[0];
                const dayLogs = logs.filter(l => l.log_date === dStr);
                const rate = habits.length > 0 ? (dayLogs.filter(l => l.is_completed).length / habits.length) * 100 : 0;
                daysArr.push(d.toLocaleDateString('tr-TR', { weekday: 'short' }));
                ratesArr.push(rate);
            }
            setWeeklyChartData({ labels: daysArr, datasets: [{ data: ratesArr }] });
    
            if (outputRecords && outputRecords.length > 0) {
                const labels: string[] = []; 
                const dataValues: number[] = []; 
    
                outputRecords.forEach(record => {
                    const dateLabel = new Date(record.created_at).toLocaleDateString('tr-TR', { 
                        day: 'numeric', 
                        month: 'short' 
                    });
                    
                    const score = calculateOutputScore(record.saglik_durumu, record.sorun);
                    
                    labels.push(dateLabel);
                    dataValues.push(score);
                });
    
                setLongTermChartData({ 
                    labels: labels, 
                    datasets: [{ data: dataValues }] 
                });
            }
    
            // --- İstatistik Kartları ---
            const todayStr = new Date().toISOString().split('T')[0];
            const completedCount = logs.filter(l => l.log_date === todayStr && l.is_completed).length;
    
            setStats({
                completedToday: `${completedCount}/${habits.length}`,
                streak: `${[...new Set(logs.filter(l => l.is_completed).map(l => l.log_date))].length} Gün`,
                avgSuccess: `%${Math.round(ratesArr.reduce((a, b) => a + b, 0) / 7)}`,
                bestHabit: habits[0]?.title || "-"
            });
    
        } catch (error) { 
            console.error("Hata:", error); 
        } finally { 
            setLoading(false); 
        }
    };

    const chartConfigBase = (mainColor: string) => ({
        backgroundColor: "#ffffff",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        decimalPlaces: 0,
        color: (opacity = 1) => {
            const r = parseInt(mainColor.slice(1, 3), 16), g = parseInt(mainColor.slice(3, 5), 16), b = parseInt(mainColor.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        },
        labelColor: () => `#64748B`,
        propsForDots: { r: "4", strokeWidth: "2", stroke: mainColor },
        fillShadowGradient: mainColor,
        fillShadowGradientOpacity: 0.1,
    });

    if (loading) return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FDFCFB', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#2F3A66" />
        </View>
    );

    return (
        <ScrollView style={statsStyles.container} showsVerticalScrollIndicator={false}>
            <StatusBar barStyle="light-content" />
            <View style={statsStyles.topSection}>
                <View style={statsStyles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={statsStyles.profileGlassBtn}>
                        <Feather name="chevron-left" size={28} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={statsStyles.headerTitleText}>Gelişim Paneli</Text>
                    <View style={{ width: 48 }} />
                </View>
                <View style={statsStyles.mainStatsCard}>
                    <View style={statsStyles.spotlightInfo}>
                        <Text style={statsStyles.spotlightTag}>HAFTALIK ORTALAMA</Text>
                        <Text style={statsStyles.mainStatsValue}>{stats.avgSuccess}</Text>
                    </View>
                    <View style={statsStyles.statsCircleBig}>
                        <Feather name="award" size={32} color="#16B576" />
                    </View>
                </View>
            </View>

            <View style={statsStyles.contentPadding}>
                <View style={statsStyles.grid}>
                    <StatCard title="Bugün" value={stats.completedToday} icon="check-circle" color="#16B576" bgColor="#F0FDF4" />
                    <StatCard title="Aktif Seri" value={stats.streak} icon="zap" color="#FFD700" bgColor="#FFFDF0" />
                    <StatCard
                        title="Başarı"
                        value={stats.avgSuccess}
                        icon="trending-up"
                        color="#ff7e52"
                        bgColor="rgba(251, 178, 153, 0.3)"
                        isBig={true}
                    />
                    <StatCard title="Favori" value={stats.bestHabit} icon="star" color="#5a79d3" bgColor="rgba(121, 150, 218, 0.25)" />
                </View>

                <Text style={statsStyles.sectionHeading}>Haftalık Tamamlama</Text>
                <View style={statsStyles.glassChartContainer}>
                    <LineChart
                        data={weeklyChartData}
                        width={width - 80}
                        height={200}
                        chartConfig={chartConfigBase(MOR)}
                        bezier
                        style={statsStyles.chartStyle}
                    />
                </View>

                <Text style={statsStyles.sectionHeading}>Gelişim Skoru</Text>
                <View style={statsStyles.glassChartContainer}>
                    <LineChart
                        data={longTermChartData}
                        width={width - 80}
                        height={200}
                        chartConfig={chartConfigBase(DARK_GREEN)}
                        bezier
                        style={statsStyles.chartStyle}
                    />
                    <Text style={statsStyles.chartFooterText}>* Testlerinize göre uzun vadeli iyileşme.</Text>
                </View>
            </View>
            <View style={{ height: 40 }} />
        </ScrollView>
    );
}