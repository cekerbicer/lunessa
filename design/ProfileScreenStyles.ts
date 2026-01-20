import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Ana Sayfa ile uyumlu renkler
const DARK_BLUE = '#2F3A66';
const SOFT_WHITE = '#FDFCFB';
const ACCENT_ORANGE = '#ff7e52'; 
const MUTED_TEXT = '#6ec57c';
const LIGHT_RED = '#ffab91';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SOFT_WHITE,
    },
    // --- Başlık Bölümü (Modern Gradyan Etkisi) ---
    header: {
        backgroundColor: '#9beea8',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 40,
        alignItems: 'center',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        marginBottom: 20,
        // Gölge efekti
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    profileAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    avatarText: {
        color: '#FFF',
        fontSize: 40,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 22,
        fontWeight: '800',
        color: '#FFF',
        letterSpacing: 0.5,
    },
    userEmail: {
        fontSize: 14,
        color: '#49bd74',
        fontWeight:600,
        marginTop: 4,
        opacity: 0.9,
    },
    // --- Kartlar ---
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: MUTED_TEXT,
        paddingHorizontal: 25,
        marginBottom: 10,
        marginTop: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    settingsCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        marginHorizontal: 20,
        marginBottom: 20,
        paddingVertical: 8,
        // Modern hafif gölge
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    settingText: {
        flex: 1,
        fontSize: 16,
        color: DARK_BLUE,
        fontWeight: '500',
        marginLeft: 15,
    },
    noBorder: {
        borderBottomWidth: 0,
    },
    // --- Çıkış Butonu ---
    logoutButton: {
        backgroundColor: '#49bd74',
        padding: 18,
        borderRadius: 20,
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 10,
    },
    backButton: {
        position: 'absolute',
        top: 50, 
        left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 12,
        padding: 8,
    },
    profileDetailsContainer: {
        alignItems: 'center',
    },
    // Border eklemek için yardımcı stil
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    }
});

export default styles;