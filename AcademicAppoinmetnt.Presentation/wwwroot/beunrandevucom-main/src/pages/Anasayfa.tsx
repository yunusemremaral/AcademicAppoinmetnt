import { Link } from 'react-router-dom';
import { Calendar, User, GraduationCap, LogIn, CheckCircle, Clock3 } from 'lucide-react';
import beunLogo from "../assets/beunlogo.png"
import { useAcademicSelectionModal } from "../components/AkademisyenAra";
import Zaman from "../components/Zaman";

const Anasayfa = () => {
    const { openModal, Modal } = useAcademicSelectionModal();

    return (
        <div className="min-h-screen bg-gray-50 p-0.5 sm:p-1">
            <div className="max-w-full mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                    <div className="h-20 sm:h-24 md:h-28 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 flex items-center justify-between px-3 sm:px-6">
                        <div className="flex items-center">
                            <div className="bg-white rounded-full p-1.5 sm:p-2.5 mr-2 sm:mr-5 shadow-lg">
                                <img 
                                    src={beunLogo} 
                                    alt="BEÜ Logo" 
                                    className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "https://w3.beun.edu.tr/img/logo_tr.png";
                                    }}
                                />
                            </div>
                            <div>
                                <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">Bülent Ecevit Üniversitesi</h1>
                                <p className="text-gray-300 text-xs sm:text-sm md:text-base">Akademik Randevu Portalı</p>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <Zaman variant="header" />
                        </div>
                    </div>
                    
                    <div className="p-3 sm:p-4 md:p-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2 sm:mb-4">Akademik Randevu Portalı</h2>
                        <p className="text-gray-600 text-center mb-3 sm:mb-6 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
                            Bülent Ecevit Üniversitesi akademik personeli ile kolayca randevu alabilir, 
                            görüşmelerinizi planlayabilirsiniz.
                        </p>
                        
                        <div className="flex flex-col lg:flex-row gap-3 sm:gap-6 mt-3 sm:mt-6">
                            {/*Feature Cards */}
                            <div className="lg:w-1/2 order-2 lg:order-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 h-full">
                                    {/* Giriş Yap Cart */}
                                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] group flex flex-col">
                                        <div className="flex items-center mb-2 sm:mb-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center text-white shadow-md group-hover:from-gray-700 group-hover:to-gray-600 transition-all duration-300">
                                                <LogIn className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                                            </div>
                                            <h3 className="ml-3 sm:ml-4 text-base sm:text-lg md:text-xl font-semibold text-gray-800">Giriş Yap</h3>
                                        </div>
                                        <p className="text-gray-600 text-xs sm:text-sm flex-grow">
                                            Akademisyen veya öğrenci hesabınızla giriş yaparak randevu portalını kullanmaya başlayabilirsiniz.
                                        </p>
                                        <div className="mt-3 sm:mt-6 flex flex-col space-y-2">
                                            <Link 
                                                to="/akademisyen/giris" 
                                                className="w-full inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white font-medium rounded-md shadow-sm hover:from-gray-700 hover:to-gray-600 transition-all duration-300 hover:shadow-md text-xs sm:text-sm"
                                            >
                                                <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                                Akademisyen Girişi
                                            </Link>
                                            <Link 
                                                to="/ogrenci/giris" 
                                                className="w-full inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white font-medium rounded-md shadow-sm hover:from-gray-700 hover:to-gray-600 transition-all duration-300 hover:shadow-md text-xs sm:text-sm"
                                            >
                                                <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                                Öğrenci Girişi
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    {/* Randevu Oluştur Card */}
                                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] group flex flex-col">
                                        <div className="flex items-center mb-2 sm:mb-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center text-white shadow-md group-hover:from-gray-700 group-hover:to-gray-600 transition-all duration-300">
                                                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                                            </div>
                                            <h3 className="ml-3 sm:ml-4 text-base sm:text-lg md:text-xl font-semibold text-gray-800">Randevu Oluştur</h3>
                                        </div>
                                        <p className="text-gray-600 text-xs sm:text-sm flex-grow">
                                            İstediğiniz akademisyen ile uygun zamanlarda randevu oluşturabilir, görüşme talebinde bulunabilirsiniz.
                                        </p>
                                        <div className="mt-3 sm:mt-6">
                                            <button 
                                                onClick={openModal}
                                                className="w-full inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white font-medium rounded-md shadow-sm hover:from-gray-700 hover:to-gray-600 transition-all duration-300 hover:shadow-md text-xs sm:text-sm"
                                            >
                                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                                Randevu Oluştur
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* YouTube Video */}
                            <div className="lg:w-1/2 order-1 lg:order-2">
                                <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-200 group aspect-video">
                                    <iframe 
                                        className="w-full h-full absolute inset-0"
                                        src="https://www.youtube.com/embed/YOUTUBE_VIDEO_ID" 
                                        title="Randevu Portalı Tanıtım Videosu"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                    ></iframe>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 sm:p-4">
                                        <p className="text-white text-xs sm:text-sm md:text-base font-medium">Randevu Portalı Tanıtım Videosu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Randevu Yanıtını Bekle */}
                        <div className="mt-3 sm:mt-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group">
                            <div className="flex items-center mb-2 sm:mb-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center text-white shadow-md group-hover:from-gray-700 group-hover:to-gray-600 transition-all duration-300">
                                    <Clock3 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                                </div>
                                <h3 className="ml-3 sm:ml-4 text-base sm:text-lg md:text-xl font-semibold text-gray-800">Randevu Yanıtını Bekle</h3>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center">
                                <p className="text-gray-600 text-xs sm:text-sm md:w-3/4">
                                    Oluşturduğunuz randevu talebiniz akademisyene iletilecektir. Akademisyen randevu talebinizi onayladığında 
                                    e-posta ile bilgilendirileceksiniz. Randevu durumunuzu hesabınızdan takip edebilirsiniz.
                                </p>
                                <div className="mt-3 md:mt-0 md:ml-auto">
                                    <Link 
                                        to="/randevular" 
                                        className="w-full md:w-auto inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white font-medium rounded-md shadow-sm hover:from-gray-700 hover:to-gray-600 transition-all duration-300 hover:shadow-md text-xs sm:text-sm"
                                    >
                                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                        Randevu Durumunu Kontrol Et
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* modal render */}
            <Modal />
        </div>
    );
}

export default Anasayfa; 