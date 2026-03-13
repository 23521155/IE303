import { useLocation, useParams, Link } from "react-router";
import { CheckCircle2, XCircle, Award, BarChart3, Clock, RotateCcw, Home, FileText } from "lucide-react";
import { exams, getExamQuestions } from "../data/mockData";

export function ExamResult() {
  const { id } = useParams();
  const location = useLocation();
  const exam = exams.find(e => e.id === id);
  const questions = getExamQuestions(id || "");
  
  // Provide mock data if accessed directly without state
  const mockAnswers = Array.from({ length: 10 }).reduce((acc, _, i) => ({ ...acc, [`q${i + 1}`]: Math.floor(Math.random() * 4) }), {});
  const answers = location.state?.answers || mockAnswers;

  let correctCount = 0;
  const detailedResults = questions.map(q => {
    const isCorrect = answers[q.id] === q.correctAnswer;
    if (isCorrect) correctCount++;
    return { ...q, isCorrect, userAnswer: answers[q.id] };
  });

  const score = Math.round((correctCount / questions.length) * 100);
  
  if (!exam) return <div className="p-8 text-center">Không tìm thấy kết quả</div>;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Score Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-10">
          <div className="bg-blue-600 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500 rounded-full opacity-50 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-700 rounded-full opacity-50 blur-2xl"></div>
            
            <Award className="h-20 w-20 text-yellow-300 mx-auto mb-4 relative z-10 drop-shadow-md" />
            <h1 className="text-3xl font-bold text-white mb-2 relative z-10">Hoàn thành bài thi!</h1>
            <p className="text-blue-100 text-lg relative z-10 opacity-90">{exam.title}</p>
          </div>
          
          <div className="p-8 sm:p-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="10" />
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
                  <span className="text-5xl font-extrabold text-slate-800 tracking-tighter">{score}</span>
                  <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1">Điểm</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 w-full md:w-auto">
                <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center border border-slate-100">
                  <CheckCircle2 className="h-10 w-10 text-green-500 mb-3" />
                  <span className="text-3xl font-bold text-slate-900">{correctCount}</span>
                  <span className="text-sm font-medium text-slate-500">Câu đúng</span>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center justify-center border border-slate-100">
                  <XCircle className="h-10 w-10 text-red-500 mb-3" />
                  <span className="text-3xl font-bold text-slate-900">{questions.length - correctCount}</span>
                  <span className="text-sm font-medium text-slate-500">Câu sai</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center border-t border-slate-100 pt-10">
              <Link to={`/take-exam/${exam.id}`} className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-4 rounded-xl font-semibold transition-colors shadow-sm">
                <RotateCcw className="h-5 w-5" /> Làm lại
              </Link>
              <button 
                onClick={() => {
                  document.getElementById('review-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-colors shadow-lg shadow-blue-200"
              >
                <FileText className="h-5 w-5" /> Xem chi tiết
              </button>
              <Link to="/exams" className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-6 py-4 rounded-xl font-semibold transition-colors shadow-sm">
                <Home className="h-5 w-5" /> Trở về danh sách
              </Link>
            </div>
          </div>
        </div>

        {/* Review Answers */}
        <div id="review-section" className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <BarChart3 className="h-7 w-7 text-blue-600" /> Xem lại bài làm
            </h2>
          </div>
          
          <div className="p-6 sm:p-8 space-y-10">
            {detailedResults.map((q, index) => (
              <div key={q.id} className="border-b border-slate-100 pb-10 last:border-0 last:pb-0">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex gap-3 items-start">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    q.isCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="pt-1">{q.text}</span>
                </h3>
                
                <div className="space-y-3 pl-11">
                  {q.options.map((option, optIndex) => {
                    const isSelected = q.userAnswer === optIndex;
                    const isCorrectOption = q.correctAnswer === optIndex;
                    
                    let bgClass = "bg-white border-slate-200";
                    let textClass = "text-slate-700";
                    let icon = null;
                    
                    if (isCorrectOption) {
                      bgClass = "bg-green-50 border-green-500";
                      textClass = "text-green-800 font-medium";
                      icon = <CheckCircle2 className="h-5 w-5 text-green-500 ml-auto" />;
                    } else if (isSelected && !isCorrectOption) {
                      bgClass = "bg-red-50 border-red-300";
                      textClass = "text-red-800";
                      icon = <XCircle className="h-5 w-5 text-red-500 ml-auto" />;
                    }

                    return (
                      <div key={optIndex} className={`p-4 rounded-xl border flex items-center gap-3 transition-colors ${bgClass}`}>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected ? (isCorrectOption ? 'border-green-600 bg-green-600' : 'border-red-600 bg-red-600') : 'border-slate-300 bg-white'
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