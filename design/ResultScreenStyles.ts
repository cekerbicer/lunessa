import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const KOYU_MAVI = '#2F3A66';
const seventhColor = '#ff8e6d';

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: width,
        height: height,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 32, 
        paddingBottom: 100,
        paddingHorizontal: 20,
    },
    headerContainer: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFFFFF', // Arkaplan üzerinde beyaz daha iyi durur
        textAlign: 'center',
        marginTop: 80,
    },
    subHeader: {
        color: 'white',
        opacity: 0.9,
        textAlign: 'center',
        fontSize: 16,
        marginTop: 5,
    },
    resultCard: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 25,
        alignItems: 'center',
        // Sabit height kaldırıldı, ScrollView içeriğe göre büyüyecek
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    cardTopSection: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    ciltImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    ciltTipiTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        letterSpacing: 1
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
    },
    warningContainer: {
        backgroundColor: 'rgba(251, 178, 153, 0.15)', 
        padding: 15,
        borderRadius: 25,
        width: '100%',
        marginBottom: 25,
        borderLeftWidth: 5,
        borderLeftColor: '#ff5920', 
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: 'rgba(251, 178, 153, 0.3)',
    },
    warningHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    warningTitle: {
        color: '#ff5920', 
        fontWeight: '700', 
        fontSize: 14,
        marginLeft: 8,
        letterSpacing: 0.3,
    },
    warningText: {
        color: '#7A5C55', 
        fontSize: 12,
        lineHeight: 20,
        fontWeight: '600',
    },
    cardBottomSection: {
        width: '100%',
        alignItems: 'center',
    },
    infoText: {
        textAlign: 'center',
        color: '#888',
        marginBottom: 20,
        fontSize: 14,
        lineHeight: 20,
    },
    habitButton: {
        width: '100%',
        backgroundColor: '#5a79d3',
        borderRadius: 20,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: seventhColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    habitButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    durumText: {
        fontSize: 15,
        color: '#64748B',
        marginTop: 6,
        fontWeight: '500',
    },
    // EKSİK OLAN KISIM BURASI:
    sorunHighlight: {
        fontWeight: '800',
        color: '#FF8E6D', // ACCENT_ORANGE renginiz
    },
});

export default styles;