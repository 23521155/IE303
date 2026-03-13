import { useState } from "react";
import { Link } from "react-router";
import { Search, Filter, Clock, Users, Star, BookOpen, ArrowRight } from "lucide-react";
import { exams, categories } from "../data/mockData";

export function ExamList() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExams = exams.filter(exam => {
    const matchesCategory = activeCategory === "all" || exam.category === activeCategory;
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          exam.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Thư viện đề thi</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Hơn 500+ đề thi chứng chỉ quốc tế được cập nhật thường xuyên từ các nguồn uy tín.</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            
            <div className="relative flex-grow w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm đề thi, chứng chỉ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3.5 w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    activeCategory === category.id 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center text-slate-600 font-medium">
          <span>Tìm thấy <strong className="text-blue-600">{filteredExams.length}</strong> đề thi</span>
          <button className="flex items-center gap-2 hover:text-blue-600 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-sm">
            <Filter className="h-4 w-4" /> Mới nhất
          </button>
        </div>

        {filteredExams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredExams.map((exam) => (
              <div key={exam.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 group overflow-hidden flex flex-col h-full">
                <div className="relative h-40 overflow-hidden">
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={exam.image} alt={exam.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 z-20">
                    <span className="bg-white/95 backdrop-blur-sm text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {categories.find(c => c.id === exam.category)?.name}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    <Link to={`/exams/${exam.id}`}>{exam.title}</Link>
                  </h3>
                  
                  <div className="mt-auto">
                    <div className="flex flex-col gap-2 mb-5 pb-5 border-b border-slate-50">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <BookOpen className="h-4 w-4 text-blue-500" /> {exam.questionCount} câu hỏi
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="h-4 w-4 text-blue-500" /> {exam.duration} phút
                      </div>
                      <div className="flex justify-between items-center text-sm text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-blue-500" /> {exam.participants.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Star className="h-4 w-4 text-amber-400" /> {exam.rating}
                        </div>
                      </div>
                    </div>
                    
                    <Link to={`/exams/${exam.id}`} className="flex justify-between items-center w-full py-2.5 px-4 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-semibold rounded-xl transition-colors group/btn text-sm">
                      <span>Thi ngay</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Không tìm thấy kết quả</h3>
            <p className="text-slate-500 mb-6">Không có đề thi nào phù hợp với từ khóa "{searchQuery}" trong danh mục đã chọn.</p>
            <button 
              onClick={() => {setSearchQuery(""); setActiveCategory("all");}}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
}