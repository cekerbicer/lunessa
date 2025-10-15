import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Renk Tanımları
const DARK_GREEN = '#16B576';
const LIGHT_GREEN = '#B7EACD';
const DARK_BLUE = '#2F3A66';
const MOR = '#5F4890'; 
const GREY = '#F3F4F6';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GREY, // Hafif gri arkaplan
    },
    // --- Başlık Çubuğu ---
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: MOR,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    greetingContainer: {
        flex: 1,
    },
    greetingText: {
        fontSize: 14,
        color: LIGHT_GREEN,
        fontWeight: '600',
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
    },
    profileButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: DARK_GREEN, // Profil butonu rengi
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    // --- İçerik ve Alışkanlıklar ---
    content: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: DARK_BLUE,
        marginBottom: 15,
        marginTop: 5,
    },
    habitCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    habitInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    habitIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: LIGHT_GREEN,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    habitText: {
        fontSize: 16,
        fontWeight: '600',
        color: DARK_BLUE,
    },
    habitIcon: {
        color: DARK_BLUE, // İkon rengini koyu mavi yap
    },
    // Tamamlandı durumları
    completionStatus: {
        padding: 8,
        borderRadius: 20,
        width: 35,
        height: 35,
        borderWidth: 2,
        borderColor: DARK_GREEN,
        justifyContent: 'center',
        alignItems: 'center',
    },
    completedIcon: {
        color: DARK_GREEN,
    },
    graphCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginTop: 20, // Alışkanlık listesi ile arasına boşluk
        borderRadius: 12,
        backgroundColor: '#F7F7F7', // Açık renkli bir arka plan
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    graphContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    graphIcon: {
        color: '#5B86E5', // Marka renginizden bir ton
    },
    graphTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    graphSubtitle: {
        fontSize: 12,
        color: '#777',
        marginTop: 2,
    },
});

export default styles;
