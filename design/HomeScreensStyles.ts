import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FDFCFB' },
    
    // Header & Spotlight
    topSection: {
        backgroundColor: '#7996da', // Koyu Mavi Temel
        paddingTop: 40,
        paddingBottom: 40,
        paddingHorizontal: 25,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
    welcomeText: { color: 'rgba(255,255,255,0.7)', fontSize: 16, fontWeight: '500' },
    userNameText: { color: '#FFF', fontSize: 26, fontWeight: '900' },
    profileGlassBtn: { width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
    
    spotlightCard: {
        marginHorizontal: 20,
        marginTop: 15,
        paddingVertical: 18, // Dikey ferahlık
        paddingHorizontal: 30,        
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderWidth: 1.5,
        borderColor: 'transparent', 
      },
      spotlightReanalysis: {
        backgroundColor: 'rgba(255, 143, 109, 0.54)', 
        borderColor: '#FF8E6D', 
      },
      spotlightInfo: {
        flex: 1,
      },
      spotlightTag: {
        fontSize: 10,
        fontWeight: '800',
        color: '#FFF',
        opacity: 0.6,
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 4,
      },
      greetingMsg: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FFF',
        lineHeight: 20,
      },
      miniStreak: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
      },
      miniStreakText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
        marginLeft: 4,
      },

    // Calendar
    calendarSection: { marginTop: -25, marginBottom: 15 },
    calendarScroll: { paddingHorizontal: 20 },
    dateBox: { width: 58, height: 78, backgroundColor: '#FFF', borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 10, borderWidth: 1, borderColor: '#F1F5F9', elevation: 2 },
    dateBoxActive: { backgroundColor: '#16B576', borderColor: '#16B576' },
    dateDay: { fontSize: 11, fontWeight: '700', color: '#94A3B8' },
    dateNum: { fontSize: 18, fontWeight: '900', color: '#1E293B', marginTop: 4 },
    dateTextActive: { color: '#FFF' },
    activeIndicator: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#FFF', marginTop: 4 },

    // Content area
    mainScroll: { paddingHorizontal: 25 },
    sectionHeading: { fontSize: 19, fontWeight: '900', color: '#1E293B', marginVertical: 18 },
    alertBanner: { marginTop:5,backgroundColor: '#eabb9a',borderWidth: 2, borderRadius: 16, padding: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 5,borderColor:'#ef4444' },
    alertText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },

    // Habits
    habitItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 22, padding: 16, marginBottom: 12, borderWidth: 1.5, borderColor: '#7996da', elevation: 2 },
    habitItemDone: { backgroundColor: '#ceebd9', borderColor: '#49bd74', elevation: 0 },
    habitIconBg: { width: 48, height: 48, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    habitTitle: { fontSize: 16, fontWeight: '800', color: '#5a79d3' },
    habitTitleDone: { color: '#94A3B8', textDecorationLine: 'line-through' },
    habitStatus: { fontSize: 12, color: '#64748B', marginTop: 2 },
    checkNode: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center' },
    checkNodeActive: { backgroundColor: '#16B576', borderColor: '#16B576' },

    // Stats Card
    statsCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', elevation: 3,marginTop:10 },
    statsTitleText: { fontSize: 16, fontWeight: '900', color: '#ff7e52', marginBottom: 10 },
    progressRow: { flexDirection: 'row', alignItems: 'center' },
    barBg: { flex: 1, height: 8, backgroundColor: '#F1F5F9', borderRadius: 4, marginRight: 10 },
    barFill: { height: '100%', backgroundColor: '#fbb299', borderRadius: 4 },
    barPercent: { fontWeight: 'bold', color: '#ff7e52' },

    // Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.85)', justifyContent: 'center', padding: 25 },
    streakCard: { backgroundColor: '#FFF', borderRadius: 40, padding: 30, alignItems: 'center' },
    streakIconWrapper: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#FFFDF0', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    streakTitle: { fontSize: 24, fontWeight: '900', color: '#1E293B' },
    streakCountText: { fontSize: 56, fontWeight: '900', color: '#FFD700', marginVertical: 10 },
    streakSubText: { textAlign: 'center', color: '#64748B', fontSize: 16, lineHeight: 22, marginBottom: 30 },
    streakCloseBtn: { backgroundColor: '#1E293B', paddingVertical: 18, paddingHorizontal: 40, borderRadius: 20 },
    streakCloseBtnText: { color: '#FFF', fontWeight: 'bold', letterSpacing: 1 },
    
    productCard: {
        width: 150,
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 12,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 2,
        marginBottom:30,
    },
    productImgWrapper: {
        width: '100%',
        height: 100,
        backgroundColor: '#F8FAFC',
        borderRadius: 15,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    prodImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    prodName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1E293B'
    },
    prodType: {
        fontSize: 11,
        color: '#94A3B8',
        marginTop: 2
    },productBadgeText: {
        color: '#FFF',
        fontSize: 9,
        fontWeight: '800',
    },productBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(22, 181, 118, 0.9)', // Yeşil rozet
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
    },imagePlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendarEmpty: {
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
  },
  calendarEmptyText: {
      color: '#FFF',
      fontSize: 14,
      opacity: 0.7,
      fontStyle: 'italic',
  },
});

export default styles;