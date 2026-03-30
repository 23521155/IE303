"use client";
import React, { useState } from 'react';
import { User, Shield, Bell, Save, Camera, Mail, Lock, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Settings() {
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('account');

  // Form states
  const [name, setName] = useState('Nguyễn Văn A');
  const [email, setEmail] = useState('nguyenvana@example.com');
  const [bio, setBio] = useState('Yêu thích lập trình và học ngoại ngữ.');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [marketingNotif, setMarketingNotif] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    alert('Đã lưu thay đổi thành công!');
  };

  return (
    <div className="bg-slate-50 dark:bg-[#121212] min-h-screen py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Cài đặt</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <nav className="flex flex-col p-2">
                <button
                  onClick={() => setActiveTab('account')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === 'account'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <User className="w-5 h-5" /> Tài khoản
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === 'security'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Shield className="w-5 h-5" /> Bảo mật
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === 'notifications'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Bell className="w-5 h-5" /> Thông báo
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === 'preferences'
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Globe className="w-5 h-5" /> Tuỳ chọn
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
              
              {/* --- ACCOUNT TAB --- */}
              {activeTab === 'account' && (
                <form onSubmit={handleSave} className="animate-fade-in">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Thông tin cá nhân</h2>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg">
                        <ImageWithFallback 
                          src="https://images.unsplash.com/photo-1706025090996-63717544be2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbiUyMGFzaWFufGVufDF8fHx8MTc3MzMwOTcwN3ww&ixlib=rb-4.1.0&q=80&w=1080" 
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button type="button" className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition-colors border-2 border-white dark:border-slate-800">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Ảnh đại diện</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">JPG, GIF hoặc PNG. Tối đa 5MB.</p>
                      <button type="button" className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        Đổi ảnh mới
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Họ và tên</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Giới thiệu ngắn</label>
                      <textarea 
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-md shadow-blue-200 dark:shadow-none">
                      <Save className="w-5 h-5" /> Lưu thay đổi
                    </button>
                  </div>
                </form>
              )}

              {/* --- SECURITY TAB --- */}
              {activeTab === 'security' && (
                <form onSubmit={handleSave} className="animate-fade-in">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Đổi mật khẩu</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Mật khẩu hiện tại</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Mật khẩu mới</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Xác nhận mật khẩu mới</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Xoá tài khoản</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Một khi xoá, tất cả dữ liệu lịch sử thi, flashcard sẽ bị mất vĩnh viễn và không thể khôi phục.</p>
                    <button type="button" className="px-4 py-2 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-sm font-medium transition-colors">
                      Xoá tài khoản của tôi
                    </button>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-md shadow-blue-200 dark:shadow-none">
                      <Save className="w-5 h-5" /> Cập nhật mật khẩu
                    </button>
                  </div>
                </form>
              )}

              {/* --- NOTIFICATIONS TAB --- */}
              {activeTab === 'notifications' && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Tuỳ chọn thông báo</h2>
                  
                  <div className="space-y-6">
                    {/* Item 1 */}
                    <div className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#222]">
                      <div>
                        <h4 className="text-slate-900 dark:text-white font-medium mb-1">Thông báo qua Email</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Nhận kết quả bài thi và phân tích qua email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#222]">
                      <div>
                        <h4 className="text-slate-900 dark:text-white font-medium mb-1">Thông báo đẩy (Push)</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Nhắc nhở học Flashcard mỗi ngày</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={pushNotif} onChange={() => setPushNotif(!pushNotif)} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#222]">
                      <div>
                        <h4 className="text-slate-900 dark:text-white font-medium mb-1">Cập nhật tài liệu mới</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Nhận thông báo khi có đề thi hoặc bộ từ vựng mới</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={marketingNotif} onChange={() => setMarketingNotif(!marketingNotif)} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* --- PREFERENCES TAB --- */}
              {activeTab === 'preferences' && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Tuỳ chọn hệ thống</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-medium mb-3">Ngôn ngữ hiển thị</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button 
                          onClick={() => setLanguage('vi')}
                          className={`p-4 border rounded-2xl text-center transition-all ${language === 'vi' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 text-slate-700 dark:text-slate-300'}`}
                        >
                          <span className="block font-semibold mb-1">Tiếng Việt</span>
                          <span className="text-xs opacity-80">Mặc định</span>
                        </button>
                        <button 
                          onClick={() => setLanguage('en')}
                          className={`p-4 border rounded-2xl text-center transition-all ${language === 'en' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 text-slate-700 dark:text-slate-300'}`}
                        >
                          <span className="block font-semibold mb-1">English</span>
                          <span className="text-xs opacity-80">Anh</span>
                        </button>
                        <button 
                          onClick={() => setLanguage('ja')}
                          className={`p-4 border rounded-2xl text-center transition-all ${language === 'ja' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 text-slate-700 dark:text-slate-300'}`}
                        >
                          <span className="block font-semibold mb-1">日本語</span>
                          <span className="text-xs opacity-80">Nhật</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-2xl">
                      <h4 className="text-blue-900 dark:text-blue-300 font-medium mb-1">Giao diện (Theme)</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400">Bạn có thể chuyển đổi chế độ Sáng / Tối (Light / Dark Mode) bất kỳ lúc nào bằng biểu tượng Mặt trăng / Mặt trời trên thanh menu ở góc phải trên cùng màn hình.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
