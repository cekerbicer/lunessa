import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.3)', // Görseli çok az karartarak derinlik katar
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingVertical: 50,
    },
    // HATA VEREN KISIM BURASIYDI, EKLENDİ:
    mainContent: {
        width: '100%',
        alignItems: 'center',
    },
    headerArea: {
        alignItems: 'center',
        marginBottom: 40,
    },
    brandName: {
        fontSize: 48,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -2,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 10,
    },
    brandSubtitle: {
        fontSize: 16,
        color: '#F1F5F9',
        fontWeight: '500',
        marginTop: 2,
        opacity: 0.9,
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        padding: 5,
        marginBottom: 30,
        width: '100%',
        maxWidth: 280,
    },
    segmentButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 16,
    },
    segmentButtonActive: {
        backgroundColor: '#FFF',
    },
    segmentText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FFF',
    },
    segmentTextActive: {
        color: '#0F172A',
    },
    glassCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.96)', // Hafif geçirgen cam efekti
        borderRadius: 32,
        padding: 25,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.15,
        shadowRadius: 30,
        elevation: 10,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 8,
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        paddingHorizontal: 15,
        height: 56,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#0F172A',
    },
    primaryButton: {
        backgroundColor: '#16B576', // Logonuzdaki yeşil tonu
        borderRadius: 18,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        shadowColor: '#16B576',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
    primaryButtonText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: '700',
    },
    forgotBtn: {
        marginTop: 20,
        alignItems: 'center',
    },
    forgotText: {
        color: '#64748B',
        fontSize: 14,
        fontWeight: '600',
    }
});

export default styles;