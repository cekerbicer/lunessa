import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const DARK_GREEN = '#16B576';
const KOYU_MAVI = '#2F3A66';
const MOR = '#5F4890'; 
const ACIK_MOR = '#8B5EA9';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Beyaz arkaplan
        justifyContent: 'flex-start', // İçeriği yukarı hizala
        alignItems: 'center',
        paddingTop: height * 0.05,
    },
    // Başlık/Metin 1 için alan
    headerContainer: {
        width: '85%',
        marginBottom: 20,
        alignItems: 'center',
    },
    // Başlık (Metin 1) stili
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: KOYU_MAVI,
        textAlign: 'center',
        lineHeight: 30,
    },

    // Sonuç Kartı (Animasyonlu Kutu)
    resultCard: {
        width: '90%',
        maxHeight: height * 0.75, // Ekranın %75'ini kaplar
        backgroundColor: MOR,
        borderRadius: 20,
        padding: 25,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 8,
    },

    // Metin 2 Topluluğu (Liste)
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
        paddingBottom: 5,
        width: '100%',
    },
    listContainer: {
        flexGrow: 1,
        paddingBottom: 20, 
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    listItemText: {
        fontSize: 16,
        color: '#FFFFFF',
        marginLeft: 10,
    },
    // Liste maddesi için farklı renkli ikon (Temaya uygun yeşil)
    iconStyle: {
        color: DARK_GREEN,
    },

    // Alışkanlık Seçimi Butonu
    habitButton: {
        width: '100%',
        backgroundColor: DARK_GREEN,
        borderRadius: 15,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 25,
    },
    habitButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default styles;
