import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Renk Tanımları
const DARK_GREEN = '#16B576'; // Koyu Yeşil (Vurgu, Input Metni, Çizgi)
const LIGHT_GREEN = '#B7EACD'; // Açık Yeşil (Segment ve Buton Arkaplanı)
const DARK_BLUE = '#2F3A66'; // Lacivert (Başlıklar, Brand Adı, Input Label)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    brandName: {
        fontSize: 28,
        fontWeight: '700',
        color: DARK_BLUE,
        marginBottom: 40,
        letterSpacing: 1,
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: LIGHT_GREEN,
        borderRadius: 25,
        padding: 4,
        marginBottom: 60,
        width: 220,
    },
    segmentButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 21,
        alignItems: 'center',
    },
    segmentButtonActive: {
        backgroundColor: DARK_GREEN,
    },
    segmentText: {
        fontSize: 16,
        fontWeight: '600',
        color: DARK_BLUE,
    },
    segmentTextActive: {
        color: '#FFFFFF',
    },
    formContainer: {
        width: '100%',
        maxWidth: 300,
    },
    inputWrapper: {
        marginBottom: 30,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: DARK_BLUE, // 🟢 İstenen koyu yeşil başlık rengi
        marginBottom: 8,
    },
    inputField: {
        height: 38,
        fontSize: 15,
        color: DARK_GREEN, // 🟢 İstenen koyu yeşil yazı rengi
    },
    dashedLine: {
        borderBottomWidth: 1.5,
        borderBottomColor: DARK_GREEN, // 🟢 Çizgi rengi de koyu yeşil
        borderStyle: 'dashed',
    },
    submitButton: {
        backgroundColor: LIGHT_GREEN, // #B7EACD
        borderWidth: 2, // ⬅️ Bu, kenarlık ekliyor
        borderColor: DARK_GREEN, // #16B576
        borderRadius: 25,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: DARK_BLUE, // #2F3A66
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    passwordInput: {
        flex: 1,
    },
    passwordToggle: {
        position: 'absolute',
        right: 0, 
        bottom:-1,
        paddingVertical: 8, 
        paddingHorizontal: 5, 
    },
});

export default styles;