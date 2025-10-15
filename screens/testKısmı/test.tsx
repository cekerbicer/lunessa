import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { questions, totalQuestions } from '../../testQ'; 

import styles from '../../design/TestScreenStyles';

// Tip Tanımı: Cevaplar objesinin anahtarı number (soru id'si) ve değeri string (seçenek id'si) olmalı.
interface AnswersState {
    [key: number]: string;
}

export default function TestScreen() {
    const navigation = useNavigation();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // 💡 DÜZELTME: Cevaplar için tip tanımı eklendi
    const [answers, setAnswers] = useState<AnswersState>({}); 

    const currentQuestion = questions[currentQuestionIndex];
    
    // Temanızdaki renk tanımını burada da kullanalım
    const DARK_GREEN = '#16B576';
    const DARK_BLUE = '#2F3A66';


    const handleAnswer = (optionId: string) => {
        // Cevabı kaydet
        // currentQuestion.id bir sayı olduğundan, key olarak kullanırken sorun yaşamaz
        const newAnswers = { ...answers, [currentQuestion.id]: optionId };
        setAnswers(newAnswers);

        // Bir sonraki soruya geç veya testi bitir
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            console.log('Test Tamamlandı. Cevaplar:', newAnswers);
            
            // Son Adım: Test bitince Wait ekranına yönlendir
            navigation.navigate('Wait' as never);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                
                {/* İlerleme Çubuğu */}
                <View style={styles.progressBarContainer}>
                    <View style={[
                        styles.progressBar,
                        { width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }
                    ]} />
                </View>

                <View style={styles.questionContainer}>
                    {/* Soru Sayısı */}
                    <Text style={styles.questionNumber}>
                        Soru {currentQuestionIndex + 1} / {totalQuestions}
                    </Text>

                    {/* Soru Metni */}
                    <Text style={styles.questionText}>
                        {currentQuestion.question}
                    </Text>

                    {/* Cevap Seçenekleri */}
                    <View style={styles.optionsContainer}>
                        {currentQuestion.options.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                style={[
                                    styles.optionButton,
                                    // 💡 DÜZELTME: Cevap seçildiğinde kenarlığı belirginleştir
                                    answers[currentQuestion.id] === option.id && styles.optionButtonSelected
                                ]}
                                onPress={() => handleAnswer(option.id)}
                            >
                                <Text style={styles.optionText}>{option.text}</Text>
                                {/* İkon: Cevap seçildiğinde yeşil tik gösterir */}
                                {/* 💡 DÜZELTME: Hata alınan koşul. Tip güvenliği artık sağlanıyor. */}
                                {answers[currentQuestion.id] === option.id && ( 
                                    <Ionicons name="checkmark-circle" size={24} color={DARK_GREEN} style={styles.checkIcon} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
