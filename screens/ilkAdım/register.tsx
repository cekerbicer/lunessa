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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';

import styles from '../../design/AuthScreenStyles';

export default function RegisterScreen() {
  const navigation = useNavigation();

  // Kayıt Ekranına Özgü State'ler
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Kayıt ekranı olduğu için başlangıçta false
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Animasyon State'leri
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Bileşen yüklendiğinde animasyonu başlat
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

  // Geçici Kayıt Fonksiyonu
  const handleSubmit = () => {
    console.log('Register attempt:', { email, password, confirmPassword });
    // ⚠️ Burada kayıt işlemi yapılacak (Backend aşaması)
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" />
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.brandName}>Lunessa</Text>

        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[styles.segmentButton, isLogin && styles.segmentButtonActive]}
            onPress={() => handleSegmentChange(true)}
          >
            <Text style={[styles.segmentText, isLogin && styles.segmentTextActive]}>
              Giriş
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segmentButton, !isLogin && styles.segmentButtonActive]}
            onPress={() => handleSegmentChange(false)}
          >
            <Text style={[styles.segmentText, !isLogin && styles.segmentTextActive]}>
              Kayıt Ol
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>E-Mail</Text>
            <TextInput
              style={styles.inputField}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.dashedLine} />
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Şifre</Text>
            <TextInput
              style={styles.inputField}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
             <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#2F3A66"
                />
              </TouchableOpacity>
            <View style={styles.dashedLine} />
          </View>

          {/* Confirm Password Input (Yeni Alan) */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Şifre Tekrarı</Text>
            <TextInput
              style={styles.inputField}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
             <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color="#2F3A66"
                />
              </TouchableOpacity>
            <View style={styles.dashedLine} />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}