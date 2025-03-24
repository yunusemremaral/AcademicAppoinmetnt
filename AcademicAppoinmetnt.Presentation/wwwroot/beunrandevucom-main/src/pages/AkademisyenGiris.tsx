import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import beunLogo from "../assets/beunlogo.png";

const AkademisyenGiris = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({email: '', password: ''});
  const [rememberMe, setRememberMe] = useState(false);
  const [formFocused, setFormFocused] = useState({email: false, password: false});

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
    validateField(name, value);
  };

  const handleFocus = (field: string) => setFormFocused(prev => ({...prev, [field]: true}));
  const handleBlur = (field: string) => setFormFocused(prev => ({...prev, [field]: false}));

  const validateField = (name: string, value: string) => {
    let errorMessage = '';
    switch (name) {
      case 'email':
        if (value.trim() === '') errorMessage = 'E-posta alanı boş bırakılamaz';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMessage = 'Geçerli bir e-posta adresi giriniz';
        break;
      case 'password':
        if (value.trim() === '') errorMessage = 'Şifre alanı boş bırakılamaz';
        else if (value.length < 6) errorMessage = 'Şifre en az 6 karakter olmalıdır';
        break;
    }
    setErrors(prev => ({...prev, [name]: errorMessage}));
    return errorMessage === '';
  };

  const validateForm = () => {
    return validateField('email', formData.email) && validateField('password', formData.password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: API call for authentication
      // fetch('/api/auth/login', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      //   headers: { 'Content-Type': 'application/json' }
      // });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col pt-8 sm:pt-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-300"></div>
            <img className="relative h-12 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300" src={beunLogo} alt="Bülent Ecevit Üniversitesi" />
          </div>
        </div>
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">Akademisyen Girişi</h2>
        <p className="mt-0.5 text-center text-xs text-gray-600">Akademik personel portalına erişim için giriş yapınız</p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 border border-gray-100 transition-all duration-300 hover:shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-posta Adresi</label>
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
                  className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition-all duration-300`}
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Şifre</label>
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
                  className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm transition-all duration-300`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">Beni Hatırla</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 border-b border-transparent hover:border-gray-700">Şifremi Unuttum</a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 transform hover:translate-y-[-1px]"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors duration-300" />
                </span>
                <span className="flex items-center">
                  Giriş Yap
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
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
                <span className="px-2 bg-white text-gray-500">Öğrenci misiniz?</span>
              </div>
            </div>
            
            <div className="mt-6">
              <a
                href="/ogrenci/giris"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
              >
                Öğrenci Girişine Git
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AkademisyenGiris;
