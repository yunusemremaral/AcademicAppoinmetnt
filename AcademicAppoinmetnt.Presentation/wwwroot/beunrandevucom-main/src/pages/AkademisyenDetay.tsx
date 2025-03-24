import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findAcademicByUrlPath, type Academic } from '../../FakulteData';
import { Book, User, Calendar, ArrowLeft, ArrowRight, Clock, CheckCircle, XCircle, X, FileText, Check } from 'lucide-react';
import './AkademisyenDetay.css'; // For animations

// Günleri Türkçe isimleriyle tanımlıyoruz
const DAYS_TR = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
const WORKDAYS = [1, 2, 3, 4, 5]; // Pazartesi=1, Cuma=5

// Saat aralıkları (9:00 - 17:00, 30 dakikalık slotlar)
const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', 
  '15:00', '15:30', '16:00', '16:30'
];

interface DaySchedule {
  date: Date;
  slots: {
    time: string;
    isAvailable: boolean;
  }[];
}

// Tarih yardımcı fonksiyonları
const getWeekStartDate = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  // Eğer Pazar günüyse (0), bir sonraki Pazartesi'yi al (8 gün önce)
  const diff = day === 0 ? 1 : day - 1;
  d.setDate(d.getDate() - diff);
  return d;
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(date.getDate() + days);
  return result;
};

const formatDate = (date: Date): string => {
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
};

// Bir tarih aralığı içindeki çalışma günlerini döndürür
const getWorkdayDates = (startDate: Date, numDays: number): Date[] => {
  const dates: Date[] = [];
  let currentDate = new Date(startDate);
  
  for (let i = 0; i < numDays; i++) {
    if (WORKDAYS.includes(currentDate.getDay())) {
      dates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

// Bir saatin akademisyenin programında uygun olup olmadığını kontrol eden fonksiyon
const isTimeSlotAvailable = (academic: Academic, dayOfWeek: number, timeSlot: string): boolean => {
  if (!academic.schedule) return true; // Eğer program yoksa tüm zamanlar müsait
  
  // Haftanın gününü Türkçe olarak al
  const dayName = DAYS_TR[dayOfWeek] as 'Pazartesi' | 'Salı' | 'Çarşamba' | 'Perşembe' | 'Cuma';
  
  // Akademisyenin o gün için programını bul
  const daySchedule = academic.schedule.find(s => s.day === dayName);
  if (!daySchedule) return true; // Bu gün için program yoksa tüm zamanlar müsait
  
  // Saat dilimleri içinde kontrolü yap
  for (const slot of daySchedule.timeSlots) {
    // Verilen saat dilimine göre erişilebilirliği kontrol et

    if (isTimeWithinRange(timeSlot, slot.startTime, slot.endTime)) {
      return false; // Bu saat diliminde meşgul
    }
  }
  
  return true; // Bu saat diliminde müsait
};

// Bir saatin, verilen başlangıç ve bitiş saatleri arasında olup olmadığını kontrol eder
const isTimeWithinRange = (time: string, startTime: string, endTime: string): boolean => {
  // Saatleri dakikaya çevir
  const [timeHour, timeMinute] = time.split(':').map(Number);
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  const timeInMinutes = timeHour * 60 + timeMinute;
  const startInMinutes = startHour * 60 + startMinute;
  const endInMinutes = endHour * 60 + endMinute;
  
  // Saatin, başlangıç ve bitiş arasında olup olmadığını kontrol et
  return timeInMinutes >= startInMinutes && timeInMinutes < endInMinutes;
};

// Tarih için slot'ları oluşturur
const generateDaySchedule = (date: Date, academic: Academic | null): DaySchedule => {
  return {
    date,
    slots: TIME_SLOTS.map(time => ({
      time,
      isAvailable: academic ? isTimeSlotAvailable(academic, date.getDay(), time) : false
    }))
  };
};

// Gün Bileşeni
interface DayScheduleViewProps {
  schedule: DaySchedule;
  onSelectSlot: (date: Date, time: string) => void;
}

const DayScheduleView: React.FC<DayScheduleViewProps> = ({ schedule, onSelectSlot }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium flex items-center">
        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
        <span className='text-sm'>{DAYS_TR[schedule.date.getDay()]} - {formatDate(schedule.date)}</span>
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {schedule.slots.map((slot, index) => (
          <button
            key={index}
            disabled={!slot.isAvailable}
            onClick={() => onSelectSlot(schedule.date, slot.time)}
            className={`
              p-3 rounded-md border flex items-center justify-between text-left transition-all duration-200 shadow-sm
              ${slot.isAvailable 
                ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/70 hover:from-blue-100 hover:to-blue-200/70 hover:shadow-md' 
                : 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed'}
            `}
          >
            <div className="flex items-center">
              <Clock className={`w-4 h-4 mr-2 ${slot.isAvailable ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className="font-medium">{slot.time}</span>
            </div>
            {slot.isAvailable 
              ? <CheckCircle className="w-4 h-4 text-blue-500" /> 
              : <XCircle className="w-4 h-4 text-gray-400" />}
          </button>
        ))}
      </div>
    </div>
  );
};

// Randevu modalı için iki adım
enum AppointmentModalStep {
  FORM = 'form',
  CONFIRMING = 'confirming', // Confirmation loading state
  CONFIRMATION = 'confirmation',
  PROCESSING = 'processing', // Processing loading state
  SUCCESS = 'success',
}

interface AppointmentFormData {
  subject: string;
  description: string;
  date: Date | null;
  time: string;
}

// Ana Bileşen
const AkademisyenDetay: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [academic, setAcademic] = useState<Academic | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Tarih ve takvim durumu yönetimi
  const [selectedWeek, setSelectedWeek] = useState(0); // 0 = bu hafta, 1 = sonraki hafta
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [weekSchedules, setWeekSchedules] = useState<DaySchedule[][]>([[], []]); // [bu hafta, sonraki hafta]
  
  // Modal durumu
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<AppointmentModalStep>(AppointmentModalStep.FORM);
  const [isTransitioning, setIsTransitioning] = useState(false); // Transition state for animations
  const [formData, setFormData] = useState<AppointmentFormData>({
    subject: '',
    description: '',
    date: null,
    time: '',
  });
  
  // Akademisyen bilgisini yükle
  useEffect(() => {
    if (id) {
      // NOT: Gerçek uygulamada bu bir API isteği olacaktır
      // Yapay gecikmeyi kaldırın ve gerçek bir fetch işlemi yapın
      const foundAcademic = findAcademicByUrlPath(id);
      if (foundAcademic) {
        setAcademic(foundAcademic);
        setError(null);
      } else {
        setError('Akademisyen bulunamadı');
      }
      setLoading(false);
    }
  }, [id]);
  
  // Takvim bilgilerini yükle
  useEffect(() => {
    if (!academic) return;
    
    // Bugünün tarihine göre takvimi hazırla
    const today = new Date();
    const isWeekend = today.getDay() === 0 || today.getDay() === 6;
    
    // Eğer haftasonuysa, sonraki haftanın başlangıcını al
    let thisWeekStart;
    if (isWeekend) {
      // Eğer Cumartesi, Pazartesi'yi al; Eğer Pazar, yarını al (Pazartesi)
      const daysToAdd = today.getDay() === 6 ? 2 : 1;
      thisWeekStart = addDays(today, daysToAdd);
    } else {
      // Eğer hafta içiyse, bu haftanın başlangıcını al
      thisWeekStart = getWeekStartDate(today);
    }
    
    // İki haftalık programı oluştur
    const thisWeekDates = getWorkdayDates(thisWeekStart, 7);
    const nextWeekDates = getWorkdayDates(addDays(thisWeekStart, 7), 7);
    
    // Günlük programları oluştur
    const thisWeekSchedules = thisWeekDates.map(date => generateDaySchedule(date, academic));
    const nextWeekSchedules = nextWeekDates.map(date => generateDaySchedule(date, academic));
    
    setWeekSchedules([thisWeekSchedules, nextWeekSchedules]);
    
    // Bugünün tarihini veya gelecekteki ilk iş gününü seç
    if (!isWeekend && WORKDAYS.includes(today.getDay())) {
      setSelectedDay(today);
    } else {
      setSelectedDay(thisWeekDates[0]);
    }
  }, [academic]);
  
  // Slot seçme işleyicisi
  const handleSelectSlot = (date: Date, time: string) => {
    setFormData({
      ...formData,
      date: new Date(date),
      time
    });
    setIsModalOpen(true);
    setModalStep(AppointmentModalStep.FORM);
  };
  
  // Form değişikliği işleyicisi
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Form gönderme işleyicisi
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    setModalStep(AppointmentModalStep.CONFIRMING);
    
    // Gerçekçi bir gecikme ekleyelim
    setTimeout(() => {
      setModalStep(AppointmentModalStep.CONFIRMATION);
      setIsTransitioning(false);
    }, 800);
  };
  
  // Randevu onaylama işleyicisi
  const handleAppointmentConfirm = () => {
    setIsTransitioning(true);
    setModalStep(AppointmentModalStep.PROCESSING);
    
    // Gerçekçi bir API çağrısı gecikmesi simüle ediyoruz
    setTimeout(() => {
      // TODO: API çağrısı yap - Randevu oluşturma
      // fetch('/api/appointments', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      //   headers: { 'Content-Type': 'application/json' }
      // });
      
      // Başarı adımına geç
      setModalStep(AppointmentModalStep.SUCCESS);
      setIsTransitioning(false);
    }, 1500);
  };
  
  // Modal'ı kapatma işleyicisi
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      subject: '',
      description: '',
      date: null,
      time: '',
    });
    
    // Eğer başarı ekranındaysa, anasayfaya yönlendir
    if (modalStep === AppointmentModalStep.SUCCESS) {
      navigate('/');
    }
  };
  
  // Geçiş butonları için kontroller
  const isPrevWeekDisabled = selectedWeek === 0; // Bu haftadaysak, önceki haftaya gidemezsin
  
  // Yükleme ekranı
  if (loading) {
    return (
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-5 gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Hata ekranı
  if (error) {
    return (
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Hata</h2>
          <p className="text-red-500">{error}</p>
          <p className="mt-4 text-gray-600">
            Aradığınız akademisyen bulunamadı. Lütfen URL'yi kontrol edin veya 
            akademisyen arama sayfasından tekrar arama yapın.
          </p>
        </div>
      </div>
    );
  }

  if (!academic || weekSchedules[0].length === 0) {
    return null;
  }
  
  // Görüntülenecek haftanın programı
  const currentWeekSchedule = weekSchedules[selectedWeek];
  
  // Seçilen günün programı
  const selectedDaySchedule = selectedDay 
    ? currentWeekSchedule.find(day => 
        day.date.getDate() === selectedDay.getDate() && 
        day.date.getMonth() === selectedDay.getMonth() &&
        day.date.getFullYear() === selectedDay.getFullYear()
      )
    : null;

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Üst başlık kısmı */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 rounded-t-lg shadow-md p-4 border border-gray-700/50">
          <div className="flex items-start">
            <User className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h1 className="text-lg font-semibold text-white leading-tight tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">{academic?.isim}</h1>
              <p className="text-xs text-blue-300/90 font-normal mt-0.5 flex items-center">
                <Book className="w-3.5 h-3.5 mr-1.5" />
                Bilgisayar Mühendisliği
              </p>
            </div>
          </div>
        </div>

        {/* Ana içerik */}
        <div className="p-6">
          
          {/* Haftalar arası geçiş */}
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => setSelectedWeek(prev => prev - 1)}
              disabled={isPrevWeekDisabled}
              className={`
                flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border transition-all duration-200
                ${isPrevWeekDisabled 
                  ? 'text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed' 
                  : 'text-gray-700 border-gray-200 bg-white hover:bg-gray-50 hover:text-blue-600 shadow-sm hover:shadow'}
              `}
            >
              <ArrowLeft className={`w-3 h-3 sm:w-4 sm:h-4 ${!isPrevWeekDisabled ? 'text-blue-500' : ''}`} />
              <span className="text-[10px] xs:text-xs sm:text-sm font-medium">Önceki Hafta</span>
            </button>
            
            <div className="font-medium text-xs sm:text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200">
              {selectedWeek === 0 ? 'Bu Hafta' : 'Sonraki Hafta'}
            </div>
            
            <button 
              onClick={() => setSelectedWeek(prev => prev + 1)}
              disabled={selectedWeek === 1}
              className={`
                flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border transition-all duration-200
                ${selectedWeek === 1 
                  ? 'text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed' 
                  : 'text-gray-700 border-gray-200 bg-white hover:bg-gray-50 hover:text-blue-600 shadow-sm hover:shadow'}
              `}
            >
              <span className="text-[10px] xs:text-xs sm:text-sm font-medium">Sonraki Hafta</span>
              <ArrowRight className={`w-3 h-3 sm:w-4 sm:h-4 ${selectedWeek !== 1 ? 'text-blue-500' : ''}`} />
            </button>
          </div>
          
          {/* Günler arası gezinme */}
          <div className="grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-2 mb-6">
            {currentWeekSchedule.map((daySchedule, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(daySchedule.date)}
                className={`
                  py-3 rounded-md text-center transition-all duration-200
                  ${selectedDay && selectedDay.getDate() === daySchedule.date.getDate() &&
                    selectedDay.getMonth() === daySchedule.date.getMonth() &&
                    selectedDay.getFullYear() === daySchedule.date.getFullYear()
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md hover:from-blue-600 hover:to-blue-700' 
                    : 'border border-gray-200 hover:bg-gray-50 hover:border-blue-200 text-gray-700 hover:text-blue-600 shadow-sm hover:shadow'}
                `}
              >
                <div className="font-medium text-[11px] xs:text-xs sm:text-sm">{DAYS_TR[daySchedule.date.getDay()]}</div>
                <div className="text-[9px] xs:text-[10px] sm:text-xs opacity-90">{formatDate(daySchedule.date)}</div>
              </button>
            ))}
          </div>
          
          {/* Seçilen gün için zaman dilimleri */}
          <div className="border-t pt-6">
            {selectedDaySchedule && (
              <>
                <div className="mb-3 p-2.5 bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-md flex items-center text-xs text-blue-800">
                  <Clock className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500" />
                  <p className='text-xs'>Randevu oluşturmak için lütfen aşağıdan uygun bir zaman dilimi seçiniz.</p>
                </div>
                <DayScheduleView 
                  schedule={selectedDaySchedule}
                  onSelectSlot={handleSelectSlot}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Randevu Modalı */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className={`bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md transition-all duration-300 ${isTransitioning ? 'opacity-80 scale-95' : 'opacity-100 scale-100'}`}>
            {/* Modal Başlık */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 flex justify-between items-center">
              <h2 className="text-white font-bold text-lg flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {modalStep === AppointmentModalStep.FORM && 'Randevu Oluştur'}
                {modalStep === AppointmentModalStep.CONFIRMING && 'Bilgiler Kontrol Ediliyor...'}
                {modalStep === AppointmentModalStep.CONFIRMATION && 'Randevu Onayı'}
                {modalStep === AppointmentModalStep.PROCESSING && 'Randevu İşleniyor...'}
                {modalStep === AppointmentModalStep.SUCCESS && 'Randevu Talebiniz Gönderildi'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="text-white hover:text-gray-300 focus:outline-none"
                aria-label="Kapat"
                disabled={isTransitioning}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal İçerik */}
            <div className="p-6 min-h-[350px]">
              {/* Form Adımı */}
              {modalStep === AppointmentModalStep.FORM && (
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-5 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="text-center font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">Randevu Bilgileri</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <User className="w-5 h-5 mr-3 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-500">Akademisyen</p>
                          <p className="font-medium text-gray-800">{academic?.isim}</p>
                        </div>
                      </div>
                      
                      {formData.date && (
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-500">Tarih ve Saat</p>
                            <p className="font-medium text-gray-800">
                              {DAYS_TR[formData.date.getDay()]}, {formatDate(formData.date)} - {formData.time}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Randevu Konusu *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ör: Proje danışmanlığı, Ders kaydı..."
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Açıklama
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Randevu ile ilgili detaylar..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md hover:from-blue-700 hover:to-blue-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Randevu Oluştur
                  </button>
                </form>
              )}

              {/* Yükleniyor - Form doğrulama */}
              {modalStep === AppointmentModalStep.CONFIRMING && (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                  <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                    Kontrol Ediliyor
                  </h3>
                  <p className="text-gray-600 text-center">
                    Randevu bilgileriniz kontrol ediliyor, lütfen bekleyin...
                  </p>
                </div>
              )}
              
              {/* Onay Adımı */}
              {modalStep === AppointmentModalStep.CONFIRMATION && (
                <div className="animate-fadeIn">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
                    Randevu Onayı
                  </h3>
                  
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <User className="w-5 h-5 mr-3 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Akademisyen</p>
                          <p className="font-medium">{academic?.isim}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="w-5 h-5 mr-3 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Tarih ve Saat</p>
                          <p className="font-medium">
                            {formData.date && (
                              <>
                                {DAYS_TR[formData.date.getDay()]}, {formatDate(formData.date)} - {formData.time}
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FileText className="w-5 h-5 mr-3 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Konu</p>
                          <p className="font-medium">{formData.subject}</p>
                        </div>
                      </div>
                      
                      {formData.description && (
                        <div className="flex items-start">
                          <FileText className="w-5 h-5 mr-3 text-gray-500 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Açıklama</p>
                            <p className="font-medium">{formData.description}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setModalStep(AppointmentModalStep.FORM)}
                      className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                      disabled={isTransitioning}
                    >
                      Geri Dön
                    </button>
                    
                    <button
                      onClick={handleAppointmentConfirm}
                      className="flex-1 py-2 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-md hover:from-green-700 hover:to-green-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                      disabled={isTransitioning}
                    >
                      Onayla
                    </button>
                  </div>
                </div>
              )}

              {/* Yükleniyor - İşleniyor */}
              {modalStep === AppointmentModalStep.PROCESSING && (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-6"></div>
                  <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                    Randevu Oluşturuluyor
                  </h3>
                  <p className="text-gray-600 text-center">
                    Randevu talebiniz işleniyor, lütfen bekleyin...
                  </p>
                </div>
              )}
              
              {/* Başarı Bildirimi Adımı */}
              {modalStep === AppointmentModalStep.SUCCESS && (
                <div className="animate-fadeIn">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
                    Randevu Talebiniz Gönderildi
                  </h3>
                  
                  <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-100">
                    <p className="text-center text-blue-800">
                      Randevu talebiniz akademisyene iletilmiştir. 
                      <br /><br />
                      <span className="font-semibold">Akademisyen yanıt verdiğinde e-posta adresinize bildirim gönderilecektir.</span>
                    </p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={handleCloseModal}
                      className="w-full py-2 px-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-md hover:from-gray-700 hover:to-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    >
                      Kapat
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AkademisyenDetay;
