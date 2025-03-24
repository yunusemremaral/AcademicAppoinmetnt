import { Link } from 'react-router-dom';
import { Home, AlertCircle, ArrowLeft } from 'lucide-react';
import beunLogo from "../assets/beunlogo.png";

const NotFound = () => {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="h-24 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 flex items-center justify-center">
            <div className="flex items-center">
              <div className="bg-white rounded-full p-2 mr-4 shadow-md">
                <img 
                  src={beunLogo} 
                  alt="BEÜ Logo" 
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://w3.beun.edu.tr/img/logo_tr.png";
                  }}
                />
              </div>
              <h1 className="text-white text-2xl font-bold">Bülent Ecevit Üniversitesi</h1>
            </div>
          </div>
          
          <div className="p-8 space-y-8">
            <div className="flex justify-center">
              <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
                <AlertCircle className="w-14 h-14 text-gray-800" />
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-6xl font-bold text-gray-800 mb-3">404</h2>
              <h3 className="text-2xl font-bold text-gray-700 mb-5">Sayfa Bulunamadı</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Aradığınız sayfa mevcut değil veya taşınmış olabilir. Lütfen anasayfaya dönün veya farklı bir sayfa deneyin.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white font-medium rounded-md shadow-sm hover:from-gray-700 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 hover:shadow-lg"
              >
                <Home className="w-5 h-5 mr-2" />
                Anasayfaya Dön
              </Link>
              <button 
                onClick={() => window.history.back()}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Geri Dön
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;