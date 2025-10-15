import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Renk Tanımları
const DARK_GREEN = '#16B576';
const LIGHT_GREEN = '#B7EACD';
const DARK_BLUE = '#2F3A66';
const MOR = '#5F4890'; 
const GREY = '#F3F4F6';
const RED_DANGER = '#D9534F'; // Hesaptan çıkış butonu için

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GREY,
    },
    // --- Başlık ve Kullanıcı Bilgisi ---
    header: {
        backgroundColor: MOR,
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
    },
    profileAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: DARK_GREEN, // Kullanıcının baş harfi için yeşil zemin
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 3,
        borderColor: '#FFF',
    },
    avatarText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FFF',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    },
    userEmail: {
        fontSize: 14,
        color: LIGHT_GREEN,
        marginTop: 4,
    },
    // --- Ayarlar Kartları ---
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: DARK_BLUE,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    settingsCard: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginHorizontal: 15,
        marginBottom: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: GREY,
    },
    settingText: {
        flex: 1,
        fontSize: 16,
        color: DARK_BLUE,
        marginLeft: 15,
    },
    // Son öğede alt çizgi olmasın
    noBorder: {
        borderBottomWidth: 0,
    },
    // --- Aksiyon Butonları ---
    actionButton: {
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    logoutButton: {
        backgroundColor: RED_DANGER,
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 10,
    },
    backButton: {
        position: 'absolute',
        top: 45, 
        left: 20,
        zIndex: 10,
        padding: 5, // Tıklama alanını artırmak için
    },
    profileDetailsContainer: {
        alignItems: 'center',
        // Geri butonunun üstüne gelmemesi için ek boşluk
        marginTop: 5, 
    },
});

export default styles;
