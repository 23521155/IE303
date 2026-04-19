"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Award, BarChart3, Clock, RotateCcw, Home, FileText } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function ExamResult() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [exam, setExam] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [combinedResults, setCombinedResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResultAndQuestions = async () => {
      try {
        setLoading(true);

        const resultRes = await fetch(`http://localhost:8080/api/attempts/${id}`, {
          credentials: 'include'
        });

        if (!resultRes.ok) throw new Error("Không tìm thấy kết quả thi");
        const attemptData = await resultRes.json();

        const examId = attemptData.exam.id;

        const questionsRes = await fetch(`http://localhost:8080/api/exams/${examId}/questions`, {
          credentials: 'include'
        });

        if (!questionsRes.ok) throw new Error("Không tải được chi tiết câu hỏi");
        const questionsData = await questionsRes.json();

        const userAnswers = attemptData.answers;

        const mergedData = questionsData.map((originalQuestion: any) => {
          const matchedAnswer = userAnswers.find((ans: any) => ans.questionId === originalQuestion.id);

          return {
            ...originalQuestion,
            userAnswer: matchedAnswer ? matchedAnswer.selectedOption : null,
            isCorrect: matchedAnswer ? matchedAnswer.isCorrect : false
          };
        });

        setExam(attemptData.exam);
        setScore(attemptData.score);
        setCombinedResults(mergedData);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResultAndQuestions();
    }
  }, [id]);

  if (loading) return <div className="p-8 text-center text-slate-700 dark:text-slate-300">Đang tải kết quả...</div>;
  if (error || !exam) return <div className="p-8 text-center text-red-500">{error || t('examResultNotFound')}</div>;

  const totalQuestions = combinedResults.length;
  const correctCount = combinedResults.filter(q => q.isCorrect).length;
  const wrongCount = totalQuestions - correctCount;

  return (
    <div className="bg-slate-50 dark:bg-[#121212] min-h-screen py-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Score Card */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-10 transition-colors duration-300">
          <div className="bg-blue-600 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-700 rounded-full opacity-50 blur-2xl"></div>
            
            <Award className="h-20 w-20 text-yellow-300 mx-auto mb-4 relative z-10 drop-shadow-md" />
            <h1 className="text-3xl font-bold text-white mb-2 relative z-10">{t('examCompleted')}</h1>
            <p className="text-blue-100 text-lg relative z-10 opacity-90">{typeof exam.title === 'string' ? exam.title : exam.title[language as keyof typeof exam.title]}</p>
          </div>
          
          <div className="p-8 sm:p-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="10" />
                  <circle 
                    cx="50" cy="50" r="45" fill="none" 
                    stroke={score >= 80 ? "#22c55e" : score >= 50 ? "#eab308" : "#ef4444"} 
                    strokeWidth="10" 
                    strokeDasharray="283" 
                    strokeDashoffset={283 - (283 * score) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute text-center flex flex-col items-center justify-center inset-0">
                  <span className="text-5xl font-extrabold text-slate-800 dark:text-white tracking-tighter">{score}</span>
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">{t('scoreLabel')}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 w-full md:w-auto">
                <div className="bg-slate-50 dark:bg-[#222] p-6 rounded-2xl flex flex-col items-center justify-center border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                  <CheckCircle2 className="h-10 w-10 text-green-500 mb-3" />
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">{correctCount}</span>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('correctAnswers')}</span>
                </div>
                <div className="bg-slate-50 dark:bg-[#222] p-6 rounded-2xl flex flex-col items-center justify-center border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                  <XCircle className="h-10 w-10 text-red-500 mb-3" />
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">{wrongCount}</span>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('wrongAnswers')}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center border-t border-slate-100 dark:border-slate-800 pt-10">
              <Link href={`/take-exam/${exam.id}`} className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-[#222] hover:bg-slate-200 dark:hover:bg-[#333] text-slate-700 dark:text-slate-300 px-6 py-4 rounded-xl font-semibold transition-colors shadow-sm">
                <RotateCcw className="h-5 w-5" /> {t('retry')}
              </Link>
              <button 
                onClick={() => {
                  document.getElementById('review-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-lg shadow-blue-200 dark:shadow-none"
              >
                <FileText className="h-5 w-5" /> {t('viewDetailsBtn')}
              </button>
              <Link href="/exams" className="flex items-center justify-center gap-2 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white px-6 py-4 rounded-xl font-semibold transition-colors shadow-sm">
                <Home className="h-5 w-5" /> {t('backToList')}
              </Link>
            </div>
          </div>
        </div>

        {/* Review Answers */}
        <div id="review-section" className="bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
          <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#222] transition-colors duration-300">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <BarChart3 className="h-7 w-7 text-blue-600 dark:text-blue-500" /> {t('reviewAnswers')}
            </h2>
          </div>
          
          <div className="p-6 sm:p-8 space-y-10">
            {combinedResults.map((q, index) => (
              <div key={q.id} className="border-b border-slate-100 dark:border-slate-800 pb-10 last:border-0 last:pb-0">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex gap-3 items-start">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    q.isCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="pt-1">{q.text}</span>
                </h3>
                
                <div className="space-y-3 pl-11">
                  {q.options.map((option: string, optIndex: number) => {
                    const isSelected = q.userAnswer === optIndex;
                    const isCorrectOption = q.correctAnswer === optIndex;
                    
                    let bgClass = "bg-white dark:bg-[#222] border-slate-200 dark:border-slate-700";
                    let textClass = "text-slate-700 dark:text-slate-300";
                    let icon: React.ReactNode = null;
                    
                    if (isCorrectOption) {
                      bgClass = "bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-600/50";
                      textClass = "text-green-800 dark:text-green-400 font-medium";
                      icon = <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400 ml-auto" />;
                    } else if (isSelected && !isCorrectOption) {
                      bgClass = "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800/50";
                      textClass = "text-red-800 dark:text-red-400";
                      icon = <XCircle className="h-5 w-5 text-red-500 dark:text-red-400 ml-auto" />;
                    }

                    return (
                      <div key={optIndex} className={`p-4 rounded-xl border flex items-center gap-3 transition-colors ${bgClass}`}>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected ? (isCorrectOption ? 'border-green-600 bg-green-600' : 'border-red-600 bg-red-600') : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-transparent'
                        }`}>
                          {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                        </div>
                        <span className={textClass}>{option}</span>
                        {icon}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}