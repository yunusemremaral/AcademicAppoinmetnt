import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, CheckCircle, ArrowRight, RefreshCw, ArrowLeft } from 'lucide-react';
import beunLogo from "../assets/beunlogo.png";

const OgrenciDogrulama: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [timer, setTimer] = useState<number>(120); 
  const [canResend, setCanResend] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // eposta ve kullanıcı verilerini al
    const state = location.state as { email?: string, userData?: any } | null;
    if (state?.email) {
      setEmail(state.email);
      if (state.userData) {
        setUserData(state.userData);
      }
    } else {
      // eposta onaylanmazsa kayıt sayfasına yönlendir
      navigate('/ogrenci/giris', { replace: true });
    }

    // geri sayım
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [location, navigate]);

  const handleChange = (index: number, value: string) => {

    if (value && !/^\d+$/.test(value)) {
      return;
    }

    const newCode = [...verificationCode];
    
    if (value.length > 1) {
      const digits = value.split('').slice(0, 6);
      const newFilledCode = [...Array(6).fill('')];
      
      digits.forEach((digit, idx) => {
        if (idx < 6) {
          newFilledCode[idx] = digit;
        }
      });
      
      setVerificationCode(newFilledCode);
      
      if (digits.length < 6) {
        document.getElementById(`code-${index + digits.length}`)?.focus();
      } else {
        document.getElementById(`code-5`)?.focus();
      }
      return;
    }

    newCode[index] = value;
    setVerificationCode(newCode);
    
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationCode.join('');
    
    if (code.length !== 6) {
      setError('Lütfen 6 haneli doğrulama kodunu eksiksiz giriniz.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // api simülasyonu
      // -------------------
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 123456 kodu geçerli
      if (code === "123456") {
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError('Doğrulama kodu hatalı. Lütfen tekrar deneyiniz.');
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError('');
    
    try {
      // api simülasyonu
      // 
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // geri sayımı sıfırla
      setTimer(120);
      setCanResend(false);
      
      // geri dönüş mesajı
      setError('');
      alert('Yeni doğrulama kodu e-posta adresinize gönderildi.');
    } catch (err) {
      setError('Kod gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToRegistration = () => {
    // mail değiştirmek için kullanıcı verileri korunarak kayıt formuna geri dön
    navigate('/ogrenci/giris', { 
      state: { 
        returnToRegistration: true,
        userData
      }
    });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex flex-col pt-8 sm:pt-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-gray-800 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-300"></div>
            <img
              className="relative h-12 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
              src={beunLogo}
              alt="Bülent Ecevit Üniversitesi"
            />
          </div>
        </div>
        <h2 className="mt-2 text-center text-lg font-semibold text-gray-800">
          E-posta Doğrulama
        </h2>
        <p className="mt-0.5 text-center text-[10px] sm:text-[11px] text-gray-500">
          E-posta adresinize gönderilen 6 haneli doğrulama kodunu giriniz
        </p>
      </div>

      <div className="mt-5 sm:mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white py-5 px-4 shadow-md sm:rounded-xl sm:px-6 border border-gray-100 transition-all duration-300 hover:shadow-lg">
          {success ? (
            <div className="text-center py-3">
              <div className="mx-auto flex items-center justify-center h-10 w-10 rounded-full bg-green-100 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-sm leading-6 font-medium text-gray-800">Doğrulama Başarılı</h3>
              <p className="mt-1 text-[10px] text-gray-500">
                E-posta adresiniz başarıyla doğrulandı. Anasayfaya yönlendiriliyorsunuz...
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-md">
                <div className="flex">
                  <Mail className="h-3.5 w-3.5 text-blue-500 mr-1.5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] text-blue-700 font-medium">Doğrulama kodu gönderildi</p>
                    <p className="text-[10px] text-blue-600 mt-0.5">
                      <span className="font-medium">{email}</span> adresine gönderilen 6 haneli kodu giriniz.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="code-0" className="sr-only">Doğrulama Kodu</label>
                  <div className="flex justify-between items-center gap-1 sm:gap-1.5">
                    {Array(6).fill(null).map((_, index) => (
                      <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength={6}
                        value={verificationCode[index]}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="block w-9 h-11 sm:w-10 sm:h-12 py-1.5 text-center text-lg font-bold border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        autoComplete="one-time-code"
                        inputMode="numeric"
                        required
                      />
                    ))}
                  </div>
                  {error && (
                    <p className="mt-1.5 text-[10px] text-red-600 flex items-center">
                      <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-1"></span>
                      {error}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[10px] text-gray-500 space-y-1.5 sm:space-y-0">
                  <div className="flex items-center">
                    <RefreshCw className="h-3 w-3 mr-1 text-gray-400" />
                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={loading}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                      >
                        Kodu tekrar gönder
                      </button>
                    ) : (
                      <span>
                        <span className="font-medium">{formatTime(timer)}</span> sonra tekrar kod isteyebilirsiniz
                      </span>
                    )}
                  </div>
                  
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium flex items-center"
                    onClick={handleBackToRegistration}
                  >
                    <ArrowLeft className="h-3 w-3 mr-1" />
                    E-posta adresini değiştir
                  </button>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading || verificationCode.join('').length !== 6}
                    className={`
                      group relative w-full flex justify-center py-2 px-3 border border-transparent rounded-md shadow-sm text-xs font-medium text-white
                      transition-all duration-300 transform hover:translate-y-[-1px]
                      ${loading 
                        ? 'bg-gray-500 cursor-wait' 
                        : verificationCode.join('').length !== 6
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'}
                    `}
                  >
                    <span className="flex items-center">
                      {loading ? (
                        'İşleniyor...'
                      ) : (
                        <>
                          Doğrula
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OgrenciDogrulama;
