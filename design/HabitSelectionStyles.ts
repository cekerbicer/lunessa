import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Renk Tanımları
const DARK_GREEN = '#16B576';
const LIGHT_GREEN = '#B7EACD';
const DARK_BLUE = '#2F3A66';
const MOR = '#5F4890'; 
const GREY_DISABLED = '#D1D5DB'; // Hafif gri, devre dışı bırakılmış buton için

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: MOR,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: LIGHT_GREEN,
        textAlign: 'center',
    },
    // --- Alışkanlık Listesi ---
    listContentContainer: {
        padding: 20,
        paddingBottom: 100, // Buton için boşluk
    },
    habitGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    habitCardWrapper: {
        width: (width / 2) - 30, // Ekran genişliğinin yarısı - padding
        marginBottom: 20,
    },
    habitCard: {
        minHeight: 150,
        backgroundColor: LIGHT_GREEN,
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 3,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    // Seçili durum stili: Koyu yeşil kenarlık ile vurgulanır
    habitCardSelected: {
        borderColor: DARK_GREEN,
        backgroundColor: '#E0F0E0', // Hafif bir ton farkı
    },
    habitIcon: {
        marginBottom: 10,
        marginTop: 5,
        color: DARK_BLUE,
    },
    habitTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: DARK_BLUE,
        textAlign: 'center',
    },
    // --- Başlayalım Butonu ---
    startButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#FFF', // Butonun arkası beyaz
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    startButton: {
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        // Devre dışı bırakılmış butonu stilize etmek için 'backgroundColor' dışarı taşındı
    },
    startButtonEnabled: {
        backgroundColor: DARK_GREEN,
    },
    startButtonDisabled: {
        backgroundColor: GREY_DISABLED,
    },
    startButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
});

export default styles;
