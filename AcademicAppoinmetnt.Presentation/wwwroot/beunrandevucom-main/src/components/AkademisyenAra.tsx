import React, { useState } from 'react';
import { X, ChevronRight, Search, GraduationCap, Building, BookOpen, User } from 'lucide-react';
import fakultelerVeBolumler from '../../FakulteData';
import { Link } from 'react-router-dom';

export interface SelectedAcademic {
  faculty: string;
  department: string;
  academic: string;
}
interface AcademicSelectionModalHook {
  openModal: () => void;
  closeModal: () => void;
  Modal: React.FC;
  selection: SelectedAcademic | null;
}

export const useAcademicSelectionModal = (): AcademicSelectionModalHook => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'faculty' | 'department' | 'academic'>('faculty');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selection, setSelection] = useState<SelectedAcademic | null>(null);

  // Modal açma fonksiyonu
  const openModal = () => {
    setIsOpen(true);
    setStep('faculty');
    setSelectedFaculty('');
    setSelectedDepartment('');
    setSearchTerm('');
    setSelection(null);
  };

  // Modal kapatma fonksiyonu
  const closeModal = () => {
    setIsOpen(false);
  };

  // Fakülte seçimi
  const handleFacultySelect = (facultyName: string) => {
    setSelectedFaculty(facultyName);
    setStep('department');
    setSearchTerm('');
  };

  // Bölüm seçimi
  const handleDepartmentSelect = (departmentName: string) => {
    setSelectedDepartment(departmentName);
    setStep('academic');
    setSearchTerm('');
  };

  // Akademisyen seçimi
  const handleAcademicSelect = (academicName: string) => {
    setSelection({
      faculty: selectedFaculty,
      department: selectedDepartment,
      academic: academicName
    });
    closeModal();
  };

  // Geri gitme fonksiyonu
  const handleBack = () => {
    if (step === 'academic') {
      setStep('department');
    } else if (step === 'department') {
      setStep('faculty');
      setSelectedDepartment('');
    }
    setSearchTerm('');
  };

  // Arama fonksiyonu
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filtreleme fonksiyonları
  const filteredFaculties = fakultelerVeBolumler.filter(faculty => 
    faculty.name.toLowerCase().includes(searchTerm)
  );

  const filteredDepartments = selectedFaculty 
    ? fakultelerVeBolumler
        .find(f => f.name === selectedFaculty)
        ?.departments.filter(dept => 
          dept.name.toLowerCase().includes(searchTerm)
        ) || []
    : [];

  const filteredAcademics = selectedDepartment && selectedFaculty
    ? fakultelerVeBolumler
        .find(f => f.name === selectedFaculty)
        ?.departments.find(d => d.name === selectedDepartment)
        ?.academics?.filter(academic => 
          academic.isim.toLowerCase().includes(searchTerm)
        ) || []
    : [];

  // Modal bileşeni
  const Modal: React.FC = () => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Modal başlık */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 flex justify-between items-center">
            <h2 className="text-white font-bold text-lg flex items-center">
              {step === 'faculty' && <Building className="w-5 h-5 mr-2" />}
              {step === 'department' && <BookOpen className="w-5 h-5 mr-2" />}
              {step === 'academic' && <GraduationCap className="w-5 h-5 mr-2" />}
              {step === 'faculty' && 'Fakülte Seçimi'}
              {step === 'department' && 'Bölüm Seçimi'}
              {step === 'academic' && 'Akademisyen Seçimi'}
            </h2>
            <button 
              onClick={closeModal}
              className="text-white hover:text-gray-300 focus:outline-none"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Seçim yolu */}
          {(step === 'department' || step === 'academic') && (
            <div className="bg-gray-100 px-4 py-2 flex items-center text-sm">
              <button 
                onClick={() => setStep('faculty')}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                {selectedFaculty}
              </button>
              
              {step === 'academic' && (
                <>
                  <ChevronRight className="w-4 h-4 mx-1 text-gray-500" />
                  <button 
                    onClick={() => setStep('department')}
                    className="text-gray-700 hover:text-gray-900 font-medium"
                  >
                    {selectedDepartment}
                  </button>
                </>
              )}
            </div>
          )}

          {/* Arama kutusu */}
          <div className="p-4 border-b">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                placeholder={
                  step === 'faculty' 
                    ? "Fakülte ara..." 
                    : step === 'department' 
                      ? "Bölüm ara..." 
                      : "Akademisyen ara..."
                }
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Seçim listesi */}
          <div className="max-h-80 overflow-y-auto p-2">
            {step === 'faculty' && (
              <div className="grid grid-cols-1 gap-2">
                {filteredFaculties.length > 0 ? (
                  filteredFaculties.map((faculty) => (
                    <button
                      key={faculty.name}
                      onClick={() => handleFacultySelect(faculty.name)}
                      className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100 text-left transition-colors border border-gray-200 hover:border-gray-300"
                    >
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="text-sm font-medium">{faculty.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">Fakülte bulunamadı</div>
                )}
              </div>
            )}

            {step === 'department' && (
              <div className="grid grid-cols-1 gap-2">
                {filteredDepartments.length > 0 ? (
                  filteredDepartments.map((department) => (
                    <button
                      key={department.name}
                      onClick={() => handleDepartmentSelect(department.name)}
                      className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100 text-left transition-colors border border-gray-200 hover:border-gray-300"
                    >
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="text-sm font-medium">{department.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">Bölüm bulunamadı</div>
                )}
              </div>
            )}

            {step === 'academic' && (
              <div className="grid grid-cols-1 gap-2">
                {filteredAcademics.length > 0 ? (
                  filteredAcademics.map((academic) => (
                    <Link
                      key={academic.isim}
                      to={`/akademisyen/${academic.urlPath}`}
                      className="flex items-center justify-between p-3 rounded-md hover:bg-gray-100 text-left transition-colors border border-gray-200 hover:border-gray-300"
                      onClick={() => handleAcademicSelect(academic.isim)}
                    >
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="text-sm font-medium">{academic.isim}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">Akademisyen bulunamadı</div>
                )}
              </div>
            )}
          </div>

          {/* Alt butonlar */}
          <div className="p-4 border-t bg-gray-50 flex justify-between">
            {step !== 'faculty' ? (
              <button
                onClick={handleBack}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Geri
              </button>
            ) : (
              <div></div>
            )}
            <button
              onClick={closeModal}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              İptal
            </button>
          </div>
        </div>
      </div>
    );
  };

  return { openModal, closeModal, Modal, selection };
};
