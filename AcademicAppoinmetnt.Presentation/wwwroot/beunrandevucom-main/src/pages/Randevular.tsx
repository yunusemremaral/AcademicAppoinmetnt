import { useState, useEffect } from 'react';
import { Calendar, Clock, User, GraduationCap, CheckCircle, XCircle, AlertTriangle, Trash2} from 'lucide-react';

// Randevu durumları için enum
enum RandevuDurumu {
  BEKLEMEDE = 'beklemede',
  ONAYLANDI = 'onaylandi',
  REDDEDILDI = 'reddedildi'
}

// Randevu için arayüz
interface Randevu {
  id: string;
  akademisyen: string;
  unvan: string;
  bolum: string;
  tarih: Date;
  saat: string;
  konu: string;
  durum: RandevuDurumu;
}

// Örnek randevu verisi
const ornekRandevular: Randevu[] = [
  {
    id: '1',
    akademisyen: 'Ozan Artun',
    unvan: 'Prof. Dr.',
    bolum: 'Bilgisayar Mühendisliği',
    tarih: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 gün sonra
    saat: '14:30',
    konu: 'Bitirme Projesi Danışmanlığı',
    durum: RandevuDurumu.BEKLEMEDE
  },
  {
    id: '2',
    akademisyen: 'İrem Şenyer Yapıcı',
    unvan: 'Dr. Öğr. Üyesi',
    bolum: 'Bilgisayar Mühendisliği',
    tarih: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 gün sonra
    saat: '10:00',
    konu: 'Yapay Zeka Dersi Hakkında',
    durum: RandevuDurumu.ONAYLANDI
  },
  {
    id: '3',
    akademisyen: 'Ferdi Kara',
    unvan: 'Doç. Dr.',
    bolum: 'Bilgisayar Mühendisliği',
    tarih: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 gün önce
    saat: '15:30',
    konu: 'Staj Görüşmesi',
    durum: RandevuDurumu.REDDEDILDI
  },
  {
    id: '4',
    akademisyen: 'Ergin Yılmaz',
    unvan: 'Prof. Dr.',
    bolum: 'Biyomedikal Mühendisliği',
    tarih: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 gün sonra
    saat: '11:30',
    konu: 'Laboratuvar Çalışması',
    durum: RandevuDurumu.BEKLEMEDE
  },
  {
    id: '5',
    akademisyen: 'Ceren Kaya',
    unvan: 'Dr. Öğr. Üyesi',
    bolum: 'Biyomedikal Mühendisliği',
    tarih: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 gün sonra
    saat: '13:00',
    konu: 'Ödev Değerlendirmesi',
    durum: RandevuDurumu.BEKLEMEDE
  }
];

// Tarihi formatlamak için yardımcı fonksiyon
const formatDate = (date: Date): string => {
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
};

// Gün adlarını Türkçe olarak almak için yardımcı dizi
const DAYS_TR = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

// Randevu durumuna göre ikon ve renk belirlemek için yardımcı fonksiyon
const getDurumBilgisi = (durum: RandevuDurumu) => {
  switch (durum) {
    case RandevuDurumu.BEKLEMEDE:
      return {
        ikon: <AlertTriangle className="w-5 h-5" />,
        renk: 'text-yellow-500',
        arkaplan: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/20',
        metin: 'Beklemede'
      };
    case RandevuDurumu.ONAYLANDI:
      return {
        ikon: <CheckCircle className="w-5 h-5" />,
        renk: 'text-green-500',
        arkaplan: 'bg-green-500/10',
        borderColor: 'border-green-500/20',
        metin: 'Onaylandı'
      };
    case RandevuDurumu.REDDEDILDI:
      return {
        ikon: <XCircle className="w-5 h-5" />,
        renk: 'text-red-500',
        arkaplan: 'bg-red-500/10',
        borderColor: 'border-red-500/20',
        metin: 'Reddedildi'
      };
  }
};

const Randevular = () => {
  const [randevular, setRandevular] = useState<Randevu[]>([]);
  const [loading, setLoading] = useState(true);

  // Verileri yükleme efekti için
  useEffect(() => {
    const timer = setTimeout(() => {
      setRandevular(ornekRandevular);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Randevu iptal etme işlevi
  const randevuIptal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Bu randevuyu iptal etmek istediğinize emin misiniz?')) {
      setRandevular(randevular.filter(randevu => randevu.id !== id));
    }
  };

  return (
    <div className="w-full bg-gray-50 text-gray-800 min-h-screen">
      {/* Koyu renkli başlık bölümü */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 rounded-t-xl shadow-md p-4 border border-gray-700/50">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h1 className="text-lg font-semibold text-white leading-tight tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">Randevularım</h1>
              <p className="text-xs text-blue-300/90 font-normal mt-0.5">Son randevularınız aşağıda listelenmiştir.</p>
            </div>
          </div>
          <div className="hidden md:block flex-shrink-0 ml-3">
            <div className="inline-flex items-center bg-gray-800/70 text-blue-300 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-700/50 whitespace-nowrap">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
              <span className='text-xs'>{randevular.length} Randevu</span>
            </div>
          </div>
        </div>
      </div>

      {/* İçerik bölümü */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {loading && (
          <div className="grid gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-md overflow-hidden animate-pulse shadow-sm">
                <div className="h-10 bg-gray-100"></div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-100 w-1/3 rounded"></div>
                    <div className="h-4 bg-gray-100 w-1/4 rounded"></div>
                  </div>
                  <div className="h-12 bg-gray-100 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && randevular.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-md p-6 text-center shadow-sm">
            <div className="bg-gray-100 w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3">
              <Calendar className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-base font-medium text-gray-700 mb-1">Randevunuz Bulunmamaktadır</h3>
            <p className="text-gray-500 text-xs max-w-md mx-auto">
              Henüz hiç randevu talebinde bulunmadınız veya tüm randevularınız iptal edildi.
            </p>
          </div>
        )}

        {!loading && randevular.length > 0 && (
          <div className="grid gap-3">
            {randevular.map((randevu) => {
              const durumBilgisi = getDurumBilgisi(randevu.durum);
              const gecmis = randevu.tarih < new Date();

              return (
                <div 
                  key={randevu.id} 
                  className={`bg-white border ${durumBilgisi.borderColor} rounded-md overflow-hidden shadow-sm hover:shadow transition-all duration-200 ${
                    gecmis ? 'opacity-70' : ''
                  }`}
                >
                  <div className="border-b border-gray-100 bg-gray-50 p-2 flex justify-between items-center">
                    <div className="flex items-center space-x-1.5">
                      <div className={`p-1 rounded-full ${durumBilgisi.arkaplan}`}>
                        <div className={durumBilgisi.renk}>
                          {durumBilgisi.ikon}
                        </div>
                      </div>
                      <span className={`text-xs font-medium ${durumBilgisi.renk}`}>
                        {durumBilgisi.metin}
                      </span>
                    </div>
                    {randevu.durum === RandevuDurumu.BEKLEMEDE && !gecmis && (
                      <button 
                        onClick={(e) => randevuIptal(randevu.id, e)}
                        className="p-1 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded transition-colors"
                        title="Randevuyu İptal Et"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="p-3">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                      <div>
                        <div className="flex items-center">
                          <User className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
                          <h3 className="text-sm font-medium text-gray-800">
                            {randevu.unvan} {randevu.akademisyen}
                          </h3>
                        </div>
                        <div className="flex items-center mt-0.5 ml-5 text-gray-500">
                          <GraduationCap className="w-3 h-3 mr-1" />
                          <span className="text-xs">{randevu.bolum}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 bg-gray-50 px-2 py-1.5 rounded text-xs">
                        <div className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1.5 text-purple-500" />
                          <div>
                            <div className="text-gray-700 font-medium">{DAYS_TR[randevu.tarih.getDay()]}</div>
                            <div className="text-gray-500 text-[10px]">{formatDate(randevu.tarih)}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center border-l border-gray-200 pl-3">
                          <Clock className="w-3.5 h-3.5 mr-1.5 text-green-500" />
                          <div className="text-gray-700 font-medium">{randevu.saat}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-100 mt-2">
                      <div className="flex items-center mb-1">
                        <span className="w-1 h-1 bg-blue-500 inline-block mr-1.5 rounded-full"></span>
                        <h4 className="text-xs font-medium text-gray-500">Randevu Konusu</h4>
                      </div>
                      <p className="text-gray-700 text-xs pl-2.5">{randevu.konu}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Randevular;
