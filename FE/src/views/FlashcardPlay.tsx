"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, Volume2, Maximize2, MoreVertical, X, Check, Eye, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Dữ liệu mock cho Flashcard chi tiết (Mô phỏng dữ liệu IT Passport)
const FLASHCARDS = [
  { id: 1, front: 'SLA (Service Level Agreement)', back: 'Thỏa thuận mức dịch vụ: Cam kết giữa nhà cung cấp dịch vụ IT và khách hàng về chất lượng dịch vụ (thời gian hoạt động, thời gian phản hồi,...).', hint: 'Ví dụ: Đảm bảo server uptime 99.9%.' },
  { id: 2, front: 'Agile Development', back: 'Phương pháp phát triển linh hoạt: Tập trung vào việc phát triển lặp đi lặp lại (iterations) và bàn giao phần mềm theo từng phần nhỏ, nhanh chóng.', hint: 'Trái ngược với mô hình Thác nước (Waterfall).' },
  { id: 3, front: 'RFP (Request For Proposal)', back: 'Yêu cầu đề xuất: Tài liệu mà tổ chức phát hành để yêu cầu các nhà cung cấp gửi đề xuất (giải pháp, báo giá) cho một dự án IT.', hint: 'Bước đầu tiên để chọn nhà thầu.' },
  { id: 4, front: 'BPO (Business Process Outsourcing)', back: 'Thuê ngoài quy trình kinh doanh: Giao phó một phần quy trình nghiệp vụ (ví dụ: CSKH, kế toán) cho một công ty bên ngoài.', hint: 'Giúp tập trung vào năng lực cốt lõi.' },
  { id: 5, front: 'TCO (Total Cost of Ownership)', back: 'Tổng chi phí sở hữu: Chi phí tổng cộng bao gồm chi phí mua sắm ban đầu và các chi phí vận hành, bảo trì, hỗ trợ trong suốt vòng đời của hệ thống IT.', hint: 'Không chỉ nhìn vào giá mua ban đầu.' }
];

export function FlashcardPlay() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentCard = FLASHCARDS[currentIndex];
  const progress = ((currentIndex + 1) / FLASHCARDS.length) * 100;

  const handleNext = () => {
    if (currentIndex < FLASHCARDS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setShowHint(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setShowHint(false);
    }
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 dark:bg-[#121212] py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Header điều hướng */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/flashcards" className="flex items-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-white dark:bg-[#1a1a1a] px-4 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
            <ArrowLeft className="w-5 h-5 mr-2" /> {t('backToList')}
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-700 dark:text-slate-300">IT Passport cơ bản</span>
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-bold border border-blue-200 dark:border-blue-800">
              {currentIndex + 1} / {FLASHCARDS.length}
            </span>
          </div>
        </div>

        {/* Thanh tiến độ */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 mb-8 overflow-hidden">
          <div className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Khu vực Flashcard (Lật 3D) */}
        <div className="perspective-1000 mb-8 h-[400px] w-full max-w-3xl mx-auto cursor-pointer" onClick={toggleFlip}>
          <style>{`
            .perspective-1000 { perspective: 1000px; }
            .transform-style-3d { transform-style: preserve-3d; }
            .backface-hidden { backface-visibility: hidden; }
            .rotate-y-180 { transform: rotateY(180deg); }
          `}</style>
          
          <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d shadow-xl rounded-3xl ${isFlipped ? 'rotate-y-180' : ''}`}>
            
            {/* Mặt trước (Câu hỏi / Từ vựng) */}
            <div className="absolute inset-0 w-full h-full bg-white dark:bg-[#1a1a1a] rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 backface-hidden transition-colors duration-300">
              <div className="absolute top-6 right-6 text-slate-300 dark:text-slate-600">
                <RefreshCw className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-blue-500 dark:text-blue-400 uppercase tracking-widest mb-4">{t('term')}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white text-center leading-tight">
                {currentCard.front}
              </h2>
              <p className="mt-8 text-slate-400 dark:text-slate-500 text-sm flex items-center gap-2">
                <Maximize2 className="w-4 h-4" /> {t('clickToFlip')}
              </p>
            </div>

            {/* Mặt sau (Định nghĩa / Giải nghĩa) */}
            <div className="absolute inset-0 w-full h-full bg-blue-600 dark:bg-blue-800 text-white rounded-3xl border border-blue-700 dark:border-blue-900 flex flex-col items-center justify-center p-8 backface-hidden rotate-y-180 transition-colors duration-300">
               <span className="text-sm font-semibold text-blue-200 dark:text-blue-300 uppercase tracking-widest mb-4">{t('definition')}</span>
               <p className="text-2xl md:text-3xl font-medium text-center leading-relaxed max-w-2xl">
                 {currentCard.back}
               </p>
               
               {/* Nút Hint */}
               <div className="mt-12 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                 {!showHint ? (
                   <button 
                    onClick={() => setShowHint(true)}
                    className="mx-auto flex items-center text-blue-200 dark:text-blue-300 hover:text-white transition-colors text-sm font-medium bg-white/10 dark:bg-black/20 px-4 py-2 rounded-full"
                   >
                     <Eye className="w-4 h-4 mr-2" /> {t('showHint')}
                   </button>
                 ) : (
                   <div className="bg-blue-700/50 dark:bg-black/30 p-5 rounded-2xl text-center text-blue-50 dark:text-blue-100 animate-fade-in border border-blue-500/30 dark:border-blue-500/20 backdrop-blur-sm">
                     <span className="block text-xs uppercase tracking-wider mb-2 opacity-70 font-semibold">{t('hint')}</span>
                     {currentCard.hint}
                   </div>
                 )}
               </div>
            </div>
          </div>
        </div>

        {/* Nút điều hướng (Thuộc lòng / Chưa thuộc) */}
        {isFlipped && (
          <div className="flex justify-center gap-4 max-w-xl mx-auto mb-8 animate-fade-in">
            <button 
              onClick={handleNext}
              className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-[#1a1a1a] border-2 border-red-100 dark:border-red-900/30 hover:border-red-500 dark:hover:border-red-500/50 hover:bg-red-50 dark:hover:bg-red-900/10 p-4 rounded-2xl transition-all group shadow-sm"
            >
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-2 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                <X className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <span className="font-bold text-slate-700 dark:text-slate-300">{t('notRemembered')}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 mt-1">{t('repeatLater')}</span>
            </button>
            
            <button 
              onClick={handleNext}
              className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-[#1a1a1a] border-2 border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-500 dark:hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 p-4 rounded-2xl transition-all group shadow-sm"
            >
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full mb-2 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/50 transition-colors">
                <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="font-bold text-slate-700 dark:text-slate-300">{t('remembered')}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 mt-1">{t('completed')}</span>
            </button>
          </div>
        )}

        {/* Nút điều hướng thông thường (nếu chưa lật) */}
        {!isFlipped && (
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-colors ${
                currentIndex === 0 
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
                  : 'bg-white dark:bg-[#1a1a1a] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> {t('prev')}
            </button>
            
            <button 
              onClick={toggleFlip}
              className="flex items-center px-8 py-3 bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white rounded-xl font-bold shadow-md transition-colors"
            >
              {t('flipToSeeAnswer')}
            </button>
            
            <button 
              onClick={handleNext}
              disabled={currentIndex === FLASHCARDS.length - 1}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-colors ${
                currentIndex === FLASHCARDS.length - 1 
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
                  : 'bg-white dark:bg-[#1a1a1a] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              {t('next')} <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
