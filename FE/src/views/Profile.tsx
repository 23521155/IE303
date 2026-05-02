"use client";
import React, { useState } from 'react';
import { Mail, Phone, Calendar, Clock, CheckCircle, ChevronRight, Settings, LogOut, FileText, Activity, BookOpen, ShieldCheck } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';

// Dữ liệu giả định cho lịch sử thi
const EXAM_HISTORY = [
  { id: '1', name: 'Đề thi thử TOEIC Format 2024 - Test 1', date: '12/03/2026', score: 850, maxScore: 990, correct: 170, total: 200, time: '115 phút', status: 'Hoàn thành' },
  { id: '2', name: 'Đề thi THPT Quốc Gia môn Toán 2023', date: '10/03/2026', score: 8.5, maxScore: 10, correct: 42, total: 50, time: '90 phút', status: 'Hoàn thành' },
  { id: '3', name: 'Bài kiểm tra JLPT N3 - Từ vựng & Ngữ pháp', date: '05/03/2026', score: 45, maxScore: 60, correct: 30, total: 40, time: '25 phút', status: 'Hoàn thành' },
  { id: '4', name: 'Đề thi IELTS Reading - Cambridge 18', date: '01/03/2026', score: 7.5, maxScore: 9.0, correct: 34, total: 40, time: '60 phút', status: 'Hoàn thành' }
];

export function Profile() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('history');

  // Kiểm tra xem có đang xem trang của mình hay người khác
  const isMyProfile = (!id || id === 'me' || (Array.isArray(id) && id[0] === 'me'));
  
  // Fake dữ liệu User dựa trên ID (nếu có)
  const user = isMyProfile ? {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    avatar: 'https://images.unsplash.com/photo-1706025090996-63717544be2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbiUyMGFzaWFufGVufDF8fHx8MTc3MzMwOTcwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    role: 'Học viên xuất sắc'
  } : {
    name: id === 'admin' ? 'Trần Văn B' : 'Lê Thị C',
    email: id === 'admin' ? 'admin@thithupro.com' : 'user@example.com',
    avatar: id === 'admin' 
      ? 'https://images.unsplash.com/photo-1706025090996-63717544be2d?w=150' 
      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    role: id === 'admin' ? 'Quản trị viên' : 'Thành viên'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Thông tin User */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex flex-col items-center text-center transition-colors duration-300">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-50 dark:border-gray-800 shadow-md">
                <ImageWithFallback 
                  src={user.avatar} 
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              {isMyProfile && (
                <Link href="/settings" className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full border-2 border-white dark:border-gray-800 hover:bg-blue-700 transition-colors">
                  <Settings className="w-4 h-4" />
                </Link>
              )}
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
              {user.name}
              {id === 'admin' && <ShieldCheck className="w-5 h-5 text-blue-500" />}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{isMyProfile ? t('excellentStudent') : user.role}</p>
            
            <div className="w-full space-y-4 text-left border-t border-gray-100 dark:border-gray-800 pt-6">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Mail className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                <span className="truncate">{user.email}</span>
              </div>
              {isMyProfile && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Phone className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                  <span>0987 654 321</span>
                </div>
              )}
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                <span>{t('joined')} 01/01/2026</span>
              </div>
            </div>

            {isMyProfile && (
              <div className="w-full mt-8 space-y-2">
                <Link href="/settings" className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors group">
                  <span className="flex items-center"><Settings className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-500" /> Cài đặt</span>
                </Link>
                <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group">
                  <span className="flex items-center"><LogOut className="w-4 h-4 mr-2 text-red-400 group-hover:text-red-500" /> {t('logout')}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col gap-6">
          
          {/* Thống kê nhanh */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-[#1a1a1a] p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4 transition-colors duration-300">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('completedExams')}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4 transition-colors duration-300">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-purple-600 dark:text-purple-400 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('studyHours')}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">45h</p>
              </div>
            </div>
          </div>

          {/* Tabs & Nội dung lịch sử */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex-1 transition-colors duration-300">
            <div className="flex border-b border-gray-100 dark:border-gray-800 px-6 pt-4 space-x-6 overflow-x-auto hide-scrollbar">
              <button 
                onClick={() => setActiveTab('history')}
                className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors flex items-center whitespace-nowrap ${
                  activeTab === 'history' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Activity className="w-4 h-4 mr-2" /> Hoạt động gần đây
              </button>
              {isMyProfile && (
                <button 
                  onClick={() => setActiveTab('saved')}
                  className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors flex items-center whitespace-nowrap ${
                    activeTab === 'saved' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <BookOpen className="w-4 h-4 mr-2" /> {t('savedMaterials')}
                </button>
              )}
            </div>

            <div className="p-6">
              {activeTab === 'history' && (
                <div className="space-y-4">
                  {EXAM_HISTORY.map((exam) => (
                    <div key={exam.id} className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-100 dark:hover:border-blue-900/50 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all">
                      <div className="mb-4 sm:mb-0 flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                          {exam.name}
                        </h4>
                        <div className="mt-1 flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 gap-3">
                          <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {exam.date}</span>
                          <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {exam.time}</span>
                          <span className="flex items-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full"><CheckCircle className="w-3 h-3 mr-1" /> {t('statusCompleted')}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-gray-100 dark:border-gray-800 pt-3 sm:pt-0">
                        <div className="text-left sm:text-right">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('result')}</p>
                          <p className="font-bold text-gray-900 dark:text-gray-100">
                            {exam.score} <span className="text-xs text-gray-400 font-normal">/ {exam.maxScore}</span>
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('correctCount')}</p>
                          <p className="font-bold text-gray-900 dark:text-gray-100">
                            {exam.correct} <span className="text-xs text-gray-400 font-normal">/ {exam.total}</span>
                          </p>
                        </div>
                        {isMyProfile && (
                          <Link href={`/results/${exam.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-colors hidden sm:block">
                            <ChevronRight className="w-5 h-5" />
                          </Link>
                        )}
                      </div>
                      
                      {/* Mobile view details button */}
                      {isMyProfile && (
                        <Link href={`/results/${exam.id}`} className="mt-3 w-full sm:hidden text-center text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 py-2 rounded-lg">
                          {t('viewDetailsBtn')}
                        </Link>
                      )}
                    </div>
                  ))}
                  
                  <div className="text-center pt-4">
                    <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline">
                      {t('viewAllHistory')}
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'saved' && isMyProfile && (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{t('noSavedMaterials')}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 mb-4">{t('noSavedMaterialsDesc')}</p>
                  <Link href="/materials" className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                    {t('exploreMaterials')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
