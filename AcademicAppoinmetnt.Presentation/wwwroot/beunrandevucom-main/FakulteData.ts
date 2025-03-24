import { academicImages } from './src/assets/academicImages';

interface Bolum {
  name: string;
  urlPath?: string; // URL path for the department
  academics?: Academic[];
}

interface Fakulte {
  name: string;
  urlPath?: string; // URL path for the faculty
  departments: Bolum[];
}

interface ZamanAraligi {
  startTime: string; // Format: "HH:MM"
  endTime: string;   // Format: "HH:MM"
}

interface Takvim {
  day: 'Pazartesi' | 'Salı' | 'Çarşamba' | 'Perşembe' | 'Cuma';
  timeSlots: ZamanAraligi[];
}

interface Academic {
  isim: string;
  fotoUrl: string;
  urlPath: string; // URL'de kullanılacak değişken
  schedule?: Takvim[];
}

const fakultelerVeBolumler: Fakulte[] = [
  {
    name: "Mühendislik Fakültesi",
    urlPath: "muhendislik-fakultesi",
    departments: [
      {
        name: "Bilgisayar Mühendisliği",
        urlPath: "bilgisayar-muhendisligi",
        academics: [
          { 
            isim: 'Prof. Dr. Ozan Artun', 
            fotoUrl: academicImages.ozanartun,
            urlPath: 'ozanartun',
            schedule: [
              { 
                day: 'Pazartesi', 
                timeSlots: [
                  { startTime: '08:30', endTime: '09:15' }
                ]
              },
              { 
                day: 'Çarşamba', 
                timeSlots: [
                  { startTime: '08:30', endTime: '09:15' },
                  { startTime: '10:30', endTime: '11:15' },
                  { startTime: '11:30', endTime: '12:15' },
                  { startTime: '13:15', endTime: '14:00' },
                  { startTime: '14:15', endTime: '15:00' }
                ]
              },
              {
                day: 'Cuma',
                timeSlots: [
                  { startTime: '14:15', endTime: '15:00' },
                  { startTime: '15:15', endTime: '16:00' }
                ]
              }
            ]
          },
          { 
            isim: 'Doç. Dr. Ferdi Kara', 
            fotoUrl: academicImages.ferdikara,
            urlPath: 'ferdikara'
          },
          { 
            isim: 'Doktor Öğretim Üyesi Abdullah Oğuz Kızılçay', 
            fotoUrl: academicImages.oguzkizilcay,
            urlPath: 'abdullahoguzkizilcay',
            schedule: [
              {
                day: 'Pazartesi',
                timeSlots: [
                  { startTime: '08:30', endTime: '09:15' },
                  { startTime: '15:15', endTime: '16:00' },
                  { startTime: '16:15', endTime: '17:00' }
                ]
              },
              {
                day: 'Salı',
                timeSlots: [
                  { startTime: '13:15', endTime: '14:00' },
                  { startTime: '14:15', endTime: '15:00' }
                ]
              },
              {
                day: 'Çarşamba',
                timeSlots: [
                  { startTime: '08:30', endTime: '09:15' }
                ]
              },
              {
                day: 'Perşembe',
                timeSlots: [
                  { startTime: '13:15', endTime: '14:00' },
                  { startTime: '14:15', endTime: '15:00' },
                  { startTime: '15:15', endTime: '16:00' }
                ]
              }
            ]
          },
          { 
            isim: 'Doktor Öğretim Üyesi Erkan Çetiner', 
            fotoUrl: academicImages.erkancetiner,
            urlPath: 'erkancetiner',
            schedule: [
              {
                day: 'Pazartesi',
                timeSlots: [
                  { startTime: '08:30', endTime: '09:15' }
                ]
              },
              {
                day: 'Salı',
                timeSlots: [
                  { startTime: '08:30', endTime: '09:15' },
                  { startTime: '09:30', endTime: '10:15' }
                ]
              },
              {
                day: 'Çarşamba',
                timeSlots: [
                  { startTime: '08:30', endTime: '09:15' },
                  { startTime: '13:15', endTime: '14:00' },
                  { startTime: '14:15', endTime: '15:00' }
                ]
              },
              {
                day: 'Perşembe',
                timeSlots: [
                  { startTime: '14:15', endTime: '15:00' },
                  { startTime: '15:15', endTime: '16:00' },
                  { startTime: '16:15', endTime: '17:00' },
                  { startTime: '17:15', endTime: '18:00' }
                ]
              },
              {
                day: 'Cuma',
                timeSlots: [
                  { startTime: '14:15', endTime: '15:00' },
                  { startTime: '15:15', endTime: '16:00' }
                ]
              }
            ]
          },
          { 
            isim: 'Doktor Öğretim Üyesi Umut Konur', 
            fotoUrl: academicImages.umutkonur,
            urlPath: 'umutkonur',
            schedule: [
              {
                day: 'Pazartesi',
                timeSlots: [
                  { startTime: '08:30', endTime: '09:15' },
                  { startTime: '13:15', endTime: '14:00' },
                  { startTime: '14:15', endTime: '15:00' },
                  { startTime: '15:15', endTime: '16:00' }
                ]
              },
              {
                day: 'Salı',
                timeSlots: [
                  { startTime: '13:15', endTime: '14:00' },
                  { startTime: '14:15', endTime: '15:00' },
                  { startTime: '15:15', endTime: '16:00' }
                ]
              },
              {
                day: 'Çarşamba',
                timeSlots: [
                  { startTime: '08:30', endTime: '09:15' }
                ]
              }
            ]
          },
          { 
            isim: 'Doktor Öğretim Üyesi İrem Şenyer Yapıcı', 
            fotoUrl: academicImages.iremsenyeryapici,
            urlPath: 'iremsenyeryapici',
            schedule: [
              {
                day: 'Pazartesi',
                timeSlots: [
                  { startTime: '08:30', endTime: '09:15' },
                  { startTime: '13:15', endTime: '14:00' },
                  { startTime: '14:15', endTime: '15:00' }
                ]
              },
              {
                day: 'Salı',
                timeSlots: [
                  { startTime: '09:30', endTime: '10:15' },
                  { startTime: '10:30', endTime: '11:15' },
                  { startTime: '11:30', endTime: '12:15' }
                ]
              },
              {
                day: 'Çarşamba',
                timeSlots: [
                  { startTime: '08:30', endTime: '09:15' },
                  { startTime: '13:15', endTime: '14:00' },
                  { startTime: '14:15', endTime: '15:00' }
                ]
              },
              {
                day: 'Perşembe',
                timeSlots: [
                  { startTime: '15:15', endTime: '16:00' }
                ]
              }
            ]
          },
          { 
            isim: 'Doktor Öğretim Üyesi Aykut Karakaya', 
            fotoUrl: academicImages.aykutkarakaya,
            urlPath: 'aykutkarakaya',
            schedule: [
              {
                day: 'Çarşamba',
                timeSlots: [
                  { startTime: '13:15', endTime: '14:00' },
                  { startTime: '14:15', endTime: '15:00' },
                  { startTime: '15:15', endTime: '16:00' },
                  { startTime: '16:15', endTime: '17:00' }
                ]
              },
              {
                day: 'Perşembe',
                timeSlots: [
                  { startTime: '09:30', endTime: '10:15' },
                  { startTime: '10:30', endTime: '11:15' },
                  { startTime: '11:30', endTime: '12:15' }
                ]
              }
            ]
          },
          { 
            isim: 'Araştırma Görevlisi İsmail Terzi', 
            fotoUrl: academicImages.ismailterzi,
            urlPath: 'ismailterzi',
            schedule: [
              {
                day: 'Pazartesi',
                timeSlots: [
                  { startTime: '08:30', endTime: '09:15' }
                ]
              },
              {
                day: 'Salı',
                timeSlots: [
                  { startTime: '10:30', endTime: '11:15' },
                  { startTime: '11:30', endTime: '12:15' },
                  { startTime: '12:30', endTime: '13:15' }
                ]
              },
              {
                day: 'Çarşamba',
                timeSlots: [
                  { startTime: '08:30', endTime: '09:15' }
                ]
              }
            ]
          },
          { 
            isim: 'Araştırma Görevlisi Ahmet Selim Küçükkara', 
            fotoUrl: academicImages.ahmetselimkucukkara,
            urlPath: 'ahmetselimkucukkara'
          },
          { 
            isim: 'Araştırma Görevlisi Batuhan Cem Öğe', 
            fotoUrl: academicImages.batuhancemoge,
            urlPath: 'batuhancemoge'
          },
          { 
            isim: 'Araştırma Görevlisi Murat Varol', 
            fotoUrl: academicImages.muratvarol,
            urlPath: 'muratvarol'
          },
          { 
            isim: 'Araştırma Görevlisi Elif Meşeci', 
            fotoUrl: academicImages.elifmeseci,
            urlPath: 'elifmeseci'
          },
          { 
            isim: 'Araştırma Görevlisi Ahmet Furkan Sönmez', 
            fotoUrl: academicImages.ahmetfurkansonmez,
            urlPath: 'ahmetfurkansonmez'
          },
          { 
            isim: 'Araştırma Görevlisi Mustafa Turna', 
            fotoUrl: academicImages.mustafaturna,
            urlPath: 'mustafaturna'
          },
        ],
      },
      { 
        name: "Biyomedikal Mühendisliği", 
        urlPath: "biyomedikal-muhendisligi",
        academics: [
          { 
            isim: 'Prof. Dr. Ergin Yılmaz', 
            fotoUrl: academicImages.erginyilmaz,
            urlPath: 'erginyilmaz',
            schedule: [
              {
                day: 'Pazartesi',
                timeSlots: [
                  { startTime: '12:30', endTime: '13:15' },
                  { startTime: '13:15', endTime: '14:00' },
                  { startTime: '14:15', endTime: '15:00' },
                  { startTime: '15:15', endTime: '16:00' },
                  { startTime: '16:15', endTime: '17:00' }
                ]
              },
              {
                day: 'Salı',
                timeSlots: [
                  { startTime: '09:30', endTime: '10:15' },
                  { startTime: '10:30', endTime: '11:15' },
                  { startTime: '11:30', endTime: '12:15' }
                ]
              }
            ]
          },
          { 
            isim: 'Prof. Dr. Rahime Seda Tığlı Aydın', 
            fotoUrl: academicImages.sedatigliaydin,
            urlPath: 'sedatigliaydin',
            schedule: [
              {
                day: 'Pazartesi',
                timeSlots: [
                  { startTime: '09:30', endTime: '10:15' },
                  { startTime: '10:30', endTime: '11:15' },
                  { startTime: '11:30', endTime: '12:15' },
                  { startTime: '13:15', endTime: '14:00' },
                  { startTime: '14:15', endTime: '15:00' },
                  { startTime: '15:15', endTime: '16:00' }
                ]
              },
              {
                day: 'Çarşamba',
                timeSlots: [
                  { startTime: '10:30', endTime: '11:15' },
                  { startTime: '11:30', endTime: '12:15' },
                  { startTime: '12:30', endTime: '13:15' }
                ]
              }
            ]
          },
          { 
            isim: 'Doç. Dr. Muhammet Samet Kılıç', 
            fotoUrl: academicImages.sametkilic,
            urlPath: 'muhammetkilic',
            schedule: [
              {
                day: 'Pazartesi',
                timeSlots: [
                  { startTime: '13:15', endTime: '14:00' },
                  { startTime: '14:15', endTime: '15:00' },
                  { startTime: '15:15', endTime: '16:00' }
                ]
              },
              {
                day: 'Perşembe',
                timeSlots: [
                  { startTime: '09:30', endTime: '10:15' },
                  { startTime: '10:30', endTime: '11:15' },
                  { startTime: '11:30', endTime: '12:15' },
                  { startTime: '13:15', endTime: '14:00' },
                  { startTime: '14:15', endTime: '15:00' }
                ]
              }
            ]
          },
          { 
            isim: 'Dr. Öğr. Üyesi Ziynet Pamuk', 
            fotoUrl: academicImages.ziynetpamuk,
            urlPath: 'ziynetpamuk',
            schedule: [
              {
                day: 'Pazartesi',
                timeSlots: [
                  { startTime: '09:30', endTime: '10:15' },
                  { startTime: '10:30', endTime: '11:15' },
                  { startTime: '11:30', endTime: '12:15' }
                ]
              },
              {
                day: 'Salı',
                timeSlots: [
                  { startTime: '08:30', endTime: '09:15' },
                  { startTime: '09:30', endTime: '10:15' }
                ]
              },
              {
                day: 'Cuma',
                timeSlots: [
                  { startTime: '14:15', endTime: '15:00' },
                  { startTime: '15:15', endTime: '16:00' }
                ]
              }
            ]
          },
          { 
            isim: 'Dr. Öğr. Üyesi Ceren Kaya', 
            fotoUrl: academicImages.cerenkaya,
            urlPath: 'cerenkaya',
            schedule: [
              {
                day: 'Pazartesi',
                timeSlots: [
                  { startTime: '09:30', endTime: '10:15' },
                  { startTime: '10:30', endTime: '11:15' },
                  { startTime: '11:30', endTime: '12:15' },
                  { startTime: '13:15', endTime: '14:00' },
                  { startTime: '14:15', endTime: '15:00' },
                  { startTime: '15:15', endTime: '16:00' }
                ]
              },
              {
                day: 'Çarşamba',
                timeSlots: [
                  { startTime: '09:30', endTime: '10:15' },
                  { startTime: '10:30', endTime: '11:15' },
                  { startTime: '11:30', endTime: '12:15' },
                  { startTime: '13:15', endTime: '14:00' },
                  { startTime: '14:15', endTime: '15:00' },
                  { startTime: '15:15', endTime: '16:00' },
                  { startTime: '16:15', endTime: '17:00' }
                ]
              }
            ]
          },
          { 
            isim: 'Dr. Öğr. Üyesi Tuğba Palabaş', 
            fotoUrl: academicImages.tugbapalabas,
            urlPath: 'tugbapalabas',
            schedule: [
              {
                day: 'Salı',
                timeSlots: [
                  { startTime: '09:30', endTime: '10:15' },
                  { startTime: '10:30', endTime: '11:15' },
                  { startTime: '11:30', endTime: '12:15' },
                  { startTime: '13:15', endTime: '14:00' },
                  { startTime: '14:15', endTime: '15:00' },
                  { startTime: '15:15', endTime: '16:00' },
                  { startTime: '16:15', endTime: '17:00' }
                ]
              },
              {
                day: 'Çarşamba',
                timeSlots: [
                  { startTime: '13:15', endTime: '14:00' },
                  { startTime: '14:15', endTime: '15:00' },
                  { startTime: '15:15', endTime: '16:00' }
                ]
              }
            ]
          },
          { 
            isim: 'Araştırma Görevlisi Esra Toprak', 
            fotoUrl: academicImages.esratoprak,
            urlPath: 'esratoprak'
          }
        ]
      },
      { name: "Elektrik-Elektronik Mühendisliği", urlPath: "elektrik-elektronik-muhendisligi" },
      { name: "Harita Mühendisliği", urlPath: "harita-muhendisligi" },
      { name: "İnşaat Mühendisliği", urlPath: "insaat-muhendisligi" },
      { name: "Maden Mühendisliği", urlPath: "maden-muhendisligi" },
      { name: "Makine Mühendisliği", urlPath: "makine-muhendisligi" },
    ],
  },
  {
    name: "Fen Fakültesi",
    urlPath: "fen-fakultesi",
    departments: [
      { name: "Biyoloji", urlPath: "biyoloji" },
      { name: "Fizik", urlPath: "fizik" },
      { name: "Kimya", urlPath: "kimya" },
      { name: "Matematik", urlPath: "matematik" },
      { name: "Moleküler Biyoloji ve Genetik", urlPath: "molekuler-biyoloji-ve-genetik" },
    ],
  },
  {
    name: "İktisadi ve İdari Bilimler Fakültesi",
    urlPath: "iktisadi-ve-idari-bilimler-fakultesi",
    departments: [
      { name: "Çalışma Ekonomisi ve Endüstri İlişkileri", urlPath: "calisma-ekonomisi-ve-endustri-iliskileri" },
      { name: "İktisat", urlPath: "iktisat" },
      { name: "İktisat (İngilizce)", urlPath: "iktisat-ingilizce" },
      { name: "İşletme", urlPath: "isletme" },
      { name: "Maliye", urlPath: "maliye" },
      { name: "Siyaset Bilimi ve Kamu Yönetimi", urlPath: "siyaset-bilimi-ve-kamu-yonetimi" },
      { name: "Uluslararası Ticaret ve İşletmecilik", urlPath: "uluslararasi-ticaret-ve-isletmecilik" },
    ],
  },
  {
    name: "Denizcilik Fakültesi",
    urlPath: "denizcilik-fakultesi",
    departments: [{ name: "Denizcilik İşletmeleri Yönetimi", urlPath: "denizcilik-isletmeleri-yonetimi" }],
  },
  {
    name: "Diş Hekimliği Fakültesi",
    urlPath: "dis-hekimligi-fakultesi",
    departments: [{ name: "Diş Hekimliği", urlPath: "dis-hekimligi" }],
  },
  {
    name: "Eczacılık Fakültesi",
    urlPath: "eczacilik-fakultesi",
    departments: [{ name: "Eczacılık", urlPath: "eczacilik" }],
  },
  {
    name: "Ereğli Eğitim Fakültesi",
    urlPath: "eregli-egitim-fakultesi",
    departments: [
      { name: "Fen Bilgisi Öğretmenliği", urlPath: "fen-bilgisi-ogretmenligi" },
      { name: "İlköğretim Matematik Öğretmenliği", urlPath: "ilkogretim-matematik-ogretmenligi" },
      { name: "Okul Öncesi Öğretmenliği", urlPath: "okul-oncesi-ogretmenligi" },
      { name: "Özel Eğitim Öğretmenliği", urlPath: "ozel-egitim-ogretmenligi" },
      { name: "Rehberlik ve Psikolojik Danışmanlık", urlPath: "rehberlik-ve-psikolojik-danismanlik" },
      { name: "Sınıf Öğretmenliği", urlPath: "sinif-ogretmenligi" },
      { name: "Sosyal Bilgiler Öğretmenliği", urlPath: "sosyal-bilgiler-ogretmenligi" },
      { name: "Türkçe Öğretmenliği", urlPath: "turkce-ogretmenligi" },
    ],
  },
  {
    name: "Uygulamalı Bilimler Yüksekokulu (Devrek)",
    urlPath: "uygulamali-bilimler-yuksekokulu-devrek",
    departments: [{ name: "Finans ve Bankacılık", urlPath: "finans-ve-bankacilik" }],
  },
  {
    name: "Sağlık Bilimleri Fakültesi",
    urlPath: "saglik-bilimleri-fakultesi",
    departments: [
      { name: "Fizyoterapi ve Rehabilitasyon", urlPath: "fizyoterapi-ve-rehabilitasyon" },
      { name: "Hemşirelik", urlPath: "hemsirelik" },
      { name: "Sosyal Hizmet", urlPath: "sosyal-hizmet" },
    ],
  },
  {
    name: "İletişim Fakültesi",
    urlPath: "iletisim-fakultesi",
    departments: [
      { name: "Halkla İlişkiler ve Tanıtım", urlPath: "halkla-iliskiler-ve-tanitim" },
      { name: "Yeni Medya ve İletişim", urlPath: "yeni-medya-ve-iletisim" },
    ],
  },
  {
    name: "İlahiyat Fakültesi",
    urlPath: "ilahiyat-fakultesi",
    departments: [
      { name: "İlahiyat", urlPath: "ilahiyat" },
      { name: "İlahiyat (KKTC UYRUKLU)", urlPath: "ilahiyat-kktc-uyruklu" },
      { name: "İlahiyat (M.T.O.K.)", urlPath: "ilahiyat-mtok" },
    ],
  },
  {
    name: "İnsan ve Toplum Bilimleri Fakültesi",
    urlPath: "insan-ve-toplum-bilimleri-fakultesi",
    departments: [
      { name: "İngiliz Dili ve Edebiyatı", urlPath: "ingiliz-dili-ve-edebiyati" },
      { name: "Psikoloji", urlPath: "psikoloji" },
      { name: "Sosyoloji", urlPath: "sosyoloji" },
      { name: "Tarih", urlPath: "tarih" },
      { name: "Türk Dili ve Edebiyatı", urlPath: "turk-dili-ve-edebiyati" },
    ],
  },
  {
    name: "Tıp Fakültesi",
    urlPath: "tip-fakultesi",
    departments: [{ name: "Tıp", urlPath: "tip" }],
  },
  {
    name: "Karadeniz Ereğli Turizm Fakültesi",
    urlPath: "karadeniz-eregli-turizm-fakultesi",
    departments: [
      { name: "Turizm İşletmeciliği", urlPath: "turizm-isletmeciligi" },
      { name: "Turizm Rehberliği", urlPath: "turizm-rehberligi" },
    ],
  },
];

// Türkçe karakterleri İngilizce karakterlere dönüştüren yardımcı fonksiyon
export const turkishToEnglish = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '');
};

// Akademisyeni URL path'ine göre bulan yardımcı fonksiyon
export const findAcademicByUrlPath = (urlPath: string): Academic | undefined => {
  for (const fakulte of fakultelerVeBolumler) {
    for (const bolum of fakulte.departments) {
      if (bolum.academics) {
        const academic = bolum.academics.find(a => a.urlPath === urlPath);
        if (academic) return academic;
      }
    }
  }
  return undefined;
};

export default fakultelerVeBolumler;
export type { Fakulte, Bolum, Academic, Takvim, ZamanAraligi }; 