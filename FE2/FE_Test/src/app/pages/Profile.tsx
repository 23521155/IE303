import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Clock, Award, CheckCircle, ChevronRight, Settings, LogOut, FileText, Activity, BookOpen } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router';

// D��� liệu giả định cho lịch sử thi
const EXAM_HISTORY = [
  { id: '1', name: 'Đề thi thử TOEIC Format 2024 - Test 1', date: '12/03/2026', score: 850, maxScore: 990, correct: 170, total: 200, time: '115 phút', status: 'Hoàn thành' },
  { id: '2', name: 'Đề thi THPT Quốc Gia môn Toán 2023', date: '10/03/2026', score: 8.5, maxScore: 10, correct: 42, total: 50, time: '90 phút', status: 'Hoàn thành' },
  { id: '3', name: 'Bài kiểm tra JLPT N3 - Từ vựng & Ngữ pháp', date: '05/03/2026', score: 45, maxScore: 60, correct: 30, total: 40, time: '25 phút', status: 'Hoàn thành' },
  { id: '4', name: 'Đề thi IELTS Reading - Cambridge 18', date: '01/03/2026', score: 7.5, maxScore: 9.0, correct: 34, total: 40, time: '60 phút', status: 'Hoàn thành' }
];

export function Profile() {
  const [activeTab, setActiveTab] = useState('history');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Thông tin User */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-50 shadow-md">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1706025090996-63717544be2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMG1hbiUyMGFzaWFufGVufDF8fHx8MTc3MzMwOTcwN3ww&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full border-2 border-white hover:bg-blue-700 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900">Nguyễn Văn A</h2>
            <p className="text-sm text-gray-500 mb-6">Học viên tiêu biểu</p>
            
            <div className="w-full space-y-4 text-left border-t border-gray-100 pt-6">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-3 text-gray-400" />
                <span className="truncate">nguyenvana@example.com</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-3 text-gray-400" />
                <span>0987 654 321</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                <span>Tham gia: 01/01/2026</span>
              </div>
            </div>

            <div className="w-full mt-8 space-y-2">
              <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group">
                <span className="flex items-center"><Settings className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue-500" /> Cài đặt tài khoản</span>
              </button>
              <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors group">
                <span className="flex items-center"><LogOut className="w-4 h-4 mr-2 text-red-400 group-hover:text-red-500" /> Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col gap-6">
          
          {/* Thống kê nhanh */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Đã làm</p>
                <p className="text-xl font-bold text-gray-900">12 đề</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="bg-emerald-50 p-3 rounded-lg text-emerald-600">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tỉ lệ đúng</p>
                <p className="text-xl font-bold text-gray-900">78%</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="bg-purple-50 p-3 rounded-lg text-purple-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Giờ ôn luyện</p>
                <p className="text-xl font-bold text-gray-900">45h</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="bg-amber-50 p-3 rounded-lg text-amber-600">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Điểm TB</p>
                <p className="text-xl font-bold text-gray-900">8.2</p>
              </div>
            </div>
          </div>

          {/* Tabs & Nội dung */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1">
            <div className="flex border-b border-gray-100 px-6 pt-4 space-x-6">
              <button 
                onClick={() => setActiveTab('history')}
                className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors flex items-center ${
                  activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Activity className="w-4 h-4 mr-2" /> Lịch sử thi
              </button>
              <button 
                onClick={() => setActiveTab('saved')}
                className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors flex items-center ${
                  activeTab === 'saved' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <BookOpen className="w-4 h-4 mr-2" /> Tài liệu đã lưu
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'history' && (
                <div className="space-y-4">
                  {EXAM_HISTORY.map((exam) => (
                    <div key={exam.id} className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all">
                      <div className="mb-4 sm:mb-0 flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {exam.name}
                        </h4>
                        <div className="mt-1 flex flex-wrap items-center text-xs text-gray-500 gap-3">
                          <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {exam.date}</span>
                          <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {exam.time}</span>
                          <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full"><CheckCircle className="w-3 h-3 mr-1" /> {exam.status}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                        <div className="text-left sm:text-right">
                          <p className="text-sm font-medium text-gray-500">Kết quả</p>
                          <p className="font-bold text-gray-900">
                            {exam.score} <span className="text-xs text-gray-400 font-normal">/ {exam.maxScore}</span>
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-sm font-medium text-gray-500">Số câu đúng</p>
                          <p className="font-bold text-gray-900">
                            {exam.correct} <span className="text-xs text-gray-400 font-normal">/ {exam.total}</span>
                          </p>
                        </div>
                        <Link to={`/results/${exam.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-full transition-colors hidden sm:block">
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      </div>
                      
                      {/* Mobile view details button */}
                      <Link to={`/results/${exam.id}`} className="mt-3 w-full sm:hidden text-center text-sm font-medium text-blue-600 bg-blue-50 py-2 rounded-lg">
                        Xem chi tiết
                      </Link>
                    </div>
                  ))}
                  
                  <div className="text-center pt-4">
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
                      Xem tất cả lịch sử
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'saved' && (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900">Chưa có tài liệu nào</h3>
                  <p className="text-gray-500 mt-1 mb-4">Bạn chưa lưu tài liệu học tập nào vào danh sách.</p>
                  <Link to="/materials" className="inline-flex items-center text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                    Khám phá tài liệu
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
