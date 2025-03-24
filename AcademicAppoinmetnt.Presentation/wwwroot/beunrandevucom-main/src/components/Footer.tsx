import { Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="mt-auto pt-4 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row items-center justify-between py-2">
        <p className="text-gray-600 text-sm">
          © {currentYear} Bülent Ecevit Üniversitesi. Tüm hakları saklıdır.
        </p>
        <div className="flex items-center mt-2 sm:mt-0">
          <a 
            href="https://github.com/rathesi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <Github className="w-5 h-5 mr-2" />
            <span className="text-sm">GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer; 