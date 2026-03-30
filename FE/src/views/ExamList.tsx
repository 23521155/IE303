"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Clock, Users, Star, BookOpen, ArrowRight } from "lucide-react";
import { exams, categories } from "../data/mockData";
import { useLanguage } from "../contexts/LanguageContext";

export function ExamList() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { t, language } = useLanguage();

  const filteredExams = exams.filter(exam => {
    const matchesCategory = activeCategory === "all" || exam.category === activeCategory;
    
    const title = typeof exam.title === 'string' ? exam.title : exam.title[language];
    const desc = typeof exam.description === 'string' ? exam.description : exam.description[language];
    
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 dark:bg-[#121212] min-h-screen pt-10 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">{t('examLibrary')}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t('examLibDesc')}</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-10 transition-colors duration-300">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            
            <div className="relative flex-grow w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                placeholder={t('searchExams')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3.5 w-full bg-slate-50 dark:bg-[#2a2a2a] border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    activeCategory === category.id 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none" 
                      : "bg-slate-50 dark:bg-[#2a2a2a] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#333] border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {t(`cat_${category.id}`)}
                </button>
              ))}
            </div>
            
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center text-slate-600 dark:text-slate-400 font-medium">
          <span>{t('found')} <strong className="text-blue-600 dark:text-blue-400">{filteredExams.length}</strong> {t('examsCount')}</span>
          <button className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-white dark:bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm text-sm">
            <Filter className="h-4 w-4" /> {t('latest')}
          </button>
        </div>

        {filteredExams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredExams.map((exam) => (
              <div key={exam.id} className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-100 dark:hover:border-slate-700 transition-all duration-300 group overflow-hidden flex flex-col h-full">
                <div className="relative h-40 overflow-hidden">
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={exam.image} alt={typeof exam.title === 'string' ? exam.title : exam.title[language]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 z-20">
                    <span className="bg-white/95 dark:bg-black/80 backdrop-blur-sm text-blue-700 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {t(`cat_${exam.category}`)}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    <Link href={`/exams/${exam.id}`}>{typeof exam.title === 'string' ? exam.title : exam.title[language]}</Link>
                  </h3>
                  
                  <div className="mt-auto">
                    <div className="flex flex-col gap-2 mb-5 pb-5 border-b border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <BookOpen className="h-4 w-4 text-blue-500" /> {exam.questionCount} {t('questions')}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Clock className="h-4 w-4 text-blue-500" /> {exam.duration} {t('minutes')}
                      </div>
                      <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-blue-500" /> {exam.participants.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Star className="h-4 w-4 text-amber-400" /> {exam.rating}
                        </div>
                      </div>
                    </div>
                    
                    <Link href={`/exams/${exam.id}`} className="flex justify-between items-center w-full py-2.5 px-4 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white text-blue-700 dark:text-blue-400 font-semibold rounded-xl transition-colors group/btn text-sm">
                      <span>{t('takeExamNow')}</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-blue-400 dark:text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('noResults')}</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">{t('noResultsDesc')} "{searchQuery}".</p>
            <button 
              onClick={() => {setSearchQuery(""); setActiveCategory("all");}}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
            >
              {t('clearFilter')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}