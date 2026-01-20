import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DARK_BLUE = '#2F3A66';
const SOFT_WHITE = '#FDFCFB';
const ACCENT_ORANGE = '#FF8E6D';
const MUTED_TEXT = '#64748B';
const LIGHT_GREEN = '#16B576';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SOFT_WHITE,
    },
    header: {
        paddingHorizontal: 25,
        paddingTop: 50,
        paddingBottom: 35,
        backgroundColor: '#5a79d3',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: '#FFF',
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#B7EACD',
        textAlign: 'center',
        lineHeight: 20,
        opacity: 0.9,
    },
    listContentContainer: {
        padding: 20,
        paddingBottom: 120, // Butonun arkada kalmaması için boşluk
    },
    habitGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    habitCardWrapper: {
        width: (width / 2) - 28,
        marginBottom: 16,
    },
    habitCard: {
        minHeight: 165,
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#B7EACD', // Normal durumda çok hafif border
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    habitCardSelected: {
        borderColor: '#ef4444', // Mercan rengi kenarlık
        backgroundColor: '#FFF5F2', // Çok açık şeftali arka plan
    },
    habitIcon: {
        marginBottom: 12,
    },
    habitTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#2F3A66',
        textAlign: 'center',
        marginBottom: 6,
    },
    habitDesc: {
        fontSize: 11,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 15,
    },
    priorityBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#FFEBEB',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    priorityText: {
        color: '#EF4444',
        fontSize: 8,
        fontWeight: '900',
    },
    checkBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    // --- Alt Buton Alanı ---
    startButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 25,
        paddingBottom: 35, // iPhone çentik uyumu
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        zIndex: 999,
        elevation: 20,
    },
    startButton: {
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#16B576',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    startButtonEnabled: {
        backgroundColor: '#16B576',
    },
    startButtonDisabled: {
        backgroundColor: '#CBD5E1',
    },
    startButtonText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#FFF',
        letterSpacing: 1,
    },
});

export default styles;