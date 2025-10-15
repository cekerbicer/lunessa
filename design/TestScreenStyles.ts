import { StyleSheet, Platform } from 'react-native';

const DARK_GREEN = '#16B576';
const LIGHT_GREEN = '#B7EACD';
const DARK_BLUE = '#2F3A66';
const MOR = '#5F4890'; 

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: MOR,
    },
    container: {
        flex: 1,
        backgroundColor: MOR,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 10 : 0,
    },
    
    // --- İlerleme Çubuğu ---
    progressBarContainer: {
        height: 8,
        width: '100%',
        backgroundColor: DARK_BLUE,
        borderRadius: 4,
        marginBottom: 30,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: DARK_GREEN,
        borderRadius: 4,
    },

    questionContainer: {
        flex: 1,
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
        fontWeight: '500',
        color: DARK_GREEN,
        marginBottom: 10,
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
        backgroundColor: LIGHT_GREEN,
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
        borderColor: DARK_GREEN, // Seçili butona koyu yeşil kenarlık ekle
        borderWidth: 2, // Kenarlık kalınlığını artır
    },
    checkIcon: {
        marginLeft: 10,
    }
});

export default styles;
