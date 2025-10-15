export const questions = [
    {
        id: 1,
        question: "Cilt tipiniz genel olarak hangi kategoriye daha yakındır?",
        options: [
            { id: 'a', text: "Kuru (Gergin, pul pul)" },
            { id: 'b', text: "Yağlı (Parlak, gözenekli)" },
            { id: 'c', text: "Karma (T bölgesi yağlı, diğer bölgeler kuru)" },
            { id: 'd', text: "Normal (Dengeli)" },
        ],
    },
    {
        id: 2,
        question: "Güneş kremi kullanmaya ne kadar sıklıkta dikkat ediyorsunuz?",
        options: [
            { id: 'a', text: "Her gün (zorunlu olarak)" },
            { id: 'b', text: "Ara sıra (sadece güneşteyken)" },
            { id: 'c', text: "Neredeyse hiç" },
        ],
    },
    {
        id: 3,
        question: "Haftada kaç gün makyaj yapıyorsunuz?",
        options: [
            { id: 'a', text: "Hergün" },
            { id: 'b', text: "Haftada 2-3 gün" },
            { id: 'c', text: "Ayda bir veya daha az" },
        ],
    },
];

// Soruların toplam sayısını dışa aktarıyoruz
export const totalQuestions = questions.length;
