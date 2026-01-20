import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.16)', // Karartma
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 60,
    },
    topInfoArea: {
        alignItems: 'center',
    },
    brandTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -1,
    },
    brandDesc: {
        fontSize: 14,
        color: '#E2E8F0',
        marginTop: 5,
    },
    glassCameraCard: {
        width: width * 0.85,
        height: height * 0.5,
        backgroundColor: 'rgba(255, 255, 255, 0.15)', // Cam efekti
        borderRadius: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        overflow: 'hidden',
    },
    cameraPreview: {
        flex: 1,
        borderRadius: 30,
        overflow: 'hidden',
    },
    scannerOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    faceFrame: {
        width: width * 0.55,
        height: width * 0.75,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#16B576', // Logonun yeşili
        borderStyle: 'dashed',
    },
    alignFaceText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 30,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowRadius: 10,
    },
    bottomControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 40,
    },
    blurButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    mainCaptureBtn: {
        width: 85,
        height: 85,
        borderRadius: 45,
        borderWidth: 4,
        borderColor: '#5165a9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCaptureBtn: {
        width: 65,
        height: 65,
        borderRadius: 35,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles;