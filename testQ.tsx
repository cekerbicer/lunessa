//a-en iyisi devamına doğru kötüye gidiyor
export const questions = [
    // --- TEMEL CİLT PROFİLİ ---
    {
        id: 1,
        type: 'multiple-choice',
        question: "Cilt bakımında şu anki önceliğiniz/hedefiniz nedir?",
        options: [
            { id: 'a', text: "Sivilce ve siyah nokta görünümünü azaltmak" },
            { id: 'b', text: "Lekeleri gidermek ve cilt tonunu eşitlemek" },
            { id: 'c', text: "Hassasiyeti ve kızarıklığı yatıştırmak" },
            { id: 'd', text: "Yaşlanma karşıtı bakım ve sıkılaşma" },
            { id: 'e', text: "Nemsizlik ve matlık ile mücadele etmek" },
        ],
    },
    {
        id: 2,
        type: 'numeric', // Bu sorunun tipi SAYISAL
        question: "Boyunuz (cm olarak, örn: 170)",
        options: [], // Sayısal girdide seçenek olmaz
    },
    {
        id: 3,
        type: 'numeric', // Bu sorunun tipi SAYISAL
        question: "Kilonuz (kg olarak, örn: 65)",
        options: [], // Sayısal girdide seçenek olmaz
    },
    {
        id: 4,
        type: 'multiple-choice',
        question: "Ailenizde kronik olarak gözlemlenen bir cilt durumu var mı?",
        options: [
            { id: 'a', text: "Bilinen bir genetik yatkınlık yok / Bilmiyorum" },
            { id: 'b', text: "Kronik sivilce (akne) veya aşırı yağlı cilt yapısı" },
            { id: 'c', text: "Aşırı kuruluk veya egzama" },
            { id: 'd', text: "Belirgin lekeler" },
            { id: 'e', text: "Erken yaşta başlayan çizgi ve sarkma eğilimi" },
        ],
    },
    {
        id: 5,
        type: 'multiple-choice',
        question: "Düzenli kullandığın bir ilaç var mı?",
        options: [
            { id: 'a', text: "Hayır yok." }, // "En iyi" kuralına göre Hayır en başa alındı
            { id: 'b', text: "Evet var fakat cildimle alakalı değil." },
            { id: 'c', text: "Gerektiğinde kullandığım bir ilaç var." },
            { id: 'd', text: "Evet, cildimle alakalı bir ilaç kullanıyorum." },
        ],
    },
    {
        id: 6,
        type: 'multiple-choice',
        question: "Cildinizin dış faktörlere karşı genel hassasiyeti nasıldır?",
        options: [
            { id: 'a', text: "Oldukça dayanıklıdır, ürün/hava değişimi pek etkilemez" },
            { id: 'b', text: "Alerjik bir bünyem var" },
            { id: 'c', text: "Sadece mevsim geçişlerinde veya sert havada hassaslaşır" },
        ],
    },
    {
        id: 7,
        type: 'multiple-choice',
        question: "Yüzünüzü yıkadıktan bir saat sonra (hiçbir ürün sürmeden) cildinizi genel olarak nasıl hissedersiniz?",
        options: [
            { id: 'a', text: "Gergin, kuru ve mat" }, // Kuru
            { id: 'b', text: "Her yeri parlak ve yağlı" }, // Yağlı
            { id: 'c', text: "T bölgem parlak, yanaklarım normal" }, // Karma
            { id: 'd', text: "Rahat, ne gergin ne yağlı" }, // Normal
        ],
    },
    {
        id: 8,
        type: 'multiple-choice',
        question: "Sivilceleriniz genellikle ne zaman veya nerede yoğunlaşır?",
        options: [
            { id: 'a', text: "Genellikle adet dönemi öncesi / çene hattında" }, // Hormonal
            { id: 'b', text: "Stresli olduğum dönemlerde" }, // Stres
            { id: 'c', text: "Belirli gıdaları yediğimde" }, // Beslenme
            { id: 'd', text: "Rastgele, belirli bir düzeni yok" },
            { id: 'e', text: "Sivilce sorunum pek olmaz" },
        ],
    },
    {
        id: 9,
        type: 'multiple-choice',
        question: "Yüzünüzü genellikle ne ile ve ne sıklıkla temizlersiniz?",
        options: [
            { id: 'a', text: "Günde 2 kez, cildime uygun bir temizleyici ile" },
            { id: 'b', text: "Günde 1 kez" },
            { id: 'c', text: "Sadece suyla yıkarım" },
            { id: 'd', text: "Düzensiz" },
        ],
    },
    {
        id: 10,
        type: 'multiple-choice',
        question: "Nemlendirici kullanma alışkanlığınız nedir?",
        options: [
            { id: 'a', text: "Her gün düzenli olarak (sabah/akşam)" },
            { id: 'b', text: "Sadece cildimi kuru hissettiğimde" },
            { id: 'c', text: "Sadece dışarı çıkmadan önce" },
            { id: 'd', text: "Genellikle kullanmam" },
        ],
    },
    {
        id: 11,
        type: 'multiple-choice',
        question: "Güneş koruyucu kullanma alışkanlığınız nedir?",
        options: [
            { id: 'a', text: "Her gün, mevsim fark etmeksizin)" },
            { id: 'b', text: "Sadece dışarı çıkarken veya hava güneşliyken" },
            { id: 'c', text: "Sadece yazın/tatilde" },
            { id: 'd', text: "Neredeyse hiç kullanmam" },
        ],
    },

    {
        id: 12,
        type: 'multiple-choice',
        question: "Yastık kılıfınızı ne sıklıkla değiştirirsiniz?",
        options: [
            { id: 'a', text: "Haftada 2-3 kez veya daha sık" },
            { id: 'b', text: "Haftada bir kez" },
            { id: 'c', text: "İki haftada bir" },
            { id: 'd', text: "Ayda bir veya daha nadir" },
        ],
    },
    {
        id: 13,
        type: 'multiple-choice',
        question: "Yüzünüze gün içinde ne sıklıkla dokunuyorsunuz?",
        options: [
            { id: 'a', text: "Neredeyse hiç dokunmam" },
            { id: 'b', text: "Sadece kaşınırsa veya bir şey bulaşırsa" },
            { id: 'c', text: "Fark etmeden sürekli elim yüzümde" },
            { id: 'd', text: "Sivilcelerimle oynama/sıkma alışkanlığım var" },
        ],
    },
    {
        id: 14,
        type: 'multiple-choice',
        question: "Genel olarak bir günde ortalama ne kadar su içersiniz?",
        options: [
            { id: 'a', text: "İhtiyacım olandan daha fazla içerim." },
            { id: 'b', text: "Yeterli (1.5 - 2 Litre / 6-8 bardak)" },
            { id: 'c', text: "Orta düzeyde (1 Litre civarı)" },
            { id: 'd', text: "Çok az (1-2 bardak) / Genellikle unuturum" },
        ],
    },
    {
        id: 15,
        type: 'multiple-choice',
        question: "Genel beslenme alışkanlığınız hangisine daha yakın?",
        options: [
            { id: 'a', text: "Çoğunlukla ev yemeği, sebze ve protein ağırlıklı" },
            { id: 'b', text: "Genellikle fast food veya paketli gıda ağırlıklı" },
            { id: 'c', text: "Şekerli gıdalar ve hamur işi tüketimim yoğundur" },
            { id: 'd', text: "Düzensiz, öğün atlarım, ne bulursam yerim" },
        ],
    },
    {
        id: 16,
        type: 'multiple-choice',
        question: "Genel olarak uyku düzeniniz nasıldır?",
        options: [
            { id: 'a', text: "Çok düzenli (Genellikle 7-8 saat kaliteli uyku)" },
            { id: 'b', text: "İdare eder (Genelde 6-7 saat, bazen bölünür)" },
            { id: 'c', text: "Düzensiz (Genellikle 6 saatten az uyurum)" },
            { id: 'd', text: "Çok kötü (Hem az hem kalitesiz, uykusuzluk çekerim)" },
        ],
    },
    {
        id: 17,
        type: 'multiple-choice',
        question: "Günde ortalama kaç fincan kahve veya kafeinli içecek tüketirsiniz?",
        options: [
            { id: 'a', text: "Hiç" },
            { id: 'b', text: "Günde 1-2 fincan" },
            { id: 'c', text: "Günde 3-4 fincan" },
            { id: 'd', text: "Günde 4 fincandan fazla" },
        ],
    },
    {
        id: 18,
        type: 'multiple-choice',
        question: "Alkol tüketim alışkanlığınız nedir?",
        options: [
            { id: 'a', text: "Hiç kullanmam" },
            { id: 'b', text: "Çok nadir (Ayda 1-2)" },
            { id: 'c', text: "Sosyal (Haftada 1-2)" },
            { id: 'd', text: "Düzenli (Haftada 3+)" },
        ],
    },
    {
        id: 19,
        type: 'multiple-choice',
        question: "Sigara kullanıyor musunuz?",
        options: [
            { id: 'a', text: "Hayır, hiç kullanmadım / Bıraktım" },
            { id: 'b', text: "Evet, sosyal içiciyim" },
            { id: 'c', text: "Evet, düzenli olarak kullanıyorum" },
        ],
    },
    {
        id: 20,
        type: 'multiple-choice',
        question: "Haftalık fiziksel aktivite düzeyiniz nedir?",
        options: [
            { id: 'a', text: "Yüksek" },
            { id: 'b', text: "Orta" },
            { id: 'c', text: "Düşük" },
            { id: 'd', text: "Hareketsiz" },
        ],
    },
    {
        id: 21,
        type: 'multiple-choice',
        question: "Hayatınızdaki genel stres seviyenizi nasıl tanımlarsınız?",
        options: [
            { id: 'a', text: "Çok az" },
            { id: 'b', text: "Orta düzeyde" },
            { id: 'c', text: "Yüksek" },
        ],
    },
];

// Soruların toplam sayısını dışa aktarıyoruz
export const totalQuestions = questions.length;