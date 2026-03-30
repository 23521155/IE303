"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { exams, getExamQuestions } from "../data/mockData";
import { useLanguage } from "../contexts/LanguageContext";

export function TakeExam() {
  const { id } = useParams();
  const router = useRouter();
  const { t, language } = useLanguage();
  const exam = exams.find(e => e.id === id);
  const questions = getExamQuestions((id as string) || "");

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

  // Anti-exit warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (Object.keys(answers).length > 0 && !isSubmitting) {
        e.preventDefault();
        e.returnValue = ''; // Required for some browsers to show prompt
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [answers, isSubmitting]);

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
      router.push(`/results/${id}`);
      // Note: Passing state directly via router in Next.js App Router is not supported the same way.
      // We'll rely on global state/local storage or adjust if needed.
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('examAnswers', JSON.stringify(answers));
      }
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!exam) return <div className="p-8 text-center text-slate-700 dark:text-slate-300">{t('notFoundExam')}</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / questions.length) * 100;

  return (
    <div className="bg-slate-50 dark:bg-[#0f0f0f] min-h-screen font-sans flex flex-col transition-colors duration-300">
      {/* Top Bar */}
      <header className="bg-white dark:bg-[#1a1a1a] border-b border-blue-100 dark:border-slate-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800 dark:text-white line-clamp-1">{typeof exam.title === 'string' ? exam.title : exam.title[language as keyof typeof exam.title]}</h1>
            <span className="hidden sm:inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
              {t('question')} {currentQuestionIndex + 1}/{questions.length}
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-2 rounded-lg transition-colors duration-300 ${timeLeft < 300 ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 animate-pulse' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50'}`}>
              <Clock className="h-5 w-5" />
              {formatTime(timeLeft)}
            </div>
            <button 
              onClick={() => {
                if (window.confirm(t('confirmSubmit'))) {
                  handleSubmit();
                }
              }}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {t('submitting')}
                </span>
              ) : (
                <span className="flex items-center gap-2"><Check className="h-5 w-5"/> {t('submitExam')}</span>
              )}
            </button>
          </div>
        </div>
        <div className="h-1 bg-slate-100 dark:bg-slate-800 w-full transition-colors duration-300">
          <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </header>

      <main className="flex-grow max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 relative">
        
        {/* Main Content Area */}
        <div className="flex-grow lg:w-3/4 flex flex-col">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 flex-grow transition-colors duration-300">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg text-lg flex-shrink-0 border border-blue-100 dark:border-blue-800">
                  {t('question')} {currentQuestionIndex + 1}
                </span>
                <span className="pt-1 leading-relaxed text-slate-800 dark:text-slate-200">{currentQuestion.text}</span>
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
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm' 
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] hover:border-blue-300 dark:hover:border-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'border-blue-600 dark:border-blue-500 bg-blue-600 dark:bg-blue-500' : 'border-slate-400 dark:border-slate-600'
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
                    <span className={`text-lg ${isSelected ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
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
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#1a1a1a] text-slate-700 dark:text-slate-300 font-medium rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <ChevronLeft className="h-5 w-5" /> {t('prevQuestion')}
            </button>
            
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentQuestionIndex === questions.length - 1}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#1a1a1a] text-slate-700 dark:text-slate-300 font-medium rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {t('nextQuestion')} <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/4 flex-shrink-0">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sticky top-24 transition-colors duration-300">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg flex justify-between items-center">
              <span>{t('questionList')}</span>
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
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
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 shadow-sm ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2 dark:ring-offset-[#1a1a1a]' 
                        : isAnswered 
                          ? 'border-blue-200 dark:border-blue-800 bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 shadow-sm' 
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a1a1a] text-slate-500 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-3 text-sm text-slate-600 dark:text-slate-400">
                <div className="w-4 h-4 bg-blue-600 rounded"></div> {t('answered')}
              </div>
              <div className="flex items-center gap-3 mb-3 text-sm text-slate-600 dark:text-slate-400">
                <div className="w-4 h-4 bg-white dark:bg-[#1a1a1a] border-2 border-slate-200 dark:border-slate-700 rounded"></div> {t('unanswered')}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <div className="w-4 h-4 bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400 rounded"></div> {t('currentQuestion')}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}