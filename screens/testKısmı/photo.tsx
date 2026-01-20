import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Animated, Easing, Alert, ImageBackground } from 'react-native';
import { useNavigation, useIsFocused, NavigationProp } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, Camera } from 'expo-camera';
import styles from '../../design/photoScreen';

type RootStackParamList = {
    Test: { imageUri: string; base64?: string | null; };
};

export default function PhotoScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const isFocused = useIsFocused();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    
    const [type, setType] = useState<'front' | 'back'>('front'); // Selfie odaklı olduğu için front varsayılan
    const cameraRef = useRef<CameraView | null>(null);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    useEffect(() => {
        const getPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        if (isFocused) {
            getPermissions();
            Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 1.08, duration: 1200, useNativeDriver: true }),
                    Animated.timing(pulseAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
                ])
            ).start();
        }
    }, [isFocused]);

    const handleTakePhoto = async () => {
        if (!cameraRef.current) return;
        try {
            const photo = await cameraRef.current.takePictureAsync({ quality: 0.5, base64: true });
            if (photo && photo.uri) {
                navigation.navigate('Test', { imageUri: photo.uri, base64: photo.base64 });
            }
        } catch (error) { Alert.alert("Hata", "Fotoğraf çekilemedi."); }
    };

    const handleOpenGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') return Alert.alert('İzin Yok', 'Galeri izni gerekli.');
        
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // Kare seçim analiz için daha iyidir
            quality: 0.5,
            base64: true,
        });

        if (!result.canceled && result.assets[0]) {
            navigation.navigate('Test', { imageUri: result.assets[0].uri, base64: result.assets[0].base64 });
        }
    };

    if (hasPermission === null || hasPermission === false) {
        return <View style={styles.fullScreenContainer} />;
    }

    return (
        <View style={styles.fullScreenContainer}>
            <StatusBar barStyle="light-content" />
            
            {/* Arka Plan Görseli - Giriş sayfasıyla aynı */}
            <ImageBackground 
                source={require('../../assets/arkaplan.png')} 
                style={styles.backgroundImage}
            >
                <View style={styles.overlay}>
                    <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
                        
                        {/* Üst Bilgi Alanı */}
                        <View style={styles.topInfoArea}>
                            <Text style={styles.brandTitle}>Cilt Analizi</Text>
                            <Text style={styles.brandDesc}>Işıltını ölçmek için bir selfie çek.</Text>
                        </View>

                        {/* Kamera Alanı - Glassmorphism Kart İçinde */}
                        <View style={styles.glassCameraCard}>
                            {isFocused && (
                                <CameraView
                                    style={styles.cameraPreview}
                                    facing={type}
                                    ref={cameraRef}
                                >
                                    <View style={styles.scannerOverlay}>
                                        <Animated.View
                                            style={[
                                                styles.faceFrame,
                                                { transform: [{ scale: pulseAnim }] }
                                            ]}
                                        />
                                        <Text style={styles.alignFaceText}>Yüzünü Çerçeveye Hizala</Text>
                                    </View>
                                </CameraView>
                            )}
                        </View>

                        {/* Alt Kontroller */}
                        <View style={styles.bottomControls}>
                            <TouchableOpacity style={styles.blurButton} onPress={handleOpenGallery}>
                                <Feather name="image" size={24} color="#FFF" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.mainCaptureBtn} onPress={handleTakePhoto}>
                                <View style={styles.innerCaptureBtn}>
                                    <Ionicons name="scan" size={32} color="#7e96d4" />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.blurButton} onPress={() => setType(t => t === 'back' ? 'front' : 'back')}>
                                <Ionicons name="camera-reverse" size={24} color="#FFF" />
                            </TouchableOpacity>
                        </View>

                    </Animated.View>
                </View>
            </ImageBackground>
        </View>
    );
}