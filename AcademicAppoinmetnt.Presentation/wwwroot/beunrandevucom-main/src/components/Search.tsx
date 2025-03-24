import React, { useState, useEffect, useRef } from 'react';
import { Search, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import fakultelerVeBolumler from '../../FakulteData';

interface SearchProps {
  placeholder?: string;
  className?: string;
}
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/i̇/g, 'i') 
    .replace(/İ/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');
};

const SearchComponent: React.FC<SearchProps> = ({ 
  placeholder = "Akademisyen ara...",
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [results, setResults] = useState<Array<{ 
    name: string; 
    urlPath: string;
    faculty: string;
    department: string;
  }>>([]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    
    const normalizedSearchTerm = normalizeText(value);

    const matchingAcademics: Array<{ 
      name: string; 
      urlPath: string;
      faculty: string;
      department: string;
    }> = [];
    
    fakultelerVeBolumler.forEach(faculty => {
      faculty.departments.forEach(department => {
        if (department.academics) {
          department.academics.forEach(academic => {
            const normalizedName = normalizeText(academic.isim);
            if (normalizedName.includes(normalizedSearchTerm)) {
              matchingAcademics.push({
                name: academic.isim,
                urlPath: academic.urlPath,
                faculty: faculty.name,
                department: department.name
              });
            }
          });
        }
      });
    });
    
    setResults(matchingAcademics);
    setIsOpen(matchingAcademics.length > 0);
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-3 w-3 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="block w-full pl-7 pr-7 py-1 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 text-xs h-7"
          placeholder={placeholder}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          onFocus={() => searchTerm.length >= 2 && setIsOpen(true)}
        />
        
        {searchTerm && (
          <button 
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      
      {isOpen && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-[300px] min-w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-72 overflow-y-auto">
          <ul className="py-1">
            {results.map((result, index) => (
              <li key={index} className="px-1">
                <Link
                  to={`/akademisyen/${result.urlPath}`}
                  className="flex items-center px-3 py-2.5 text-sm hover:bg-gray-100 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-3.5 h-3.5 mr-2 text-gray-500 flex-shrink-0" />
                  <div className="overflow-hidden">
                    <p className="font-medium text-gray-800 line-clamp-2">{result.name}</p>
                    <p className="text-xs text-gray-500">{result.faculty} | {result.department}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isOpen && searchTerm.length >= 2 && results.length === 0 && (
        <div className="absolute z-10 mt-1 w-[300px] min-w-full bg-white rounded-md shadow-lg border border-gray-200">
          <div className="px-4 py-3 text-sm text-gray-500 text-center">
            "{searchTerm}" için sonuç bulunamadı
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent; 