import { useState, useEffect, useRef } from 'react'
import { Search as SearchIcon, PanelLeft, X, SquarePlus, GraduationCap, User} from 'lucide-react'
import { NavLink } from 'react-router-dom';
import { useAcademicSelectionModal } from './AkademisyenAra';
import SearchComponent from './Search';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const { openModal, Modal, selection} = useAcademicSelectionModal();

  useEffect(() => {
    if (selection) {
      console.log('Seçilen:', selection);
    }
  }, [selection]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsSearchOpen(false)
      }
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }
  return (
    <header className="bg-white h-16 flex items-center">
      <div className="w-full px-4 flex items-center justify-between">
        {/* Sol Taraf - Sidebar Toggle ve Arama */}
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-1.5 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-150 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
          
          {/* Mobil Arama Butonu */}
          {isMobile && !isSearchOpen && (
            <>
              <div className="h-4 mx-3 border-l border-gray-300"></div>
              <button 
                onClick={toggleSearch}
                className="p-1.5 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-150 focus:outline-none"
                aria-label="Open search"
              >
                <SearchIcon className="h-4 w-4" />
              </button>
            </>
          )}
          
          {/* Desktop Arama */}
          {!isMobile && (
            <>
              <div className="h-4 mx-3 border-l border-gray-300"></div>
              <div className="relative w-56 ml-2">
                <SearchComponent />
              </div>
            </>
          )}
        </div>
        
        {/* Sağ Taraf - Butonlar */}
        <div className="flex items-center">
          {!isMobile && (
            <div className="flex items-center space-x-3">
              <button 
                className="p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-150 focus:outline-none"
                aria-label="Randevu Oluştur"
                onClick={openModal}
              >
                <SquarePlus className="h-5 w-5" />
              </button>
              
              <div className="h-5 border-l border-gray-300 mx-1"></div>
              
              <div className="flex border rounded-md overflow-hidden h-7">
                <NavLink 
                  to="/akademisyen/giris" 
                  className={({isActive}) => 
                    `px-2 py-1 inline-flex items-center gap-1 text-[11px] font-medium ${
                      isActive 
                        ? 'bg-gray-800 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } border-r border-gray-300 transition-colors duration-150`
                  }
                >
                  <GraduationCap className='w-3 h-3' />
                  <span className='text-[11px]'>Akademisyen</span>
                </NavLink>
                
                <NavLink 
                  to="/ogrenci/giris" 
                  className={({isActive}) => 
                    `px-2 py-1 inline-flex items-center gap-1 text-[11px] font-medium ${
                      isActive 
                        ? 'bg-gray-800 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    } transition-colors duration-150`
                  }
                >
                  <User className='w-3 h-3' />
                  <span className='text-[11px]'>Öğrenci</span>
                </NavLink>
              </div>
            </div>
          )}
          
          {/* Mobil Butonlar */}
          {isMobile && !isSearchOpen && (
            <div className='flex items-center gap-2'>
              <button 
                className="p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-150 focus:outline-none"
                aria-label="Randevu Oluştur"
                onClick={openModal}
              >
                <SquarePlus className="h-5 w-5" />
              </button>
              
              <div className="h-5 border-l border-gray-300 mx-0.5"></div>
              
              <div className="flex space-x-1.5">
                <NavLink 
                  to="/akademisyen/giris"
                  className={({isActive}) => 
                    `p-1 rounded-md border border-gray-300 inline-flex items-center justify-center ${
                      isActive 
                        ? 'bg-gray-800 text-white border-gray-700' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-colors duration-150`
                  }
                >
                  <GraduationCap className='w-3.5 h-3.5' />
                </NavLink>
                
                <NavLink 
                  to="/ogrenci/giris"
                  className={({isActive}) => 
                    `p-1 rounded-md border border-gray-300 inline-flex items-center justify-center ${
                      isActive 
                        ? 'bg-gray-800 text-white border-gray-700' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    } transition-colors duration-150`
                  }
                >
                  <User className='w-3.5 h-3.5' />
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobil Arama Overlay */}
      {isMobile && isSearchOpen && (
        <div className="absolute inset-x-0 top-0 h-16 bg-white z-10 flex items-center px-4 border-b border-gray-200">
          <button 
            onClick={toggleSidebar}
            className="p-1.5 mr-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-150 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
          
          <div className="flex-1 relative">
            <SearchComponent placeholder="Akademisyen ara..." />
          </div>
          
          <button 
            onClick={toggleSearch}
            className="p-1.5 ml-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-150 focus:outline-none"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      
      <Modal />
    </header>
  )
}

export default Header 