"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, X, User, Settings, LogOut, ChevronDown, Moon, Sun, Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mô phỏng trạng thái đã đăng nhập
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  
  const { language, setLanguage, t } = useLanguage();
  const langDropdownRef = useRef<HTMLDivElement>(null);
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark') || 
             window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
    }
  }, []);
  
  const pathname = usePathname();

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Đóng menu khi đổi trang
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsLangDropdownOpen(false);
    setIsMenuOpen(false);
  }, [pathname]);

  // Click outside to close language dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#121212] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">

      <header className="bg-white dark:bg-[#1a1a1a] border-b border-blue-100 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 text-blue-700 dark:text-blue-500 hover:text-blue-800 dark:hover:text-blue-400 transition-colors">
              <BookOpen className="h-8 w-8" />
              <span className="font-bold text-2xl tracking-tight">ThiThu<span className="text-blue-500 dark:text-blue-400">Pro</span></span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">{t('home')}</Link>
              <Link href="/exams" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">{t('exams')}</Link>
              <Link href="/materials" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">{t('materials')}</Link>
              <Link href="/flashcards" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">{t('flashcards')}</Link>
              <Link href="/blogs" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">{t('blog')}</Link>
            </nav>

            <div className="hidden md:flex items-center gap-2 relative">
              
              {/* Language Switcher */}
              <div className="relative" ref={langDropdownRef}>
                <button 
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-1 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 font-medium text-sm"
                >
                  <Globe className="w-5 h-5" />
                  <span className="uppercase">{language}</span>
                </button>
                
                {isLangDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden z-50">
                    <div className="py-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as any);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm ${
                            language === lang.code 
                              ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/20' 
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 mr-2"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {!isLoggedIn ? (
                <>
                  <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-4 py-2 rounded-lg font-medium transition-colors inline-block text-center">
                    {t('login')}
                  </Link>
                  <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-md shadow-blue-200 dark:shadow-none inline-block text-center">
                    {t('register')}
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 p-1.5 rounded-full transition-colors focus:outline-none"
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-100 dark:border-slate-700">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1706025090996-63717544be2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbiUyMGFzaWFufGVufDF8fHx8MTc3MzMwOTcwN3ww&ixlib=rb-4.1.0&q=80&w=1080" 
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 hidden lg:block">Nguyễn Văn A</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-slate-50 dark:border-slate-800">
                        <p className="text-sm text-slate-500 dark:text-slate-400">{t('loggedInAs')}</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">nguyenvana@example.com</p>
                      </div>
                      <div className="py-1">
                        <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400">
                          <User className="w-4 h-4 mr-2" /> {t('profile')}
                        </Link>
                        <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400">
                          <Settings className="w-4 h-4 mr-2" /> Cài đặt
                        </Link>
                      </div>
                      <div className="py-1 border-t border-slate-50 dark:border-slate-800">
                        <button 
                          onClick={() => setIsLoggedIn(false)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-left"
                        >
                          <LogOut className="w-4 h-4 mr-2" /> {t('logout')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button 
                onClick={() => {
                  const nextLang = language === 'vi' ? 'en' : language === 'en' ? 'ja' : 'vi';
                  setLanguage(nextLang);
                }}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300 font-medium text-xs uppercase"
              >
                {language}
              </button>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button 
                className="text-slate-600 dark:text-slate-300 p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#1a1a1a] border-t border-blue-50 dark:border-slate-800 px-4 py-4 space-y-4">
            <Link href="/" className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2" onClick={() => setIsMenuOpen(false)}>{t('home')}</Link>
            <Link href="/exams" className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2" onClick={() => setIsMenuOpen(false)}>{t('exams')}</Link>
            <Link href="/materials" className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2" onClick={() => setIsMenuOpen(false)}>{t('materials')}</Link>
            <Link href="/flashcards" className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2" onClick={() => setIsMenuOpen(false)}>{t('flashcards')}</Link>
            <Link href="/blogs" className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2" onClick={() => setIsMenuOpen(false)}>{t('blog')}</Link>
            <div className="pt-4 border-t border-blue-50 dark:border-slate-800 flex flex-col gap-3">
              {!isLoggedIn ? (
                <>
                  <Link href="/login" className="text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-4 py-2 rounded-lg font-medium w-full text-center block" onClick={() => setIsMenuOpen(false)}>
                    {t('login')}
                  </Link>
                  <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full text-center shadow-sm block" onClick={() => setIsMenuOpen(false)}>
                    {t('register')}
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center p-3 bg-blue-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm mr-3">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1706025090996-63717544be2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbiUyMGFzaWFufGVufDF8fHx8MTc3MzMwOTcwN3ww&ixlib=rb-4.1.0&q=80&w=1080" 
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">Nguyễn Văn A</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">nguyenvana@example.com</p>
                    </div>
                  </div>
                  <Link href="/profile" className="flex items-center px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                    <User className="w-5 h-5 mr-3 text-slate-400" /> {t('profile')}
                  </Link>
                  <button onClick={() => { setIsLoggedIn(false); setIsMenuOpen(false); }} className="flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium text-left">
                    <LogOut className="w-5 h-5 mr-3 text-red-400" /> {t('logout')}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 dark:bg-black text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-white mb-4">
              <BookOpen className="h-6 w-6 text-blue-500" />
              <span className="font-bold text-xl tracking-tight">ThiThu<span className="text-blue-500">Pro</span></span>
            </Link>
            <p className="text-sm max-w-sm mb-6 text-slate-400">
              {t('footerDesc')}
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">{t('categories')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/exams?category=english" className="hover:text-blue-400 transition-colors">{t('foreignLang')}</Link></li>
              <li><Link href="/exams?category=it" className="hover:text-blue-400 transition-colors">{t('itComp')}</Link></li>
              <li><Link href="/exams?category=business" className="hover:text-blue-400 transition-colors">{t('business')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">{t('support')}</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('userGuide')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('faq')}</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">{t('contact')}</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 text-center">
          &copy; {new Date().getFullYear()} ThiThuPro. {t('allRightsReserved')}
        </div>
      </footer>
    </div>
  );
}