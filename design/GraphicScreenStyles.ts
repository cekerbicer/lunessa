import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Renk Tanımları
const DARK_GREEN = '#16B576';
const DARK_BLUE = '#2F3A66';
const MOR = '#5F4890'; 
const GREY = '#F3F4F6';
const WHITE = '#FFFFFF'; // Kartlar için beyaz rengi de ekleyelim

// Stillerin dışa aktarılması için `const` olarak tanımlanması önerilir.
const statsStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GREY,
        padding: 20,
    },
    // Yeni Stil: Başlık ve Geri Butonunu sarmalayan alan
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        // Yorum: Geri butonu eklediğimiz için burada paddingHorizontal kullanmadık, 
        // onun yerine header'ı kapsayan container paddingini kullanıyoruz.
    },
    backButton: {
        padding: 5,
        // Boyutlandırmayı eşitlemek için başlık alanında kullanılan diğer öge ile aynı boyutta bir placeholder kullanıldı
        width: 40, 
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: DARK_BLUE,
        flex: 1, // Başlık ortada kalması için
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: DARK_BLUE,
        marginTop: 20,
        marginBottom: 15,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        // Genişlik hesaplaması için `width` değişkeni kullanılıyor
        width: (width - 60) / 2, // 20 padding, 20 margin, 10 aralık
        backgroundColor: WHITE,
        padding: 15,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 5,
    },
    cardValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: DARK_BLUE,
    },
    chartPlaceholder: {
        height: 200,
        backgroundColor: WHITE,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 30,
    },
    chartText: {
        color: '#9CA3AF',
    }
});

export default statsStyles;