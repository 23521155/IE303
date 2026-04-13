"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Users, Star, BrainCircuit, Globe, Code } from "lucide-react";
import { exams, categories } from "../data/mockData";
import { useLanguage } from "../contexts/LanguageContext";

export function Home() {
  const featuredExams = exams.slice(0, 3);
  const { t, language } = useLanguage();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 dark:from-slate-900/50 to-white dark:to-[#121212] transition-colors duration-300">
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-200 dark:bg-blue-800/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/2 left-1/2 w-96 h-96 bg-blue-50 dark:bg-blue-950/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
              {t('heroTitle1')} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">{t('heroTitle2')}</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('heroDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/exams" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-200 dark:shadow-none hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                {t('startExam')} <ArrowRight className="h-5 w-5" />
              </Link>
              <a href="#features" className="bg-white dark:bg-[#1a1a1a] hover:bg-slate-50 dark:hover:bg-[#222] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-sm flex items-center justify-center">
                {t('learnMore')}
              </a>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-500" /> {t('freeToUse')}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-500" /> {t('updatedExams')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Exams Section */}
      <section className="py-20 bg-white dark:bg-[#121212] border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('featuredExams')}</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
                {t('featuredDesc')}
              </p>
            </div>
            <Link href="/exams" className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 group whitespace-nowrap">
              {t('viewAllExams')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExams.map((exam) => (
              <div key={exam.id} className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-100 dark:hover:border-slate-700 transition-all duration-300 group overflow-hidden flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={exam.image} alt={typeof exam.title === 'string' ? exam.title : exam.title[language as keyof typeof exam.title]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/90 dark:bg-black/80 backdrop-blur-sm text-blue-700 dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {t(`cat_${exam.category}`)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    <Link href={`/exams/${exam.id}`}>{typeof exam.title === 'string' ? exam.title : exam.title[language]}</Link>
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2">
                    {typeof exam.description === 'string' ? exam.description : exam.description[language]}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-6 pb-6 border-b border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-blue-500" /> {exam.duration} {t('minutes')}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-blue-500" /> {exam.participants.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 text-amber-400" /> {exam.rating}
                      </div>
                    </div>
                    
                    <Link href={`/exams/${exam.id}`} className="block w-full py-3 px-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-400 text-center font-medium rounded-xl transition-colors">
                      {t('viewDetails')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50 dark:bg-[#0f0f0f] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('whyChooseUs')}</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">{t('whyDesc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                <BrainCircuit className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('feat1Title')}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('feat1Desc')}
              </p>
            </div>
            
            <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                <Globe className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('feat2Title')}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('feat2Desc')}
              </p>
            </div>
            
            <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                <Code className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t('feat3Title')}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('feat3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-600 dark:bg-blue-800 py-20 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500 dark:bg-blue-600 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-700 dark:bg-blue-900 rounded-full opacity-50 blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('readyForExam')}</h2>
          <p className="text-blue-100 text-lg mb-10">{t('readyDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 dark:text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-lg">
              {t('createAccount')}
            </button>
            <Link href="/exams" className="bg-transparent border border-blue-300 dark:border-blue-400 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors">
              {t('exploreExams')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}