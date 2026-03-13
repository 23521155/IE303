import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, RefreshCw, Volume2, Maximize2, MoreVertical, X, Check, Eye } from 'lucide-react';

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
    <div className="min-h-[85vh] bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header điều hướng */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/flashcards" className="flex items-center text-slate-500 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
            <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại danh sách
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-700">IT Passport cơ bản</span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
              {currentIndex + 1} / {FLASHCARDS.length}
            </span>
          </div>
        </div>

        {/* Thanh tiến độ */}
        <div className="w-full bg-slate-200 rounded-full h-2.5 mb-8 overflow-hidden">
          <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
        </div>

        {/* Khu vực Flashcard (Lật 3D) */}
        <div className="perspective-1000 mb-8 h-[400px] w-full max-w-3xl mx-auto cursor-pointer" onClick={toggleFlip}>
          <style>{`
            .perspective-1000 { perspective: 1000px; }
            .transform-style-3d { transform-style: preserve-3d; }
            .backface-hidden { backface-visibility: hidden; }
            .rotate-y-180 { transform: rotateY(180deg); }
          `}</style>
          
          <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            
            {/* Mặt trước (Câu hỏi / Từ vựng) */}
            <div className="absolute inset-0 w-full h-full bg-white rounded-3xl shadow-lg border border-slate-200 flex flex-col items-center justify-center p-8 backface-hidden">
              <div className="absolute top-6 right-6 text-slate-300">
                <RefreshCw className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-blue-500 uppercase tracking-widest mb-4">Thuật ngữ</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 text-center leading-tight">
                {currentCard.front}
              </h2>
              <p className="mt-8 text-slate-400 text-sm">Nhấp để lật thẻ</p>
            </div>

            {/* Mặt sau (Định nghĩa / Giải nghĩa) */}
            <div className="absolute inset-0 w-full h-full bg-blue-600 text-white rounded-3xl shadow-lg border border-blue-700 flex flex-col items-center justify-center p-8 backface-hidden rotate-y-180">
               <span className="text-sm font-semibold text-blue-200 uppercase tracking-widest mb-4">Định nghĩa</span>
               <p className="text-2xl md:text-3xl font-medium text-center leading-relaxed max-w-2xl">
                 {currentCard.back}
               </p>
               
               {/* Nút Hint */}
               <div className="mt-12 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                 {!showHint ? (
                   <button 
                    onClick={() => setShowHint(true)}
                    className="mx-auto flex items-center text-blue-200 hover:text-white transition-colors text-sm"
                   >
                     <Eye className="w-4 h-4 mr-2" /> Hiện ví dụ / gợi ý
                   </button>
                 ) : (
                   <div className="bg-blue-700/50 p-4 rounded-xl text-center text-blue-50 animate-fade-in border border-blue-500/30">
                     <span className="block text-xs uppercase tracking-wider mb-1 opacity-70">Gợi ý</span>
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
              className="flex-1 flex flex-col items-center justify-center bg-white border-2 border-red-100 hover:border-red-500 hover:bg-red-50 p-4 rounded-2xl transition-all group shadow-sm"
            >
              <div className="bg-red-100 p-3 rounded-full mb-2 group-hover:bg-red-200 transition-colors">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <span className="font-bold text-slate-700">Chưa nhớ</span>
              <span className="text-xs text-slate-400 mt-1">Lặp lại sau</span>
            </button>
            
            <button 
              onClick={handleNext}
              className="flex-1 flex flex-col items-center justify-center bg-white border-2 border-emerald-100 hover:border-emerald-500 hover:bg-emerald-50 p-4 rounded-2xl transition-all group shadow-sm"
            >
              <div className="bg-emerald-100 p-3 rounded-full mb-2 group-hover:bg-emerald-200 transition-colors">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <span className="font-bold text-slate-700">Đã nhớ</span>
              <span className="text-xs text-slate-400 mt-1">Hoàn thành</span>
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
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
              }`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Trước
            </button>
            
            <button 
              onClick={toggleFlip}
              className="flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md transition-colors"
            >
              Lật xem đáp án
            </button>
            
            <button 
              onClick={handleNext}
              disabled={currentIndex === FLASHCARDS.length - 1}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-colors ${
                currentIndex === FLASHCARDS.length - 1 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
              }`}
            >
              Tiếp <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
