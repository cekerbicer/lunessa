import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';

import styles from '../../design/ProfileScreenStyles';

// Statik Kullanıcı Verileri
const USER_NAME = 'Ceren Yılmaz';
const USER_EMAIL = 'ceren.yilmaz@example.com';
const USER_INITIAL = USER_NAME.charAt(0);

export default function ProfileScreen() {
    const navigation = useNavigation();

    // 💡 Hesaptan Çıkış İşlemi
    const handleLogout = () => {
        // Normalde bu fonksiyon:
        // 1. Kullanıcıyı Firebase/Auth sisteminden çıkarır.
        // 2. Yerel depolamayı (AsyncStorage) temizler.
        // 3. Kullanıcıyı Login ekranına yönlendirir.

        Alert.alert(
            "Hesaptan Çıkış",
            "Hesabınızdan çıkış yapmak istediğinizden emin misiniz?",
            [
                {
                    text: "İptal",
                    style: "cancel"
                },
                { 
                    text: "Çıkış Yap", 
                    onPress: () => {
                        console.log("Kullanıcı çıkış yaptı.");
                        // 🔥 HESAPTAN ÇIKIŞ BAŞARILI OLDUĞUNDA LOGIN EKRANINA YÖNLENDİRME
                        navigation.navigate('Login' as never); 
                    },
                    style: 'destructive'
                }
            ]
        );
    };

    // 💡 Geri Ana Sayfaya Gitme İşlemi
    const handleGoBack = () => {
        // Bir önceki ekrana (Home) döner.
        navigation.goBack();
    };

    // 💡 Basit bir ayar öğesi (placeholder)
    const renderSettingItem = (icon: keyof typeof Feather.glyphMap | keyof typeof Ionicons.glyphMap, text: string, onPress: () => void, isLast = false) => (
        <TouchableOpacity style={[styles.settingItem, isLast && styles.noBorder]} onPress={onPress}>
            <Feather name={icon as keyof typeof Feather.glyphMap} size={20} color={styles.userName.color} />
            <Text style={styles.settingText}>{text}</Text>
            <Feather name="chevron-right" size={20} color="#CCC" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={styles.header.backgroundColor} />
            
            <ScrollView>
                {/* Header Bölümü */}
                <View style={styles.header}>
                    {/* 🏠 GERİ DÖN BUTONU (Yeni) */}
                    <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                        <Feather name="arrow-left" size={24} color="#FFF" />
                    </TouchableOpacity>
                    
                    {/* Profil Detayları */}
                    <View style={styles.profileDetailsContainer}>
                        <View style={styles.profileAvatar}>
                            <Text style={styles.avatarText}>{USER_INITIAL}</Text>
                        </View>
                        <Text style={styles.userName}>{USER_NAME}</Text>
                        <Text style={styles.userEmail}>{USER_EMAIL}</Text>
                    </View>
                </View>

                {/* Hesap Ayarları Kartı */}
                <Text style={styles.sectionTitle}>Hesap Ayarları</Text>
                <View style={styles.settingsCard}>
                    {renderSettingItem('lock', 'Şifreyi Değiştir', () => Alert.alert('Şifre Değiştirme', 'Bu fonksiyon ileride eklenecektir.') )}
                    {renderSettingItem('credit-card', 'Ödeme Bilgileri', () => Alert.alert('Ödeme', 'Bu fonksiyon ileride eklenecektir.') )}
                    {renderSettingItem('bell', 'Bildirim Ayarları', () => Alert.alert('Bildirimler', 'Bu fonksiyon ileride eklenecektir.'), true )}
                </View>

                {/* Genel Ayarlar Kartı */}
                <Text style={styles.sectionTitle}>Uygulama</Text>
                <View style={styles.settingsCard}>
                    {renderSettingItem('info', 'Hakkımızda', () => Alert.alert('Hakkımızda', 'Bu uygulama Lunessa tarafından geliştirilmiştir.') )}
                    {renderSettingItem('help-circle', 'Yardım ve Destek', () => Alert.alert('Yardım', 'Bu fonksiyon ileride eklenecektir.'), true )}
                </View>

                {/* Hesaptan Çıkış Butonu */}
                <TouchableOpacity 
                    style={[styles.actionButton, styles.logoutButton]} 
                    onPress={handleLogout}
                    activeOpacity={0.8}
                >
                    <MaterialIcons name="logout" size={24} color="#FFF" />
                    <Text style={styles.actionButtonText}>Hesaptan Çıkış Yap</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}
