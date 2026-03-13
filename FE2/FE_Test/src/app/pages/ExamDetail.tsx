import { Link, useParams, useNavigate } from "react-router";
import { Clock, Users, Star, BookOpen, AlertCircle, FileText, CheckCircle2, ChevronLeft, ArrowRight } from "lucide-react";
import { exams, categories } from "../data/mockData";

export function ExamDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const exam = exams.find(e => e.id === id);

  if (!exam) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <AlertCircle className="h-16 w-16 text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Không tìm thấy đề thi</h2>
        <p className="text-slate-600 mb-6">Đề thi bạn yêu cầu không tồn tại hoặc đã bị xóa.</p>
        <button onClick={() => navigate("/exams")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors">
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium mb-6 transition-colors group">
          <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" /> Quay lại
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-10">
          <div className="relative h-64 sm:h-80 w-full">
            <img src={exam.image} alt={exam.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 shadow-sm">
                {categories.find(c => c.id === exam.category)?.name}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 leading-tight">{exam.title}</h1>
            </div>
          </div>
          
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 border-b border-slate-100 pb-10">
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl">
                <Clock className="h-8 w-8 text-blue-500 mb-2" />
                <span className="text-sm text-slate-500 mb-1">Thời gian</span>
                <span className="font-bold text-slate-900">{exam.duration} phút</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl">
                <FileText className="h-8 w-8 text-blue-500 mb-2" />
                <span className="text-sm text-slate-500 mb-1">Số câu hỏi</span>
                <span className="font-bold text-slate-900">{exam.questionCount}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl">
                <Users className="h-8 w-8 text-blue-500 mb-2" />
                <span className="text-sm text-slate-500 mb-1">Lượt thi</span>
                <span className="font-bold text-slate-900">{exam.participants.toLocaleString()}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl">
                <Star className="h-8 w-8 text-amber-400 mb-2" />
                <span className="text-sm text-slate-500 mb-1">Đánh giá</span>
                <span className="font-bold text-slate-900">{exam.rating} / 5</span>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600" /> Giới thiệu chung
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {exam.description}
              </p>
              <p className="text-slate-600 leading-relaxed text-lg mt-4">
                Đề thi được biên soạn kỹ lưỡng bởi đội ngũ chuyên gia, mô phỏng hoàn toàn cấu trúc, độ khó và thời gian của kỳ thi thật. Hoàn thành bài thi giúp bạn đánh giá năng lực hiện tại, làm quen với áp lực phòng thi và tối ưu hóa điểm số.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 sm:p-8 mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-blue-600" /> Lưu ý trước khi làm bài
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-500 flex-shrink-0" />
                  <span className="text-slate-700">Hãy chuẩn bị môi trường yên tĩnh, đảm bảo kết nối internet ổn định để không làm gián đoạn bài làm.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-500 flex-shrink-0" />
                  <span className="text-slate-700">Khi ấn nút <strong>"Bắt đầu thi"</strong>, thời gian sẽ lập tức đếm ngược và không thể tạm dừng.</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-500 flex-shrink-0" />
                  <span className="text-slate-700">Bài thi sẽ tự động nộp khi hết thời gian quy định hoặc khi bạn chọn nút nộp bài.</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <Link 
                to={`/take-exam/${exam.id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto text-center flex items-center justify-center gap-3"
              >
                Bắt đầu làm bài <ArrowRight className="h-6 w-6" />
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}