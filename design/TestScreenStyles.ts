import { StyleSheet, Platform } from 'react-native';

const DARK_GREEN = '#16B576';
const LIGHT_GREEN = '#B7EACD';
const DARK_BLUE = '#2F3A66';
const MOR = '#5F4890'; 
const firstColor = '#5a7ede';
const secondColor = '#8fb4f2';
const thirdColor = '#fecaba';
const fourthColor = '#45ca76';
const fifthColor = '#6cd076';
const sixthColor = '#aae8af';
const seventhColor = '#ff8e6d';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: MOR,
    },
    container: {
        flex: 1,
        backgroundColor: sixthColor,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 10 : 0,
    },
    
    // --- İlerleme Çubuğu ---
    progressBarContainer: {
        height: 8,
        width: '100%',
        backgroundColor: fifthColor,
        borderRadius: 4,
        marginBottom: 20,
        marginTop:20,
        overflow: 'hidden',
    },
    progressBar: {

        height: '100%',
        backgroundColor: DARK_GREEN,
        borderRadius: 4,
    },

    questionContainer: {
        // flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    
    questionNumber: {
        fontSize: 14,
        fontWeight: '700',
        color: fifthColor,
        marginBottom: 20,
    },
    numericInput: {
        height: 50,
        width: '100%',
        borderWidth: 2,
        borderColor: seventhColor,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
        color: firstColor, // DARK_BLUE
        marginTop: 1,
    },

    // 💡 YENİ: Geri/İleri butonlarını sarmak için
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 30,
        paddingBottom: 10,
        paddingTop: 10,
        marginTop: 'auto', 
        marginBottom:70,
    },

    // 💡 YENİ: Genel navigasyon butonu stili
    navButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25, // Yuvarlak kenar
        flex: 1, // Alanı eşit paylaşsınlar
        marginHorizontal: 5, // Aralarına boşluk
        alignItems: 'center',
    },
    // 💡 YENİ: Ana buton (İleri)
    navButtonPrimary: {
        backgroundColor: fourthColor, // DARK_GREEN
    },
    // 💡 YENİ: İkincil buton (Geri)
    navButtonSecondary: {
        backgroundColor: '#F0F0F0', // Açık gri
        borderWidth: 1,
        borderColor: '#DDD',
    },
    // 💡 YENİ: Pasif buton stili
    navButtonDisabled: {
        backgroundColor: '#B0B0B0', // Gri
        opacity: 0.7,
    },
    // 💡 YENİ: Ana buton metni (Beyaz)
    navButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    // 💡 YENİ: İkincil buton metni (Koyu)
    navButtonTextSecondary: {
        color: '#555555',
    },
    questionText: {
        fontSize: 20,
        fontWeight: '700',
        color: DARK_BLUE,
        marginBottom: 30,
        lineHeight: 28,
    },

    // --- Seçenekler ---
    optionsContainer: {
        width: '100%',
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: thirdColor,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        color: DARK_BLUE,
        fontWeight: '600',
    },
    optionButtonSelected: { 
        borderColor: seventhColor, // Seçili butona koyu yeşil kenarlık ekle
        borderWidth: 2, // Kenarlık kalınlığını artır
    },
    checkIcon: {
        marginLeft: 10,
        color:seventhColor,
    }
});

export default styles;
