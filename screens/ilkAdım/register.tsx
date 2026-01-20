import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Animated,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Alert,
    ScrollView,
    ActivityIndicator,
    ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';

// Firebase yerine Supabase import edildi
import { supabase } from '../../supabase'; 

import styles from '../../design/AuthScreenStyles';

export default function RegisterScreen() {
    const navigation = useNavigation();

    // Kayıt Ekranına Özgü State'ler
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Animasyon State'leri
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]).start();
    }, []);

    const handleSegmentChange = (login: boolean) => {
        setIsLogin(login);
        if (login) navigation.navigate('Login' as never);
    };

    // --- GÜNCELLENMİŞ SUPABASE KAYIT FONKSİYONU ---
    const handleRegister = async () => {
        // 1. Alan Kontrolleri
        if (!fullName || !email || !password || !confirmPassword) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurun ve cinsiyetinizi seçin.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Hata', 'Şifreleriniz eşleşmiyor.');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Hata', 'Şifreniz en az 6 karakter olmalıdır.');
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (error) throw error;

            if (data.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: data.user.id, // Auth ID ile eşleşir
                            username: fullName,
                            email: email,
                            // created_at veritabanında otomatik atanır
                        }
                    ]);
                
                if (profileError) throw profileError;
            }

            console.log('Kullanıcı Supabase’e kaydedildi:', data.user?.email);

            Alert.alert(
                'Başarılı', 
                'Kayıt işlemi tamamlandı! Giriş sayfasına yönlendiriliyorsunuz.',
                [
                    { text: "Tamam", onPress: () => navigation.navigate('Login' as never) }
                ]
            );

        } catch (error: any) {
            console.error('Kayıt Hatası:', error.message);
            Alert.alert('Kayıt Başarısız', error.message || 'Bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar barStyle="light-content" />
            
            <ImageBackground 
                source={require('../../assets/grs2.png')} 
                style={styles.backgroundImage}
            >
                <View style={styles.overlay}>
                    <ScrollView 
                        keyboardShouldPersistTaps="always"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <Animated.View
                            style={[
                                styles.mainContent, 
                                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                            ]}
                        >
                            <View style={styles.headerArea}>
                                <Text style={styles.brandName}>Lunessa</Text>
                                <Text style={styles.brandSubtitle}>Yeni Bir Başlangıç Yap</Text>
                            </View>

                            <View style={styles.segmentedControl}>
                                <TouchableOpacity
                                    style={[styles.segmentButton, isLogin && styles.segmentButtonActive]}
                                    onPress={() => handleSegmentChange(true)}
                                    disabled={loading}
                                >
                                    <Text style={[styles.segmentText, isLogin && styles.segmentTextActive]}>
                                        Giriş
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.segmentButton, !isLogin && styles.segmentButtonActive]}
                                    onPress={() => handleSegmentChange(false)}
                                    disabled={loading}
                                >
                                    <Text style={[styles.segmentText, !isLogin && styles.segmentTextActive]}>
                                        Kayıt Ol
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Form - Glass Card Yapısı */}
                            <View style={styles.glassCard}>
                                
                                {/* Ad Soyad */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Ad Soyad</Text>
                                    <View style={styles.inputContainer}>
                                        <Icon name="user" size={18} color="#94A3B8" style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Adınız ve Soyadınız"
                                            placeholderTextColor="#94A3B8"
                                            value={fullName}
                                            onChangeText={setFullName}
                                            autoCapitalize="words"
                                            editable={!loading}
                                        />
                                    </View>
                                </View>

                                {/* Email */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>E-Mail</Text>
                                    <View style={styles.inputContainer}>
                                        <Icon name="mail" size={18} color="#94A3B8" style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="ornek@mail.com"
                                            placeholderTextColor="#94A3B8"
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            editable={!loading}
                                        />
                                    </View>
                                </View>

                                {/* Şifre */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Şifre</Text>
                                    <View style={styles.inputContainer}>
                                        <Icon name="lock" size={18} color="#94A3B8" style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="En az 6 karakter"
                                            placeholderTextColor="#94A3B8"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!showPassword}
                                            editable={!loading}
                                        />
                                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                            <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} color="#94A3B8" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Şifre Tekrarı */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Şifre Tekrarı</Text>
                                    <View style={styles.inputContainer}>
                                        <Icon name="shield" size={18} color="#94A3B8" style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Şifreyi onaylayın"
                                            placeholderTextColor="#94A3B8"
                                            value={confirmPassword}
                                            onChangeText={setConfirmPassword}
                                            secureTextEntry={!showPassword}
                                            editable={!loading}
                                        />
                                    </View>
                                </View>

                                {/* Submit Button */}
                                <TouchableOpacity
                                    style={[styles.primaryButton, loading && { opacity: 0.8 }]}
                                    onPress={handleRegister}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <ActivityIndicator size="small" color="#FFF" />
                                    ) : (
                                        <Text style={styles.primaryButtonText}>Kayıt Ol</Text>
                                    )}
                                </TouchableOpacity>
                                
                                <View style={{ marginTop: 20, alignItems: 'center' }}>
                                    <Text style={{ color: '#64748B', fontSize: 13 }}>
                                        Zaten bir hesabın var mı?
                                    </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
                                        <Text style={{ color: '#16B576', fontWeight: 'bold', marginTop: 5 }}>Giriş Yap</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animated.View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}