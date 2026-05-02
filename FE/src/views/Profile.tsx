"use client";
import React, { useEffect, useState } from 'react';
import { Mail, Phone, Calendar, Clock, CheckCircle, ChevronRight, Settings, LogOut, FileText, Activity, BookOpen } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import { BE_URL } from '../utils/constans';
import { logoutAction } from '@/src/actions/authActions';
import { useMe } from '@/src/hooks/useMe';

type AttemptListItem = {
  id: string;
  examId: string;
  examTitle: Record<string, string> | null;
  score: number;
  totalCorrect: number;
  questionCount: number;
  timeSpentSeconds: number;
  createdAt: string;
};

type ProfileSummary = {
  completedCount: number;
  totalPracticeSeconds: number;
  recentAttempts: AttemptListItem[];
};

type ProfileApiUser = {
  id: number;
  name: string;
  phoneNumber?: string | null;
  currentStatus?: string | null;
  email?: string | null;
  createdAt?: string | null;
};

function avatarFromName(name: string): string {
  const seed = encodeURIComponent(name.trim() || '?');
  return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
}

function pickExamTitle(title: Record<string, string> | null | undefined, lang: string): string {
  if (!title) return '';
  const key = lang in title ? lang : 'vi';
  return title[key] || title.vi || title.en || Object.values(title)[0] || '';
}

function formatPracticeHours(totalSeconds: number): string {
  const h = Math.round((totalSeconds / 3600) * 10) / 10;
  return `${h}h`;
}

function formatDurationSeconds(seconds: number, lang: string): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (lang === 'en') {
    return m > 0 ? `${m} min${s ? ` ${s}s` : ''}` : `${s}s`;
  }
  if (lang === 'ja') {
    return m > 0 ? `${m}分${s ? `${s}秒` : ''}` : `${s}秒`;
  }
  return m > 0 ? `${m} phút${s ? ` ${s}s` : ''}` : `${s} giây`;
}

function getExamMaxScore(examId: string): number {
  if (!examId) return 100;
  const lowerId = examId.toLowerCase();
  if (lowerId.includes('it-passport') || lowerId.includes('fe') || lowerId.includes('sg')) {
    return 1000;
  }
  return 100;
}

export function Profile({ t, lang }: { t: any; lang: string }) {
  const params = useParams<{ lang?: string; id?: string | string[] }>();
  const router = useRouter();
  const { setUser } = useMe();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const language = lang;

  const [activeTab, setActiveTab] = useState('history');
  const [summary, setSummary] = useState<ProfileSummary | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [profileUser, setProfileUser] = useState<ProfileApiUser | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Kiểm tra xem có đang xem trang của mình hay người khác
  const isMyProfile = !id || id === 'me';
  const numericUserId =
    typeof id === 'string' && /^\d+$/.test(id) ? Number.parseInt(id, 10) : null;

  useEffect(() => {
    let cancelled = false;
    async function loadProfile() {
      setProfileLoading(true);
      setProfileError(null);
      try {
        if (isMyProfile) {
          const res = await fetch(`${BE_URL}/api/users/me`, { credentials: 'include' });
          const json = (await res.json().catch(() => ({}))) as { data?: ProfileApiUser };
          if (cancelled) return;
          if (res.status === 401) {
            setProfileUser(null);
            setProfileError('unauthorized');
            return;
          }
          if (!res.ok) throw new Error(String(res.status));
          setProfileUser(json.data ?? null);
          if (json.data) setUser(json.data);
          return;
        }
        if (numericUserId === null) {
          setProfileUser(null);
          setProfileError('invalid-id');
          return;
        }
        const res = await fetch(`${BE_URL}/api/users/${numericUserId}`, {
          credentials: 'include',
        });
        const json = (await res.json().catch(() => ({}))) as { data?: ProfileApiUser };
        if (cancelled) return;
        if (!res.ok) throw new Error(String(res.status));
        setProfileUser(json.data ?? null);
      } catch {
        if (!cancelled) {
          setProfileError('failed');
          setProfileUser(null);
        }
      } finally {
        if (!cancelled) setProfileLoading(false);
      }
    }
    void loadProfile();
    return () => {
      cancelled = true;
    };
  }, [isMyProfile, id, numericUserId, setUser]);

  useEffect(() => {
    let cancelled = false;
    const path = isMyProfile
      ? '/api/attempts/me/summary'
      : `/api/attempts/users/${encodeURIComponent(id!)}/summary`;
    const url = `${BE_URL}${path}`;

    async function load() {
      setSummaryLoading(true);
      setSummaryError(null);
      try {
        const res = await fetch(url, { credentials: 'include' });
        if (cancelled) return;
        if (isMyProfile && res.status === 401) {
          setSummary({ completedCount: 0, totalPracticeSeconds: 0, recentAttempts: [] });
          return;
        }
        if (!res.ok) throw new Error(String(res.status));
        const data: ProfileSummary = await res.json();
        setSummary(data);
      } catch {
        if (!cancelled) {
          setSummaryError('failed');
          setSummary({ completedCount: 0, totalPracticeSeconds: 0, recentAttempts: [] });
        }
      } finally {
        if (!cancelled) setSummaryLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [isMyProfile, id]);

  const localeTag = language === 'vi' ? 'vi-VN' : language === 'ja' ? 'ja-JP' : 'en-US';

  const displayName = profileLoading ? '…' : profileUser?.name ?? '—';
  const displayEmail =
    profileLoading ? '…' : profileUser?.email?.trim() || (isMyProfile ? '—' : '');
  const displayPhone =
    profileLoading ? '…' : profileUser?.phoneNumber?.trim() || (isMyProfile ? '—' : '');
  const joinedStr =
    profileLoading
      ? '…'
      : profileUser?.createdAt
        ? new Date(profileUser.createdAt).toLocaleDateString(localeTag)
        : '—';
  const avatarSrc = avatarFromName(
    profileLoading && !profileUser ? '?' : (profileUser?.name?.trim() || '?')
  );

  const completedDisplay = summaryLoading ? '…' : String(summary?.completedCount ?? 0);
  const hoursDisplay = summaryLoading ? '…' : formatPracticeHours(summary?.totalPracticeSeconds ?? 0);
  const recentAttempts = summary?.recentAttempts ?? [];

  const handleLogout = async () => {
    await logoutAction();
    setUser(null);
    router.push(`/${language}/`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Thông tin User */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex flex-col items-center text-center transition-colors duration-300">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-50 dark:border-gray-800 shadow-md">
                {profileLoading && !profileUser ? (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                ) : (
                    <ImageWithFallback
                        src={avatarSrc}
                        alt={t.profileAvatarAlt}
                        className="w-full h-full object-cover"
                    />
                )}
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2 mb-6">
              {displayName}
            </h2>
            {profileError === 'invalid-id' && (
              <p className="text-sm text-amber-600 dark:text-amber-500 mb-4">
                {t.profileInvalidIdHint}
              </p>
            )}
            {profileError === 'failed' && !profileLoading && (
              <p className="text-sm text-red-500 dark:text-red-400 mb-4">
                {t.profileLoadFailed}
              </p>
            )}
            
            <div className="w-full space-y-4 text-left border-t border-gray-100 dark:border-gray-800 pt-6">
              {isMyProfile && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Mail className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                  <span className="truncate">{displayEmail}</span>
                </div>
              )}
              {isMyProfile && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Phone className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                  <span>{displayPhone}</span>
                </div>
              )}
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" />
                <span>{t.joined} {joinedStr}</span>
              </div>
            </div>

            {isMyProfile && (
              <div className="w-full mt-8 space-y-2">
                <Link href={`/${language}/settings`} className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors group">
                  <span className="flex items-center"><Settings className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-500" /> {t.settings}</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
                >
                  <span className="flex items-center">
                    <LogOut className="w-4 h-4 mr-2 text-red-400 group-hover:text-red-500" /> {t.logout}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col gap-6">
          
          {/* Thống kê nhanh */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-[#1a1a1a] p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4 transition-colors duration-300">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.completedExams}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{completedDisplay}</p>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a1a1a] p-5 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4 transition-colors duration-300">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-purple-600 dark:text-purple-400 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.studyHours}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{hoursDisplay}</p>
              </div>
            </div>
          </div>

          {/* Tabs & Nội dung lịch sử */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex-1 transition-colors duration-300">
            <div className="flex border-b border-gray-100 dark:border-gray-800 px-6 pt-4 space-x-6 overflow-x-auto hide-scrollbar">
              <button 
                onClick={() => setActiveTab('history')}
                className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors flex items-center whitespace-nowrap ${
                  activeTab === 'history' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Activity className="w-4 h-4 mr-2" /> {t.recentActivity}
              </button>
              {isMyProfile && (
                <button 
                  onClick={() => setActiveTab('saved')}
                  className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors flex items-center whitespace-nowrap ${
                    activeTab === 'saved' ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <BookOpen className="w-4 h-4 mr-2" /> {t.savedMaterials}
                </button>
              )}
            </div>

            <div className="p-6">
              {activeTab === 'history' && (
                <div className="space-y-4">
                  {summaryLoading && (
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-8">
                      {t.loading}
                    </p>
                  )}
                  {!summaryLoading && summaryError && (
                    <p className="text-center text-sm text-red-500 dark:text-red-400 py-4">
                      {t.activityLoadFailed}
                    </p>
                  )}
                  {!summaryLoading &&
                    recentAttempts.map((exam) => {
                      const dateStr = exam.createdAt
                        ? new Date(exam.createdAt).toLocaleDateString(localeTag)
                        : '';
                      const timeStr = formatDurationSeconds(exam.timeSpentSeconds ?? 0, language);
                      const title = pickExamTitle(exam.examTitle, language);
                      const maxScore = getExamMaxScore(exam.examId);
                      return (
                        <div
                          key={exam.id}
                          className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-100 dark:hover:border-blue-900/50 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all"
                        >
                          <div className="mb-4 sm:mb-0 flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                              {title || exam.examId}
                            </h4>
                            <div className="mt-1 flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 gap-3">
                              <span className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1 shrink-0" /> {dateStr}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1 shrink-0" /> {timeStr}
                              </span>
                              <span className="flex items-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                                <CheckCircle className="w-3 h-3 mr-1 shrink-0" /> {t.statusCompleted}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-gray-100 dark:border-gray-800 pt-3 sm:pt-0">
                            <div className="text-left sm:text-right">
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.result}</p>
                              <p className="font-bold text-gray-900 dark:text-gray-100">
                                {exam.score}{' '}
                                <span className="text-xs text-gray-400 font-normal">/ {maxScore}</span>
                              </p>
                            </div>
                            <div className="text-left sm:text-right">
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.correctCount}</p>
                              <p className="font-bold text-gray-900 dark:text-gray-100">
                                {exam.totalCorrect}{' '}
                                <span className="text-xs text-gray-400 font-normal">/ {exam.questionCount}</span>
                              </p>
                            </div>
                            {isMyProfile && (
                              <Link
                                href={`/${language}/results/${exam.id}`}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-colors hidden sm:block"
                              >
                                <ChevronRight className="w-5 h-5" />
                              </Link>
                            )}
                          </div>

                          {isMyProfile && (
                            <Link
                              href={`/${language}/results/${exam.id}`}
                              className="mt-3 w-full sm:hidden text-center text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 py-2 rounded-lg"
                            >
                              {t.viewDetailsBtn}
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  {!summaryLoading && !summaryError && recentAttempts.length === 0 && (
                      <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                          {t.noCompletedExamsYet}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-1 mb-4">
                          {t.noCompletedExamsYetDesc ?? 'Hãy thử sức với một đề thi ngay hôm nay!'}
                        </p>
                        <Link
                            href={`/${language}/exams`}
                            className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                        >
                          {t.exploreExams ?? 'Khám phá đề thi'} <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </div>
                  )}
                </div>
              )}
              
              {activeTab === 'saved' && isMyProfile && (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{t.noSavedMaterials}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 mb-4">{t.noSavedMaterialsDesc}</p>
                  <Link href={`/${language}/materials`} className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                    {t.exploreMaterials}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
