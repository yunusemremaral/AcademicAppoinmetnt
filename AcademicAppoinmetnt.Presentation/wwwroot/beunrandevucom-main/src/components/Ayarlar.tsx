import { useState, useEffect } from 'react';
import { Moon, Sun, X, Settings as SettingsIcon } from 'lucide-react';
import ReactDOM from 'react-dom';

interface AyarlarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AyarlarModal: React.FC<AyarlarModalProps> = ({ isOpen, onClose }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme === 'dark' || (!savedTheme && prefersDark);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden w-full max-w-md">
        {/* Modal Başlık */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 flex justify-between items-center">
          <h2 className="text-white font-bold text-lg flex items-center">
            <SettingsIcon className="w-5 h-5 mr-2" />
            Ayarlar
          </h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300 focus:outline-none"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Modal İçerik */}
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                {isDarkMode ? (
                  <Moon className="w-5 h-5 text-gray-800 dark:text-white mr-3" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500 mr-3" />
                )}
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">Karanlık Mod</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isDarkMode ? 'Karanlık mod aktif' : 'Aydınlık mod aktif'}
                  </p>
                </div>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="w-full py-2 px-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-md hover:from-gray-700 hover:to-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AyarlarModal;
