import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Temanızdaki güncel renk tanımları
const KOYU_YESIL = '#16B576';
const ACIK_YESIL = '#B7EACD';
const KOYU_MAVI = '#2F3A66';
const ACIK_YESIL_AURA = '#B7EACD'; // Daha açık ACIK_YESIL ton

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: ACIK_YESIL, // Ana arkaplan ACIK_YESIL
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: ACIK_YESIL_AURA,
        opacity: 0.9, 
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: height * 0.05,
    },
    cameraPreview: {
        flex: 1,
        width: '90%',
        backgroundColor: KOYU_MAVI, // Kamera arkaplanı koyu mavi/siyah
        borderRadius: 20, // 💡 Kutu değil, yuvarlak köşeli kamera çerçevesi
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.05,
        marginBottom: height * 0.05,
        overflow: 'hidden', 
    },
    alignFaceText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        position: 'absolute',
        top: 25,
        zIndex: 1,
    },
    faceFrame: {
        width: width * 0.5,
        height: width * 0.7,
        borderRadius: (width * 0.7) / 2,
        borderWidth: 3,
        borderColor: KOYU_YESIL, // Çerçeve rengini koyu yeşil yaptım
        borderStyle: 'solid',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewText: {
        color: ACIK_YESIL, // Kamera Önizlemesi metni
        marginTop: 100
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'space-around', 
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    controlButton: {
        backgroundColor: KOYU_MAVI, // Galeri butonu arkaplanı koyu mavi
        borderRadius: 30, 
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    captureButton: {
        // Ana çekim butonu
        backgroundColor: ACIK_YESIL, 
        borderRadius: 40,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: KOYU_YESIL, // Çevreleyen halka koyu yeşil
    },
    // Çekim butonunu ortalamak için boşluk (eski tasarımda vardı)
    placeholder: {
        width: 58, 
        height: 58,
    }
});

export default styles;