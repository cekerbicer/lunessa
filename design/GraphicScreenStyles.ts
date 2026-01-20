import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const statsStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FDFCFB' },
    topSection: {
        backgroundColor: '#fbb299',
        paddingTop: 40,
        paddingBottom: 50,
        paddingHorizontal: 25,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
    headerTitleText: { color: '#FFF', fontSize: 20, fontWeight: '800' },
    profileGlassBtn: { width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
    mainStatsCard: {
        backgroundColor: '#FFF',
        borderRadius: 28,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20,
    },
    spotlightInfo: { flex: 1 },
    spotlightTag: { fontSize: 10, fontWeight: '900', color: '#16B576', marginBottom: 4 },
    mainStatsValue: { fontSize: 32, fontWeight: '900', color: '#1E293B' },
    statsCircleBig: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#F0FDF4', justifyContent: 'center', alignItems: 'center' },
    contentPadding: { paddingHorizontal: 25, marginTop: -20 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    modernCard: {
        width: (width - 65) / 2,
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 18,
        marginBottom: 15,
        borderWidth: 1, borderColor: '#F1F5F9', elevation: 2,
    },
    cardIconBg: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    cardValueText: { fontSize: 16, fontWeight: '900', color: '#1E293B' },
    cardTitleText: { fontSize: 12, fontWeight: '600', color: '#94A3B8', marginTop: 2 },
    sectionHeading: { fontSize: 18, fontWeight: '900', color: '#1E293B', marginVertical: 20 },
    glassChartContainer: {
        backgroundColor: '#FFF',
        borderRadius: 28,
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderWidth: 1, borderColor: '#F1F5F9', elevation: 2,
        overflow: 'hidden' 
    },
    chartStyle: { 
        borderRadius: 20, 
        paddingRight: 40 
    },
    chartFooterText: { fontSize: 11, color: '#94A3B8', marginTop: 15, textAlign: 'center', fontStyle: 'italic' },
});

export default statsStyles;