import React, { useState, useMemo, useEffect } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Book, Hash, ArrowRight, UserPlus, Building } from 'lucide-react';
import beunLogo from "../assets/beunlogo.png"
import fakultelerVeBolumler from "../../FakulteData"
import { useNavigate, useLocation } from 'react-router-dom';

const OgrenciGiris: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    password: '',
    faculty: '',
    department: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    studentId: '',
    email: '',
    password: '',
    faculty: '',
    department: ''
  });

  const [formFocused, setFormFocused] = useState({
    name: false,
    studentId: false,
    email: false,
    password: false,
    faculty: false,
    department: false
  });
  
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const departmentOptions = useMemo(() => {
    if (!selectedFaculty) return [];
    const faculty = fakultelerVeBolumler.find(f => f.name === selectedFaculty);
    return faculty ? faculty.departments : [];
  }, [selectedFaculty]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({
      name: '',
      studentId: '',
      email: '',
      password: '',
      faculty: '',
      department: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'faculty') {
      setSelectedFaculty(value);
      setFormData(prev => ({
        ...prev,
        department: ''
      }));
    }

    validateField(name, value);
  };

  const handleFocus = (field: string) => {
    setFormFocused(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleBlur = (field: string) => {
    setFormFocused(prev => ({
      ...prev,
      [field]: false
    }));
  };

  const validateField = (name: string, value: string) => {
    let errorMessage = '';

    switch (name) {
      case 'name':
        if (value.trim() === '') {
          errorMessage = 'İsim alanı boş bırakılamaz';
        } else if (value.length < 3) {
          errorMessage = 'İsim en az 3 karakter olmalıdır';
        }
        break;
      case 'studentId':
        if (value.trim() === '') {
          errorMessage = 'Öğrenci numarası boş bırakılamaz';
        } else if (!/^\d+$/.test(value)) {
          errorMessage = 'Öğrenci numarası sadece rakamlardan oluşmalıdır';
        }
        break;
      case 'email':
        if (value.trim() === '') {
          errorMessage = 'E-posta alanı boş bırakılamaz';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = 'Geçerli bir e-posta adresi giriniz';
        }
        break;
      case 'password':
        if (value.trim() === '') {
          errorMessage = 'Şifre alanı boş bırakılamaz';
        } else if (value.length < 6) {
          errorMessage = 'Şifre en az 6 karakter olmalıdır';
        }
        break;
      case 'faculty':
        if (value === '') {
          errorMessage = 'Lütfen fakülte seçiniz';
        }
        break;
      case 'department':
        if (value === '') {
          errorMessage = 'Lütfen bölüm seçiniz';
        }
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));

    return errorMessage === '';
  };

  const validateForm = () => {
    let isValid = true;

    if (!isLogin) {
      isValid = validateField('name', formData.name) && isValid;
      isValid = validateField('studentId', formData.studentId) && isValid;
      isValid = validateField('faculty', formData.faculty) && isValid;
      isValid = validateField('department', formData.department) && isValid;
    }

    isValid = validateField('email', formData.email) && isValid;
    isValid = validateField('password', formData.password) && isValid;

    return isValid;
  };

  // Check if returning from verification page with user data
  useEffect(() => {
    const state = location.state as { returnToRegistration?: boolean; userData?: any } | null;
    if (state?.returnToRegistration && state.userData) {
      // Set form to registration and populate with saved data
      setIsLogin(false);
      const userData = state.userData;
      setFormData(userData);
      
      if (userData.faculty) {
        setSelectedFaculty(userData.faculty);
      }
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // TODO: API call for authentication or registration
      // const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      // fetch(endpoint, {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      //   headers: { 'Content-Type': 'application/json' }
      // });

      if (!isLogin) {
       
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
          setLoading(false);
        
          navigate('/ogrenci/dogrulama', { 
            state: { 
              email: formData.email,
              userData: formData
            }
          });
        }, 1500);
      } else {
        
        setLoading(true);
        
      
        setTimeout(() => {
          setLoading(false);
      
          navigate('/');
        }, 1500);
      }
    }
  };

  if (isLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col pt-8 sm:pt-10 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-300"></div>
              <img
                className="relative h-12 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                src={beunLogo}
                alt="Bülent Ecevit Üniversitesi"
              />
            </div>
          </div>
          <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">
            Öğrenci Girişi
          </h2>
          <p className="mt-0.5 text-center text-xs text-gray-600">
            Öğrenci portalına erişim için giriş yapınız
          </p>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 border border-gray-100 transition-all duration-300 hover:shadow-xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-posta Adresi
                </label>
                <div className={`mt-1 relative rounded-md shadow-sm transition-all duration-300 ${formFocused.email ? 'ring-2 ring-gray-500 ring-opacity-50' : ''}`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 ${formFocused.email ? 'text-gray-600' : 'text-gray-400'} transition-colors duration-300`} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="E-posta Adresi"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition-all duration-300`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Şifre
                </label>
                <div className={`mt-1 relative rounded-md shadow-sm transition-all duration-300 ${formFocused.password ? 'ring-2 ring-gray-500 ring-opacity-50' : ''}`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 ${formFocused.password ? 'text-gray-600' : 'text-gray-400'} transition-colors duration-300`} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Şifre"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    className={`block w-full pl-10 pr-10 py-3 border ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition-all duration-300`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-gray-800 focus:ring-gray-500 border-gray-300 rounded transition-colors duration-200"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                    Beni Hatırla
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 border-b border-transparent hover:border-gray-700">
                    Şifremi Unuttum
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 transform hover:translate-y-[-1px]"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </span>
                  <span className="flex items-center">
                    {loading ? 'İşleniyor...' : 'Giriş Yap'}
                    {!loading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />}
                  </span>
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Hesabınız yok mu?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={toggleForm}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
                >
                  Kayıt Ol
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col pt-8 sm:pt-10 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-300"></div>
              <img
                className="relative h-12 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                src={beunLogo}
                alt="Bülent Ecevit Üniversitesi"
              />
            </div>
          </div>
          <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">
            Öğrenci Kaydı
          </h2>
          <p className="mt-0.5 text-center text-xs text-gray-600">
            Yeni bir öğrenci hesabı oluşturun
          </p>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 border border-gray-100 transition-all duration-300 hover:shadow-xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Ad Soyad
                </label>
                <div className={`mt-1 relative rounded-md shadow-sm transition-all duration-300 ${formFocused.name ? 'ring-2 ring-gray-500 ring-opacity-50' : ''}`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 ${formFocused.name ? 'text-gray-600' : 'text-gray-400'} transition-colors duration-300`} />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Ad Soyad"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition-all duration-300`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                  Öğrenci Numarası
                </label>
                <div className={`mt-1 relative rounded-md shadow-sm transition-all duration-300 ${formFocused.studentId ? 'ring-2 ring-gray-500 ring-opacity-50' : ''}`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash className={`h-5 w-5 ${formFocused.studentId ? 'text-gray-600' : 'text-gray-400'} transition-colors duration-300`} />
                  </div>
                  <input
                    id="studentId"
                    name="studentId"
                    type="text"
                    autoComplete="off"
                    placeholder="Öğrenci Numarası"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('studentId')}
                    onBlur={() => handleBlur('studentId')}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.studentId ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition-all duration-300`}
                  />
                </div>
                {errors.studentId && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.studentId}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="faculty" className="block text-sm font-medium text-gray-700">
                  Fakülte
                </label>
                <div className={`mt-1 relative rounded-md shadow-sm transition-all duration-300 ${formFocused.faculty ? 'ring-2 ring-gray-500 ring-opacity-50' : ''}`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className={`h-5 w-5 ${formFocused.faculty ? 'text-gray-600' : 'text-gray-400'} transition-colors duration-300`} />
                  </div>
                  <select
                    id="faculty"
                    name="faculty"
                    value={formData.faculty}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('faculty')}
                    onBlur={() => handleBlur('faculty')}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.faculty ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition-all duration-300 appearance-none`}
                  >
                    <option value="">Fakülte Seçiniz</option>
                    {fakultelerVeBolumler.map(faculty => (
                      <option key={faculty.name} value={faculty.name}>
                        {faculty.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {errors.faculty && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.faculty}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Bölüm
                </label>
                <div className={`mt-1 relative rounded-md shadow-sm transition-all duration-300 ${formFocused.department ? 'ring-2 ring-gray-500 ring-opacity-50' : ''}`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Book className={`h-5 w-5 ${formFocused.department ? 'text-gray-600' : 'text-gray-400'} transition-colors duration-300`} />
                  </div>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('department')}
                    onBlur={() => handleBlur('department')}
                    disabled={!selectedFaculty}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.department ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition-all duration-300 appearance-none ${
                      !selectedFaculty ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  >
                    <option value="">Bölüm Seçiniz</option>
                    {departmentOptions.map(dept => (
                      <option key={dept.name} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {errors.department && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.department}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-posta Adresi
                </label>
                <div className={`mt-1 relative rounded-md shadow-sm transition-all duration-300 ${formFocused.email ? 'ring-2 ring-gray-500 ring-opacity-50' : ''}`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 ${formFocused.email ? 'text-gray-600' : 'text-gray-400'} transition-colors duration-300`} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="E-posta Adresi"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    className={`block w-full pl-10 pr-3 py-3 border ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition-all duration-300`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Şifre
                </label>
                <div className={`mt-1 relative rounded-md shadow-sm transition-all duration-300 ${formFocused.password ? 'ring-2 ring-gray-500 ring-opacity-50' : ''}`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 ${formFocused.password ? 'text-gray-600' : 'text-gray-400'} transition-colors duration-300`} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Şifre"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    className={`block w-full pl-10 pr-10 py-3 border ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition-all duration-300`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 transform hover:translate-y-[-1px]"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <UserPlus className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </span>
                  <span className="flex items-center">
                    {loading ? 'İşleniyor...' : 'Kayıt Ol'}
                    {!loading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />}
                  </span>
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Zaten hesabınız var mı?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={toggleForm}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
                >
                  Giriş Yap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default OgrenciGiris;