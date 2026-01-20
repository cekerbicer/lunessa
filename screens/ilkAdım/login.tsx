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
    ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';

// Supabase import
import { supabase } from '../../supabase';

import styles from '../../design/AuthScreenStyles';

export default function LoginScreen() {
    const navigation = useNavigation();

    // State'ler
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Animasyon
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    // Animasyon Başlatma
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
        ]).start();
    }, []);

    const handleSegmentChange = (login: boolean) => {
        setIsLogin(login);
        if (!login) navigation.navigate('Register' as never);
    };
    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
            return;
        }
        setLoading(true);
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;
            Alert.alert("Başarılı", "Kayıt başarılı! Lütfen e-postanızı kontrol edin.");
        } catch (error: any) {
            Alert.alert("Kayıt Hatası", error.message);
        } finally {
            setLoading(false);
        }
    };
    // --- SUPABASE GİRİŞ FONKSİYONU ---
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Hata', 'Lütfen e-posta ve şifrenizi girin.');
            return;
        }

        setLoading(true);

        try {
            // 1. Supabase ile E-posta/Şifre Girişi
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;

            console.log('Giriş Başarılı:', data.user?.email);

            // 2. KULLANICI DURUMUNU KONTROL ET
            // Bu kullanıcı daha önce analiz yapmış mı? (Output tablosuna bak)
            const { data: outputData, error: outputError } = await supabase
                .from('output')
                .select('id') // Sadece id çeksek yeterli
                .eq('user_id', data.user.id)
                .limit(1)
                .single();

            // 3. YÖNLENDİRME KARARI
            if (outputData) {
                // Kayıt var -> Analiz yapılmış -> Direkt Ana Sayfaya
                console.log("Eski kayıt bulundu, Home'a gidiliyor.");
                navigation.navigate('Home' as never);
            } else {
                // Kayıt yok -> Analiz yapılmamış -> Test/Fotoğraf ekranına
                console.log("Kayıt yok, Photo ekranına gidiliyor.");
                navigation.navigate('Photo' as never);
            }

        } catch (error: any) {
            console.error('Giriş Hatası:', error.message);
            Alert.alert('Giriş Başarısız', 'E-posta veya şifre hatalı.');
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
                {/* Görselin üzerine hafif bir karartma katmanı ekleyerek metinleri belirginleştirelim */}
                <View style={styles.overlay}>
                    <ScrollView
                        keyboardShouldPersistTaps="always"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <Animated.View style={[styles.mainContent, { opacity: fadeAnim }]}>
                            
                            <View style={styles.headerArea}>
                                <Text style={styles.brandName}>Lunessa</Text>
                                <Text style={styles.brandSubtitle}>Işıltını Keşfetme Zamanı</Text>
                            </View>

                            <View style={styles.segmentedControl}>
                                <TouchableOpacity
                                    style={[styles.segmentButton, isLogin && styles.segmentButtonActive]}
                                    onPress={() => handleSegmentChange(true)}
                                >
                                    <Text style={[styles.segmentText, isLogin && styles.segmentTextActive]}>Giriş</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.segmentButton, !isLogin && styles.segmentButtonActive]}
                                    onPress={() => handleSegmentChange(false)}
                                >
                                    <Text style={[styles.segmentText, !isLogin && styles.segmentTextActive]}>Kayıt Ol</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.glassCard}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>E-Mail</Text>
                                    <View style={styles.inputContainer}>
                                        <Icon name="mail" size={18} color="#94A3B8" style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="E-posta adresin"
                                            placeholderTextColor="#94A3B8"
                                            value={email}
                                            onChangeText={setEmail}
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Şifre</Text>
                                    <View style={styles.inputContainer}>
                                        <Icon name="lock" size={18} color="#94A3B8" style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Şifren"
                                            placeholderTextColor="#94A3B8"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!showPassword}
                                        />
                                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                            <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} color="#94A3B8" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <TouchableOpacity 
                                    style={styles.primaryButton}
                                    onPress={isLogin ? handleLogin : handleRegister}
                                >
                                    {loading ? (
                                        <ActivityIndicator color="#FFF" />
                                    ) : (
                                        <Text style={styles.primaryButtonText}>
                                            {isLogin ? 'Giriş Yap' : 'Hemen Kaydol'}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={styles.forgotBtn}>
                                    <Text style={styles.forgotText}>Şifremi Unuttum</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}