"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Clock, Users, Star, BookOpen, AlertCircle, FileText, CheckCircle2, ChevronLeft, ArrowRight } from "lucide-react";
import { exams, categories } from "../data/mockData";
import { useLanguage } from "../contexts/LanguageContext";

export function ExamDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { t, language } = useLanguage();
  const exam = exams.find(e => e.id === id);

  if (!exam) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#121212] transition-colors duration-300">
        <AlertCircle className="h-16 w-16 text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('notFoundExam')}</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">{t('examNotFoundDesc')}</p>
        <button onClick={() => router.push("/exams")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors">
          {t('backToList')}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-[#121212] min-h-screen py-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => router.back()} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium mb-6 transition-colors group">
          <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" /> {t('back')}
        </button>

        <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-10 transition-colors duration-300">
          <div className="relative h-64 sm:h-80 w-full">
            <img src={exam.image} alt={typeof exam.title === 'string' ? exam.title : exam.title[language as keyof typeof exam.title]} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 shadow-sm">
                {t(`cat_${exam.category}`)}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 leading-tight">{typeof exam.title === 'string' ? exam.title : exam.title[language as keyof typeof exam.title]}</h1>
            </div>
          </div>
          
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 border-b border-slate-100 dark:border-slate-800 pb-10">
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-[#222] rounded-2xl transition-colors duration-300">
                <Clock className="h-8 w-8 text-blue-500 mb-2" />
                <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t('time')}</span>
                <span className="font-bold text-slate-900 dark:text-white">{exam.duration} {t('minutes')}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-[#222] rounded-2xl transition-colors duration-300">
                <FileText className="h-8 w-8 text-blue-500 mb-2" />
                <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t('questionCount')}</span>
                <span className="font-bold text-slate-900 dark:text-white">{exam.questionCount}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-[#222] rounded-2xl transition-colors duration-300">
                <Users className="h-8 w-8 text-blue-500 mb-2" />
                <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t('participants')}</span>
                <span className="font-bold text-slate-900 dark:text-white">{exam.participants.toLocaleString()}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-[#222] rounded-2xl transition-colors duration-300">
                <Star className="h-8 w-8 text-amber-400 mb-2" />
                <span className="text-sm text-slate-500 dark:text-slate-400 mb-1">{t('rating')}</span>
                <span className="font-bold text-slate-900 dark:text-white">{exam.rating} / 5</span>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-500" /> {t('intro')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {typeof exam.description === 'string' ? exam.description : exam.description[language as keyof typeof exam.description]}
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mt-4">
                {t('introDesc')}
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6 sm:p-8 mb-10 transition-colors duration-300">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-500" /> {t('examNotice')}
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-500 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{t('notice1')}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-500 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{t('notice2')}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-500 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{t('notice3')}</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <Link 
                href={`/take-exam/${exam.id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-blue-200 dark:shadow-none hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto text-center flex items-center justify-center gap-3"
              >
                {t('startDoingExam')} <ArrowRight className="h-6 w-6" />
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}