import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GraduationCap, Book } from 'lucide-react';
import fakultelerVeBolumler, { Fakulte, Bolum, Academic } from '../../FakulteData';

const BolumDetay = () => {
  const { fakulteUrlPath, bolumUrlPath } = useParams<{ fakulteUrlPath: string; bolumUrlPath: string }>();
  const [faculty, setFaculty] = useState<Fakulte | null>(null);
  const [department, setDepartment] = useState<Bolum | null>(null);
  const [academics, setAcademics] = useState<Academic[]>([]);
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const selectedFaculty = fakultelerVeBolumler.find(f => f.urlPath === fakulteUrlPath);
    if (selectedFaculty) {
      setFaculty(selectedFaculty);
      
      const selectedDepartment = selectedFaculty.departments.find(d => d.urlPath === bolumUrlPath);
      if (selectedDepartment) {
        setDepartment(selectedDepartment);
        
        // Initialize all images as loading
        const initialLoadingState: Record<string, boolean> = {};
        if (selectedDepartment.academics) {
          selectedDepartment.academics.forEach(academic => {
            initialLoadingState[academic.urlPath] = true;
          });
        }
        setLoadingImages(initialLoadingState);
        setAcademics(selectedDepartment.academics || []);
      }
    }
  }, [fakulteUrlPath, bolumUrlPath]);

  const handleImageLoad = (academicPath: string) => {
    setLoadingImages(prev => ({
      ...prev,
      [academicPath]: false
    }));
  };

  const handleImageError = (academicPath: string) => {
    setLoadingImages(prev => ({
      ...prev,
      [academicPath]: false
    }));
  };

  if (!faculty || !department) {
    return (
      <div className="w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Bölüm Bulunamadı</h1>
          <p className="text-gray-600 text-lg">
            Aradığınız bölüm bulunamadı. Lütfen geçerli bir bölüm seçin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50">
    
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 rounded-t-xl shadow-md p-4 border border-gray-700/50">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <Book className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h1 className="text-lg font-semibold text-white leading-tight tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">{department.name}</h1>
              <p className="text-xs text-blue-300/90 font-normal mt-0.5">{faculty.name}</p>
            </div>
          </div>
          <div className="hidden md:block flex-shrink-0 ml-3">
            <div className="inline-flex items-center bg-gray-800/70 text-blue-300 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-700/50 whitespace-nowrap">
              <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
              <span className='text-xs'>{academics.length} Akademisyen</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Açık renkli içerik bölümü */}
      <div className="bg-white rounded-b-xl shadow-lg p-5 md:p-6 mb-8 border-x border-b border-gray-100">
          <h3 className="text-sm md:text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-1 bg-blue-600 rounded-full mr-2"></span>
            Akademik Kadro
          </h3>
          
          {academics.length === 0 ? (
            <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg">
              <p className="text-center">Bu bölüm için akademik kadro bilgisi bulunmamaktadır.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 xs:gap-3 sm:gap-4 md:gap-5">
              {academics.map((academic) => (
                <Link
                  key={academic.urlPath}
                  to={`/akademisyen/${academic.urlPath}`}
                  className="block transition transform hover:scale-105 hover:-translate-y-1 duration-300"
                >
                  <div className="bg-white rounded-lg xs:rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100">
                    <div className="relative pb-[120%] xs:pb-[130%]">
                      {/* Skeleton loader */}
                      {loadingImages[academic.urlPath] && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                      )}
                      
                      <img
                        src={academic.fotoUrl}
                        alt={academic.isim}
                        className={`absolute inset-0 w-full h-full object-cover ${loadingImages[academic.urlPath] ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                        onLoad={() => handleImageLoad(academic.urlPath)}
                        onError={(e) => {
                          handleImageError(academic.urlPath);
                          const target = e.target as HTMLImageElement;
                          target.src = "https://via.placeholder.com/300x300?text=Fotoğraf+Yok";
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent py-2 xs:py-3 px-2 xs:px-3">
                        <div className="flex flex-col justify-end">
                          <h3 className="text-white text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-medium break-words line-clamp-2">
                            {academic.isim}
                          </h3>
                          <p className="text-blue-200 text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs mt-0.5 xs:mt-1">
                            Randevu sayfası için tıklayın
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

  );
};

export default BolumDetay;
