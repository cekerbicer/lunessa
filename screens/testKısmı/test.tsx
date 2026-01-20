import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    SafeAreaView,
    ScrollView, 
    TextInput,
    Alert 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { questions, totalQuestions } from '../../testQ'; 
import styles from '../../design/TestScreenStyles';

// Supabase client'ı import et (Yolunu kendi projene göre ayarla)
import { supabase } from '../../supabase'; 

interface AnswersState {
    [key: number]: string;
}

export default function TestScreen() {
    const navigation = useNavigation();
    const route = useRoute(); 
    // @ts-ignore
    const imageUri = route.params?.imageUri;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<AnswersState>({}); 
    const [loading, setLoading] = useState(false); // Kayıt sırasında butonu kilitlemek için

    const currentQuestion = questions[currentQuestionIndex];
    const DARK_GREEN = '#16B576';

    // ... (handleSelectOption, handleNumericInput, handleBack fonksiyonları aynı kalacak) ...
    const handleSelectOption = (optionId: string) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    };

    const handleNumericInput = (value: string) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: numericValue }));
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // --- YENİ EKLENEN FONKSİYON: SUPABASE KAYIT ---
    const saveTestToSupabase = async (finalAnswers: AnswersState) => {
        try {
            // 1. Oturum açmış kullanıcıyı al
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                Alert.alert("Hata", "Kullanıcı oturumu bulunamadı.");
                return false;
            }

            // 2. Veritabanına kaydet
            const { error } = await supabase
                .from('user_tests')
                .insert([
                    {
                        user_id: user.id,
                        answers: finalAnswers, // Tüm cevapları JSON olarak kaydeder
                        // created_at otomatik eklenir
                    }
                ]);

            if (error) throw error;
            console.log("✅ Test başarıyla Supabase'e kaydedildi.");
            return true;

        } catch (error) {
            console.error("Supabase kayıt hatası:", error);
            Alert.alert("Hata", "Test sonuçları kaydedilemedi.");
            return false;
        }
    };

    // --- GÜNCELLENEN BÖLÜM: BİTİR VE GÖNDER ---
    const finishTestAndGoToWait = async () => {
        if (!imageUri) {
            Alert.alert("Hata", "Analiz edilecek resim bulunamadı!");
            return;
        }

        setLoading(true); // Yükleniyor başlat

        // Biyometrik verileri hazırla
        const userBio = {
            boy: answers[17] ? parseInt(answers[17]) : 170,
            kilo: answers[18] ? parseInt(answers[18]) : 65
        };

        // 1. ÖNCE VERİTABANINA KAYDET
        // Not: await kullanarak kaydın bitmesini bekliyoruz.
        // İstersen bunu Wait ekranında da yapabilirsin ama burada yapmak garantidir.
        const isSaved = await saveTestToSupabase(answers);

        setLoading(false); // Yükleniyor bitir

        if (isSaved) {
            console.log("📦 Veriler Wait ekranına taşınıyor...");
            (navigation as any).navigate('Wait', { 
                imageUri: imageUri,
                answers: answers,
                userBio: userBio
            });
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            finishTestAndGoToWait();
        }
    };

    const isAnswerSelected = !!answers[currentQuestion.id] && answers[currentQuestion.id] !== '';

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* ... (Tasarım kodları aynı kalacak, sadece butona disabled ekleyebilirsin) ... */}
            <View style={styles.container}>

                 <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }} 
                    showsVerticalScrollIndicator={false}
                >
                     <View style={styles.progressBarContainer}>
                        <View style={[
                            styles.progressBar,
                            { width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }
                        ]} />
                    </View>

                    <View style={styles.questionContainer}>
                        <Text style={styles.questionNumber}>
                            Soru {currentQuestionIndex + 1} / {totalQuestions}
                        </Text>
                        <Text style={styles.questionText}>
                            {currentQuestion.question}
                        </Text>

                        {/* Cevap Alanı */}
                        <View style={styles.optionsContainer}>
                            {currentQuestion.type === 'numeric' ? (
                                <TextInput
                                    style={styles.numericInput}
                                    placeholder="Cevabınızı buraya yazın (Sadece sayı)"
                                    placeholderTextColor="#999"
                                    keyboardType="numeric"
                                    value={answers[currentQuestion.id] || ''}
                                    onChangeText={handleNumericInput}
                                />
                            ) : (
                                currentQuestion.options.map((option) => (
                                    <TouchableOpacity
                                        key={option.id}
                                        style={[
                                            styles.optionButton,
                                            answers[currentQuestion.id] === option.id && styles.optionButtonSelected
                                        ]}
                                        onPress={() => handleSelectOption(option.id)}
                                    >
                                        <Text style={styles.optionText}>{option.text}</Text>
                                        {answers[currentQuestion.id] === option.id && ( 
                                            <Ionicons name="checkmark-circle" size={24} color={DARK_GREEN} style={styles.checkIcon} />
                                        )}
                                    </TouchableOpacity>
                                ))
                            )}
                        </View>
                    </View> 

                    {/* Navigasyon Butonları */}
                    <View style={styles.navigationContainer}>
                        <TouchableOpacity
                            onPress={handleBack}
                            style={[
                                styles.navButton,
                                styles.navButtonSecondary,
                                currentQuestionIndex === 0 && { opacity: 0 } 
                            ]}
                            disabled={currentQuestionIndex === 0 || loading}
                        >
                            <Text style={[styles.navButtonText, styles.navButtonTextSecondary]}>Geri</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleNext}
                            style={[
                                styles.navButton,
                                styles.navButtonPrimary,
                                (!isAnswerSelected || loading) && styles.navButtonDisabled 
                            ]}
                            disabled={!isAnswerSelected || loading}
                        >
                            <Text style={styles.navButtonText}>
                                {loading ? 'Kaydediliyor...' : (currentQuestionIndex === totalQuestions - 1 ? 'Testi Bitir' : 'İleri')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}