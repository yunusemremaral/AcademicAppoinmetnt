import { useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Calendar, BookOpen, ChevronDown, ChevronRight, PanelLeft, Settings } from 'lucide-react'
import { beunLogo } from "../assets/academicImages"
import fakultelerVeBolumler from "../../FakulteData"
import AyarlarModal from './Ayarlar'
import Zaman from './Zaman'

interface SidebarProps {
  collapsed: boolean;
  onClose?: () => void;
  isMobile: boolean;
  onExpand?: () => void;
}

const Sidebar = ({ collapsed, onClose, isMobile, onExpand }: SidebarProps) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const location = useLocation()
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

  const toggleMenu = (menuId: string) => {
    if (expandedMenus.includes(menuId)) {
      setExpandedMenus(expandedMenus.filter(id => id !== menuId))
    } else {
      setExpandedMenus([...expandedMenus, menuId])
    }
  }

  const handleMenuClick = (menuId: string, hasSubmenu: boolean) => {
    if (hasSubmenu) {
      if (collapsed && !isMobile && onExpand) {
        // If sidebar is collapsed and it's the submenu item, expand the sidebar first
        onExpand();
        // Then after a small delay, expand the submenu
        setTimeout(() => {
          if (!expandedMenus.includes(menuId)) {
            setExpandedMenus([...expandedMenus, menuId]);
          }
        }, 300); // This should match the transition duration
      } else {
        toggleMenu(menuId);
      }
    }
  };

  const isMenuExpanded = (menuId: string) => expandedMenus.includes(menuId)
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const mainMenuItems = [
    { id: 'anasayfa', name: 'Anasayfa', icon: Home, path: '/' },
    { id: 'randevular', name: 'Randevular', icon: Calendar, path: '/randevular' },
    { id: 'bolumler', name: 'Bölümler', icon: BookOpen, path: '/bolumler', hasSubmenu: true },
  ]

  const departmentItems = useMemo(() => getAllDepartments(), []);
  const settingsItems = [{ id: 'ayarlar', name: 'Ayarlar', icon: Settings, onClick: () => {
    setIsSettingsModalOpen(true);
    // ayarları modalı aktif
  }}]
  const departmentListHeight = 10 * 32;

  const renderMenuItems = (items: any[], showIcons = true) => {
    return items.map((item) => (
      <li key={item.id} className={collapsed && !isMobile ? 'flex justify-center' : ''}>
        {item.hasSubmenu ? (
          <div className="w-full">
            <div 
              className={`flex items-center ${collapsed ? 'justify-center' : ''} py-2 px-3 cursor-pointer ${
                isActive(item.path) 
                  ? 'text-white bg-gray-700/40' 
                  : 'text-gray-100 hover:bg-gray-700/30'
              } rounded-md text-xs transition-colors duration-200 ease-in-out`}
              onClick={() => handleMenuClick(item.id, item.hasSubmenu)}
            >
              {!collapsed || isMobile ? (
                <>
                  <span className="mr-2 flex items-center justify-center w-5 h-5">
                    <item.icon className="w-4 h-4" />
                  </span>
                  <span className="truncate text-[13px] font-medium">{item.name}</span>
                  <span className="ml-auto">
                    {isMenuExpanded(item.id) ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </span>
                </>
              ) : (
                <item.icon className="w-4 h-4" />
              )}
            </div>
            
            {isMenuExpanded(item.id) && (!collapsed || isMobile) && (
              <div 
                className="ml-4 pl-2 border-l border-gray-600/30 mt-1 overflow-y-auto pr-1" 
                style={{ 
                  maxHeight: `${departmentListHeight}px`, 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none' 
                }}
              >
                <style dangerouslySetInnerHTML={{ __html: `
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}} />
                <ul className="space-y-1">
                  {departmentItems.map((subItem) => (
                    <li key={subItem.id}>
                      <Link
                        to={subItem.path}
                        className={`flex items-center py-1.5 px-2 ${
                          isActive(subItem.path) 
                            ? 'text-white bg-gray-700/40' 
                            : 'text-gray-300 hover:text-white hover:bg-gray-700/30'
                        } rounded-md text-xs transition-colors duration-200 ease-in-out`}
                        title={`${subItem.name} (${subItem.faculty})`}
                        onClick={isMobile && onClose ? onClose : undefined}
                      >
                        <span className="truncate text-[12px]">{subItem.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : item.onClick ? (
          <button
            onClick={(e) => {
              // ayarlar modalını kapat
              if (item.id === 'ayarlar') {
                item.onClick(e);
              } else {
                item.onClick(e);
                if (isMobile && onClose) onClose();
              }
            }}
            className={`flex items-center ${collapsed ? 'justify-center' : ''} py-2 px-3 ${
              isActive(item.path) 
                ? 'text-white bg-gray-700/40' 
                : 'text-gray-100 hover:bg-gray-700/30'
            } rounded-md text-xs w-full transition-colors duration-200 ease-in-out`}
          >
            {showIcons && item.icon && (
              <>
                {collapsed && !isMobile ? (
                  <item.icon className="w-4 h-4" />
                ) : (
                  <span className="mr-2 flex items-center justify-center w-5 h-5">
                    <item.icon className="w-4 h-4" />
                  </span>
                )}
              </>
            )}
            {(!collapsed || isMobile) && (
              <span className="truncate text-[13px] font-medium">{item.name}</span>
            )}
          </button>
        ) : (
          <Link
            to={item.path}
            className={`flex items-center ${collapsed ? 'justify-center' : ''} py-2 px-3 ${
              isActive(item.path) 
                ? 'text-white bg-gray-700/40' 
                : 'text-gray-100 hover:bg-gray-700/30'
            } rounded-md text-xs w-full transition-colors duration-200 ease-in-out`}
            onClick={isMobile && onClose ? onClose : undefined}
          >
            {showIcons && item.icon && (
              <>
                {collapsed && !isMobile ? (
                  <item.icon className="w-4 h-4" />
                ) : (
                  <span className="mr-2 flex items-center justify-center w-5 h-5">
                    <item.icon className="w-4 h-4" />
                  </span>
                )}
              </>
            )}
            {(!collapsed || isMobile) && (
              <span className="truncate text-[13px] font-medium">{item.name}</span>
            )}
          </Link>
        )}
      </li>
    ))
  }

  return (
    <>
      <aside 
        className={`bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 border-r border-gray-700/30 shadow-lg flex flex-col ${
          isMobile ? 'fixed top-0 left-0 h-full z-40' : 'h-screen sticky top-0'
        } ${
          collapsed && !isMobile ? 'w-14' : 'w-64'
        } transition-all duration-300`}
      >
        {isMobile && (
          <div className="absolute top-0 -right-2 p-6">
            <button 
              onClick={onClose}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          </div>
        )}
        
        <div className="h-16 flex items-center border-b border-gray-700/30 flex-shrink-0">
          <div className={`flex ${collapsed && !isMobile ? 'justify-center w-full' : 'px-3'}`}>
            {collapsed ? (
              <div className="flex items-center justify-center bg-white rounded-full w-8 h-8 overflow-hidden shadow-md">
                <img 
                  src={beunLogo} 
                  alt="BEÜ Logo" 
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://w3.beun.edu.tr/img/logo_tr.png";
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center">
                <div className="flex items-center justify-center bg-white rounded-full w-9 h-9 mr-2.5 overflow-hidden shadow-md">
                  <img 
                    src={beunLogo} 
                    alt="BEÜ Logo" 
                    className="w-7 h-7 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://w3.beun.edu.tr/img/logo_tr.png";
                    }}
                  />
                </div>
                <div>
                  <h2 className="text-[13px] font-semibold text-white truncate leading-tight">Bülent Ecevit Üniversitesi</h2>
                  <p className="text-[10px] text-gray-400 truncate leading-tight">beunrandevu.com</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className={`${collapsed && !isMobile ? '' : 'px-3'} mt-3 flex-1`}>
            {(!collapsed || isMobile) && (
              <div className="mb-2">
                <p className="text-[10px] uppercase tracking-wider font-medium text-gray-400 pl-2">Arayüz</p>
              </div>
            )}
            
            <ul className="space-y-1 mb-4">
              {renderMenuItems(mainMenuItems)}
            </ul>
            
            {(!collapsed || isMobile) && (
              <div className="mb-2">
                <p className="text-[10px] uppercase tracking-wider font-medium text-gray-400 pl-2">Ayarlar</p>
              </div>
            )}
            
            <ul className="space-y-1 mb-4">
              {renderMenuItems(settingsItems)}
            </ul>
          </div>
        </div>
        
        <Zaman variant="sidebar" collapsed={collapsed} isMobile={isMobile} />
      </aside>
      
      <AyarlarModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
    </>
  )
}

const getAllDepartments = () => {
  const allDepartments: { id: string; name: string; path: string; faculty: string }[] = [];
  
  fakultelerVeBolumler.forEach(faculty => {
    faculty.departments.forEach(dept => {
      if (faculty.urlPath && dept.urlPath) {
        allDepartments.push({
          id: dept.urlPath,
          name: dept.name,
          path: `/${faculty.urlPath}/${dept.urlPath}`,
          faculty: faculty.name
        });
      } else {
        // urlPath'i olmayan herhangi bir fakülte veya bölüm için geri dönüş
        const deptId = dept.name.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
          
        allDepartments.push({
          id: deptId,
          name: dept.name,
          path: `/bolumler/${deptId}`,
          faculty: faculty.name
        });
      }
    });
  });
  
  return allDepartments;
};

export default Sidebar