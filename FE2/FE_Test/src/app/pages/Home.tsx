import { Link } from "react-router";
import { ArrowRight, CheckCircle2, Clock, Users, Star, BrainCircuit, Globe, Code } from "lucide-react";
import { exams, categories } from "../data/mockData";

export function Home() {
  const featuredExams = exams.slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/2 left-1/2 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Vượt qua mọi kỳ thi <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">chứng chỉ quốc tế</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Nền tảng thi thử trực tuyến cung cấp các đề thi chuẩn xác, giao diện hiện đại giúp bạn làm quen và tự tin đạt điểm cao trong kỳ thi thực tế.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/exams" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                Bắt đầu thi thử <ArrowRight className="h-5 w-5" />
              </Link>
              <a href="#features" className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-sm flex items-center justify-center">
                Tìm hiểu thêm
              </a>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-500" /> Miễn phí sử dụng
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-500" /> Đề thi cập nhật liên tục
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Exams Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Đề thi nổi bật</h2>
              <p className="text-slate-600 max-w-2xl text-lg">
                Các đề thi chứng chỉ phổ biến nhất được hàng nghìn học viên lựa chọn để ôn luyện mỗi ngày.
              </p>
            </div>
            <Link to="/exams" className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1 group whitespace-nowrap">
              Xem tất cả đề thi <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExams.map((exam) => (
              <div key={exam.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 group overflow-hidden flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={exam.image} alt={exam.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {categories.find(c => c.id === exam.category)?.name}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    <Link to={`/exams/${exam.id}`}>{exam.title}</Link>
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                    {exam.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-6 pb-6 border-b border-slate-50">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-blue-500" /> {exam.duration} phút
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-blue-500" /> {exam.participants.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 text-amber-400" /> {exam.rating}
                      </div>
                    </div>
                    
                    <Link to={`/exams/${exam.id}`} className="block w-full py-3 px-4 bg-slate-50 hover:bg-blue-600 hover:text-white text-blue-600 text-center font-medium rounded-xl transition-colors">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Tại sao chọn chúng tôi?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Nền tảng được thiết kế tối ưu giúp bạn đạt điểm số cao nhất.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <BrainCircuit className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Đề thi sát thực tế</h3>
              <p className="text-slate-600 leading-relaxed">
                Ngân hàng câu hỏi khổng lồ, được cập nhật liên tục bám sát cấu trúc đề thi mới nhất của các tổ chức giáo dục.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <Globe className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Đa dạng chứng chỉ</h3>
              <p className="text-slate-600 leading-relaxed">
                Từ ngoại ngữ (IELTS, TOEIC), chứng chỉ IT (AWS, Cisco) đến các chứng chỉ chuyên ngành kế toán, tài chính.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <Code className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Giao diện thông minh</h3>
              <p className="text-slate-600 leading-relaxed">
                Môi trường thi thử giả lập 99% thực tế, đếm ngược thời gian, chấm điểm tự động và phân tích kết quả chi tiết.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-600 py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-700 rounded-full opacity-50 blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Bạn đã sẵn sàng cho kỳ thi?</h2>
          <p className="text-blue-100 text-lg mb-10">Đăng ký tài khoản miễn phí để lưu kết quả, theo dõi tiến độ học tập và mở khóa thêm nhiều đề thi chất lượng cao.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg">
              Tạo tài khoản ngay
            </button>
            <Link to="/exams" className="bg-transparent border border-blue-300 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors">
              Khám phá đề thi
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}