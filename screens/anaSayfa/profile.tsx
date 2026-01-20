import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Alert,
    ActivityIndicator,
    Platform,
    Image,Linking
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';

import styles from '../../design/ProfileScreenStyles';

// 🚀 GÜNCELLENDİ: Firebase yerine Supabase import edildi
import { supabase } from '../../supabase';

import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// Fotoğraf yükleme için gereklidir (Supabase arraybuffer bekler)
// Eğer bu paket yoksa: 'npm install base64-arraybuffer' yapmalısın.
// import { decode } from 'base64-arraybuffer'; 

export default function ProfileScreen() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [photoURL, setPhotoURL] = useState(null);

    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // Ekran her odaklandığında kullanıcı verisini çek
    useEffect(() => {
        if (isFocused) {
            fetchUserData();
        }
    }, [isFocused]);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            // 1. Supabase'den güncel kullanıcıyı al
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // E-postayı ayarla
                setUserEmail(user.email || '');

                // 2. 'profiles' tablosundan 'username' verisini çek
                // (Senin tablon 'profiles' ve sütunun 'username' olduğu için buna göre ayarladım)
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*') // Tüm veriyi çekelim (avatar_url vs. lazım olabilir)
                    .eq('id', user.id)
                    .single();

                if (data) {
                    setUserName(data.username || user.user_metadata?.full_name || 'Kullanıcı');

                    // Eğer veritabanında profil fotosu varsa (avatar_url sütunu)
                    if (data.avatar_url) {
                        // Public URL al (Storage bucket adının 'avatars' olduğunu varsayıyoruz)
                        const { data: publicUrlData } = supabase
                            .storage
                            .from('avatars')
                            .getPublicUrl(data.avatar_url);
                        // setPhotoURL(publicUrlData.publicUrl);
                    }
                } else {
                    // Profil tablosunda veri yoksa metadata veya varsayılan kullan
                    setUserName(user.user_metadata?.full_name || 'Kullanıcı');
                }
            } else {
                (navigation as any).navigate('Login');
            }
        } catch (error) {
            console.error("Profil verisi çekilirken hata:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user || !user.email) {
            Alert.alert("Hata", "Önce giriş yapmalısınız.");
            return;
        }

        // Sosyal medya giriş kontrolü (Supabase provider kontrolü)
        const isSocialLogin = user.app_metadata.provider !== 'email';

        if (isSocialLogin) {
            Alert.alert(
                "Bilgi",
                "Google/Apple hesabınız ile giriş yaptınız. Şifrenizi uygulama içinden değiştiremezsiniz."
            );
            return;
        }

        Alert.alert(
            "Şifre Değiştirme",
            `Şifrenizi değiştirmek için ${user.email} adresinize bir link göndereceğiz. Onaylıyor musunuz?`,
            [
                { text: "İptal", style: "cancel" },
                {
                    text: "Gönder",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            // Supabase Şifre Sıfırlama
                            const { error } = await supabase.auth.resetPasswordForEmail(user.email || '');
                            if (error) throw error;

                            Alert.alert(
                                "Başarılı",
                                "E-posta adresinize bir şifre değiştirme linki gönderildi. Lütfen e-postanızı kontrol edin."
                            );
                        } catch (error) {
                            console.error("Şifre sıfırlama hatası:", error);
                            Alert.alert("Hata", "İşlem başarısız oldu: " + (error as any).message);
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    const handleUpdatePhoto = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // 1. Galeri izni iste
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('İzin Gerekli', 'Fotoğrafınızı güncellemek için galeri izni vermelisiniz.');
            return;
        }

        // 2. Galeriyi aç
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
                base64: true, // Supabase upload için gerekli
            });

            if (result.canceled || !result.assets || !result.assets[0].base64) {
                return;
            }

            setLoading(true);
            const base64 = result.assets[0].base64;
            const fileExt = result.assets[0].uri.split('.').pop();
            const fileName = `${user.id}/${Date.now()}.${fileExt}`;

            // --- FOTOĞRAF YÜKLEME KISMI (Supabase Storage) ---
            // 'avatars' adında Public bir bucket oluşturduğundan emin olmalısın.

            // Yükleme işlemi:
            // const { error: uploadError } = await supabase.storage
            //      .from('avatars')
            //      .upload(fileName, decode(base64), {
            //          contentType: 'image/' + fileExt,
            //          upsert: true
            //      });

            // if (uploadError) {
            //     throw uploadError;
            // }

            // Profil tablosunu güncelle
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: fileName })
                .eq('id', user.id);

            if (updateError) throw updateError;


            Alert.alert('Başarılı', 'Profil fotoğrafınız güncellendi.');

        } catch (error) {
            console.error("Fotoğraf yükleme hatası:", error);
            Alert.alert("Hata", "Fotoğraf güncellenirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    // Hesaptan Çıkış İşlemi
    const handleLogout = () => {
        Alert.alert(
            "Hesaptan Çıkış",
            "Hesabınızdan çıkış yapmak istediğinizden emin misiniz?",
            [
                { text: "İptal", style: "cancel" },
                {
                    text: "Çıkış Yap",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            // Supabase SignOut
                            const { error } = await supabase.auth.signOut();
                            if (error) throw error;

                            console.log("Kullanıcı çıkış yaptı.");
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' as never }],
                            });
                        } catch (error) {
                            console.error("Çıkış yaparken hata:", error);
                            Alert.alert("Hata", "Çıkış yapılırken bir sorun oluştu.");
                            setLoading(false);
                        }
                    },
                    style: 'destructive'
                }
            ]
        );
    };
    const handleAboutUs = () => {
        Alert.alert(
            "🌙 Lunessa Hakkında",
            "Lunessa, küçük adımların gücüne inananlar için geliştirilmiş bir gelişim asistanıdır.\n\n" +
            "Amacımız, alışkanlıklarını disiplinli bir şekilde takip etmeni sağlayarak potansiyeline ulaşmana yardımcı olmaktır.\n\n" +
            "Versiyon: 1.0.0\n" +
            "Geliştirici: Lunessa Team",
            [{ text: "Anladım", style: "default" }]
        );
    };
    // Geri Ana Sayfaya Gitme İşlemi
    const handleGoBack = () => {
        navigation.goBack();
    };
    const handleChangeHabits = () => {
        (navigation as any).navigate('Habit');
    };
    const handleSupportContact = () => {
        const email = 'lunessa.destekyardim@gmail.com'; // Burayı kendi e-postanızla değiştirin
        const subject = 'Uygulama Destek Talebi';
        const body = 'Merhaba, uygulamanızla ilgili şu konuda yardıma ihtiyacım var: ';
        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        Linking.openURL(url);
        Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert('Hata', 'E-posta uygulaması bulunamadı veya bu işlem desteklenmiyor.');
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('Bir hata oluştu:', err));
};
    
    // Bildirim Ayarları Fonksiyonu
    const handleNotificationSettings = async () => {

        if (Constants.appOwnership === 'expo') {
            Alert.alert(
                'Özellik Desteklenmiyor',
                'Push bildirimleri Expo Go uygulamasında tam desteklenmeyebilir.'
            );
        }

        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            Alert.alert("Hata", "Önce giriş yapmalısınız.");
            setLoading(false);
            return;
        }

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            Alert.alert('İzin Reddedildi', 'Bildirim izni verilmedi.');
            setLoading(false);
            return;
        }

        try {
            // Project ID'nizi buraya girmelisiniz
            const tokenData = await Notifications.getExpoPushTokenAsync({
                projectId: 'BURAYA-PROJECT-ID-GELECEK',
            });
            const token = tokenData.data;
            console.log("Expo Push Token:", token);

            // Supabase Veritabanına Kaydet
            // Tablonda 'expo_push_token' adında bir sütun olmalı.
            const { error } = await supabase
                .from('profiles')
                .update({ expo_push_token: token })
                .eq('id', user.id);

            if (error) throw error;

            Alert.alert('Başarılı', 'Bildirim ayarları kaydedildi!');

        } catch (error) {
            console.error("Token kaydedilirken hata:", error);
        } finally {
            setLoading(false);
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    };

    const renderSettingItem = (
        icon: any,
        text: string,
        onPress: () => void,
        isLast: boolean = false
    ) => (
        <TouchableOpacity style={[styles.settingItem, isLast && styles.noBorder]} onPress={onPress} disabled={loading}>
            <Feather name={icon} size={20} color={styles.userName.color} />
            <Text style={styles.settingText}>{text}</Text>
            <Feather name="chevron-right" size={20} color="#CCC" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header Bölümü */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                        <Feather name="chevron-left" size={24} color="#FFF" />
                    </TouchableOpacity>

                    <View style={styles.profileDetailsContainer}>
                        <TouchableOpacity onPress={handleUpdatePhoto} disabled={loading} activeOpacity={0.9}>
                            <View style={styles.profileAvatar}>
                                {loading ? (
                                    <ActivityIndicator size="small" color="#FFF" />
                                ) : photoURL ? (
                                    <Image source={{ uri: photoURL }} style={styles.avatarImage} />
                                ) : (
                                    <Text style={styles.avatarText}>
                                        {(userName.charAt(0) || '?').toUpperCase()}
                                    </Text>
                                )}
                            </View>
                            {/* Küçük düzenle ikonu */}
                            <View style={{ position: 'absolute', bottom: 15, right: 0, backgroundColor: '#49bd74', borderRadius: 12, padding: 4, borderWidth: 2, borderColor: '#2F3A66' }}>
                                <Feather name="edit-2" size={12} color="#FFF" />
                            </View>
                        </TouchableOpacity>

                        {loading ? (
                            <ActivityIndicator size="small" color="#FFF" style={{ marginTop: 10 }} />
                        ) : (
                            <>
                                <Text style={styles.userName}>{userName}</Text>
                                <Text style={styles.userEmail}>{userEmail}</Text>
                            </>
                        )}
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={styles.sectionTitle}>Hesap Ayarları</Text>
                    <View style={styles.settingsCard}>
                        {renderSettingItem('lock', 'Şifreyi Değiştir', handleChangePassword)}
                        {renderSettingItem('list', 'Alışkanlıklarımı Düzenle', handleChangeHabits)}
                        {renderSettingItem('bell', 'Bildirim Ayarları', handleNotificationSettings, true)}
                    </View>

                    <Text style={styles.sectionTitle}>Uygulama</Text>
                    <View style={styles.settingsCard}>
                        {renderSettingItem('info', 'Hakkımızda', handleAboutUs)}
                        {renderSettingItem('help-circle', 'Yardım ve Destek', handleSupportContact, true)}
                    </View>

                    <TouchableOpacity
                        style={[styles.logoutButton, loading && { opacity: 0.5 }]}
                        onPress={handleLogout}
                        activeOpacity={0.8}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                            <>
                                <MaterialIcons name="logout" size={22} color="#FFF" />
                                <Text style={styles.actionButtonText}>Hesaptan Çıkış Yap</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}