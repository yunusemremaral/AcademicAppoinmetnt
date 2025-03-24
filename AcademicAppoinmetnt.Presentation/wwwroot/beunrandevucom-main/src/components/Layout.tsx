import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const savedState = localStorage.getItem('sidebarCollapsed')
    return savedState ? JSON.parse(savedState) : false
  })
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isSidebarCollapsed))
  }, [isSidebarCollapsed])

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen)
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed)
    }
  }

  const expandSidebar = () => {
    if (isSidebarCollapsed) {
      setIsSidebarCollapsed(false)
    }
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  if (pageLoading) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <div className={`${isMobile ? 'hidden' : 'block'} ${isSidebarCollapsed ? 'w-14' : 'w-64'} flex-shrink-0 animate-pulse bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800`}></div>
        <div className="flex flex-col flex-1 h-screen overflow-hidden">
          <div className="h-16 bg-white shadow animate-pulse"></div>
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
            <div className="max-w-[1600px] mx-auto">
              <div className="h-8 bg-gray-200 rounded-full animate-pulse w-1/4 mb-4"></div>
              <div className="h-64 bg-white rounded-lg shadow animate-pulse"></div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar - Desktop */}
      {!isMobile && (
        <div className={`${isSidebarCollapsed ? 'w-14' : 'w-64'} flex-shrink-0 transition-all duration-300`}>
          <Sidebar collapsed={isSidebarCollapsed} isMobile={false} onExpand={expandSidebar} />
        </div>
      )}

      {/* Sidebar - Mobile Açılımı*/}
      {isMobile && isSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30 transition-opacity duration-300"
            onClick={closeSidebar}
          ></div>
          <div className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] z-40 transition-transform duration-300 transform translate-x-0">
            <Sidebar collapsed={false} onClose={closeSidebar} isMobile={true} />
          </div>
        </>
      )}

      {/* Ana İçerik */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-2 sm:p-3 md:p-4">
          <div className="max-w-[1600px] mx-auto flex flex-col min-h-[calc(100vh-4rem)]">
            <div className="flex-grow">
              <Outlet />
            </div>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout 