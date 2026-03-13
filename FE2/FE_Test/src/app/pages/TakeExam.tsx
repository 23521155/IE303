import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Clock, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { exams, getExamQuestions } from "../data/mockData";

export function TakeExam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const exam = exams.find(e => e.id === id);
  const questions = getExamQuestions(id || "");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState((exam?.duration || 60) * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!exam) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [exam]);

  const handleAnswer = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      navigate(`/results/${id}`, { state: { answers, questions } });
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!exam) return <div className="p-8 text-center">Đang tải...</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / questions.length) * 100;

  return (
    <div className="bg-slate-50 min-h-screen font-sans flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-blue-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800 line-clamp-1">{exam.title}</h1>
            <span className="hidden sm:inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
              Câu {currentQuestionIndex + 1}/{questions.length}
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-2 rounded-lg ${timeLeft < 300 ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
              <Clock className="h-5 w-5" />
              {formatTime(timeLeft)}
            </div>
            <button 
              onClick={() => {
                if (window.confirm("Bạn có chắc chắn muốn nộp bài ngay bây giờ?")) {
                  handleSubmit();
                }
              }}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Đang nộp...
                </span>
              ) : (
                <span className="flex items-center gap-2"><Check className="h-5 w-5"/> Nộp bài</span>
              )}
            </button>
          </div>
        </div>
        <div className="h-1 bg-slate-100 w-full">
          <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </header>

      <main className="flex-grow max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 relative">
        
        {/* Main Content Area */}
        <div className="flex-grow lg:w-3/4 flex flex-col">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex-grow">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-start gap-3">
                <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-lg text-lg flex-shrink-0 border border-blue-100">
                  Câu {currentQuestionIndex + 1}
                </span>
                <span className="pt-1 leading-relaxed text-slate-800">{currentQuestion.text}</span>
              </h2>
            </div>
            
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers[currentQuestion.id] === index;
                return (
                  <label 
                    key={index}
                    className={`block w-full p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-4 ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50 shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-400'
                    }`}>
                      {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                    </div>
                    <input 
                      type="radio" 
                      name={`question-${currentQuestion.id}`}
                      value={index}
                      checked={isSelected}
                      onChange={() => handleAnswer(currentQuestion.id, index)}
                      className="sr-only"
                    />
                    <span className={`text-lg ${isSelected ? 'font-medium text-slate-900' : 'text-slate-700'}`}>
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <ChevronLeft className="h-5 w-5" /> Câu trước
            </button>
            
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentQuestionIndex === questions.length - 1}
              className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Câu sau <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/4 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
            <h3 className="font-bold text-slate-900 mb-6 text-lg flex justify-between items-center">
              <span>Danh sách câu hỏi</span>
              <span className="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {answeredCount}/{questions.length}
              </span>
            </h3>
            
            <div className="grid grid-cols-5 gap-3 max-h-[60vh] overflow-y-auto pr-2 pb-2 hide-scrollbar">
              {questions.map((q, index) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCurrent = currentQuestionIndex === index;
                
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`w-full aspect-square flex items-center justify-center rounded-lg text-sm font-semibold transition-all border-2 ${
                      isCurrent 
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm ring-2 ring-blue-500 ring-offset-2' 
                        : isAnswered 
                          ? 'border-blue-200 bg-blue-600 text-white hover:bg-blue-700 shadow-sm' 
                          : 'border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-3 text-sm text-slate-600">
                <div className="w-4 h-4 bg-blue-600 rounded"></div> Đã trả lời
              </div>
              <div className="flex items-center gap-3 mb-3 text-sm text-slate-600">
                <div className="w-4 h-4 bg-white border-2 border-slate-200 rounded"></div> Chưa trả lời
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-4 h-4 bg-blue-50 border-2 border-blue-500 rounded"></div> Đang làm
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}