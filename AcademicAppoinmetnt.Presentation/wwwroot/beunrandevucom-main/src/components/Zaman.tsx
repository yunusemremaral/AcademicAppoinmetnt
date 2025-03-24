import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface ZamanProps {
  variant?: 'sidebar' | 'header' | 'minimal';
  collapsed?: boolean;
  isMobile?: boolean;
  className?: string;
}

const Zaman = ({ variant = 'sidebar', collapsed = false, isMobile = false, className = '' }: ZamanProps) => {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentDay, setCurrentDay] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentFullDate, setCurrentFullDate] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      const dateOptions: Intl.DateTimeFormatOptions = { 
        day: 'numeric', 
        month: 'long',
        timeZone: 'Europe/Istanbul'
      };
      
      const dayOptions: Intl.DateTimeFormatOptions = { 
        weekday: 'long',
        timeZone: 'Europe/Istanbul'
      };
      
      const timeOptions: Intl.DateTimeFormatOptions = { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'Europe/Istanbul'
      };

      const fullDateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Europe/Istanbul'
      };
      
      const dateFormatter = new Intl.DateTimeFormat('tr-TR', dateOptions);
      const dayFormatter = new Intl.DateTimeFormat('tr-TR', dayOptions);
      const timeFormatter = new Intl.DateTimeFormat('tr-TR', timeOptions);
      const fullDateFormatter = new Intl.DateTimeFormat('tr-TR', fullDateOptions);
      
      setCurrentDate(dateFormatter.format(now));
      setCurrentDay(dayFormatter.format(now));
      setCurrentTime(timeFormatter.format(now));
      setCurrentFullDate(fullDateFormatter.format(now));
    };
    
    updateDateTime();
    const timeInterval = setInterval(updateDateTime, 1000 * 60); // Her dakika güncelle
    return () => clearInterval(timeInterval);
  }, []);

  // Sidebar görünümünde daraltılmış modda göstermeyelim
  if (variant === 'sidebar' && collapsed && !isMobile) {
    return null;
  }

  // Header (ana sayfa üst kısım) görünümü
  if (variant === 'header') {
    return (
      <div className={`flex flex-col items-end ${className}`}>
        <div className="flex items-center text-white">
          <Clock className="w-5 h-5 mr-2" />
          <span className="text-base font-medium">{currentTime}</span>
        </div>
        <div className="text-gray-300 text-sm mt-1">{currentFullDate}</div>
      </div>
    );
  }

  // Minimal görünüm (sadece saat)
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center ${className}`}>
        <Clock className="w-4 h-4 mr-1" />
        <span className="text-sm font-medium">{currentTime}</span>
      </div>
    );
  }

  // Varsayılan (sidebar) görünümü
  return (
    <div className={`mt-auto flex-shrink-0 ${className}`}>
      <div className="px-3 py-2 mx-3 my-2 bg-gray-800/70 rounded-md border border-gray-700/30 backdrop-blur-sm">
        <div className="flex items-center justify-center mb-1">
          <Clock className="w-3 h-3 text-gray-400 mr-1" />
          <p className="text-[10px] text-gray-300 font-medium">{currentTime}</p>
        </div>
        <p className="text-[10px] text-gray-300 text-center font-medium">
          {currentDate} - {currentDay}
        </p>
      </div>
    </div>
  );
};

export default Zaman;
