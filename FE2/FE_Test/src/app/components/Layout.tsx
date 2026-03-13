import { Outlet, Link, useLocation } from "react-router";
import { BookOpen, Menu, X, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mô phỏng trạng thái đã đăng nhập
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  // Đóng menu khi đổi trang
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <header className="bg-white border-b border-blue-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 text-blue-700 hover:text-blue-800 transition-colors">
              <BookOpen className="h-8 w-8" />
              <span className="font-bold text-2xl tracking-tight">ThiThu<span className="text-blue-500">Pro</span></span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Trang Chủ</Link>
              <Link to="/exams" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Đề Thi</Link>
              <Link to="/materials" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Tài Liệu</Link>
              <Link to="/flashcards" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Flashcard</Link>
            </nav>

            <div className="hidden md:flex items-center gap-4 relative">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors inline-block text-center">
                    Đăng Nhập
                  </Link>
                  <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-md shadow-blue-200 inline-block text-center">
                    Đăng Ký
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 hover:bg-slate-50 p-1.5 rounded-full transition-colors focus:outline-none"
                  >
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-100">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1706025090996-63717544be2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbiUyMGFzaWFufGVufDF8fHx8MTc3MzMwOTcwN3ww&ixlib=rb-4.1.0&q=80&w=1080" 
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-700 hidden lg:block">Nguyễn Văn A</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-slate-50">
                        <p className="text-sm text-slate-500">Đăng nhập dưới tên</p>
                        <p className="text-sm font-semibold text-slate-900 truncate">nguyenvana@example.com</p>
                      </div>
                      <div className="py-1">
                        <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                          <User className="w-4 h-4 mr-2" /> Hồ sơ cá nhân
                        </Link>
                        <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                          <Settings className="w-4 h-4 mr-2" /> Cài đặt tài khoản
                        </Link>
                      </div>
                      <div className="py-1 border-t border-slate-50">
                        <button 
                          onClick={() => setIsLoggedIn(false)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                        >
                          <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button 
              className="md:hidden text-slate-600 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-blue-50 px-4 py-4 space-y-4">
            <Link to="/" className="block text-slate-600 hover:text-blue-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Trang Chủ</Link>
            <Link to="/exams" className="block text-slate-600 hover:text-blue-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Đề Thi</Link>
            <Link to="/materials" className="block text-slate-600 hover:text-blue-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Tài Liệu</Link>
            <Link to="/flashcards" className="block text-slate-600 hover:text-blue-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>Flashcard</Link>
            <div className="pt-4 border-t border-blue-50 flex flex-col gap-3">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="text-blue-600 border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium w-full text-center block" onClick={() => setIsMenuOpen(false)}>
                    Đăng Nhập
                  </Link>
                  <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium w-full text-center shadow-sm block" onClick={() => setIsMenuOpen(false)}>
                    Đăng Ký
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm mr-3">
                      <ImageWithFallback 
                        src="https://images.unsplash.com/photo-1706025090996-63717544be2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbiUyMGFzaWFufGVufDF8fHx8MTc3MzMwOTcwN3ww&ixlib=rb-4.1.0&q=80&w=1080" 
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">Nguyễn Văn A</p>
                      <p className="text-xs text-slate-500">nguyenvana@example.com</p>
                    </div>
                  </div>
                  <Link to="/profile" className="flex items-center px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>
                    <User className="w-5 h-5 mr-3 text-slate-400" /> Hồ sơ cá nhân
                  </Link>
                  <button onClick={() => { setIsLoggedIn(false); setIsMenuOpen(false); }} className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium text-left">
                    <LogOut className="w-5 h-5 mr-3 text-red-400" /> Đăng xuất
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-white mb-4">
              <BookOpen className="h-6 w-6 text-blue-500" />
              <span className="font-bold text-xl tracking-tight">ThiThu<span className="text-blue-500">Pro</span></span>
            </Link>
            <p className="text-sm max-w-sm mb-6 text-slate-400">
              Nền tảng luyện thi trực tuyến hàng đầu với kho đề thi đa dạng, chất lượng cao giúp bạn đạt kết quả tốt nhất trong các kỳ thi chứng chỉ quốc tế.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Danh mục</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/exams?category=english" className="hover:text-blue-400 transition-colors">Ngoại Ngữ</Link></li>
              <li><Link to="/exams?category=it" className="hover:text-blue-400 transition-colors">Công Nghệ Thông Tin</Link></li>
              <li><Link to="/exams?category=business" className="hover:text-blue-400 transition-colors">Kinh Doanh</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Hỗ trợ</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Hướng dẫn sử dụng</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Liên hệ</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 text-center">
          &copy; {new Date().getFullYear()} ThiThuPro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}