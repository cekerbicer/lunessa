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
import styles from '../../design/theme';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

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
    if (!login) navigation.navigate('Register' as never);
  };

  const handleSubmit = () => {
    if (!isLogin) {
        console.log('Kayıt Ol butonu tıklandı. Register ekranına yönlendiriliyor.');
        navigation.navigate('Register' as never);
        return;
    }
    if (email === 'ceren' && password === '123456') {
        console.log('Giriş Başarılı!');
          navigation.navigate('Photo' as never);
    } else {
        // Statik kontrol başarısız
        alert('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
        console.log('Giriş başarısız: Yanlış e-posta veya şifre.');
    }
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

        {/* Segmented Control */}
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
              placeholder=""
              onFocus={() => setIsFocused({ ...isFocused, email: true })}
              onBlur={() => setIsFocused({ ...isFocused, email: false })}
            />
            <View style={styles.dashedLine} />
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Şifre</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.inputField, styles.passwordInput]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
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
            </View>
            <View style={styles.dashedLine} />
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}
