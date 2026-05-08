import Image from 'next/image';
import { Bookmark, Calendar, Clock, Share2 } from 'lucide-react';
import React from 'react';

const postDetail = {
    id: 'lo-trinh-hoc-it',
    title: '日本のIT資格ロードマップ（IPA）：基礎からエキスパートまで',
    excerpt: '日本の国家IT資格制度に関する包括的なガイド。各レベルの試験構造と登録手順を含みます。',
    coverImage: '/blog-it-fe-thumbnail.jpg',
    author: {
        name: 'Trần Thiên Phú',
        role: 'Author',
        avatar: '/avatar-Phi.jpg',
    },
    date: '08/05/2026',
    category: '学習ロードマップ',
    readTime: '30分',
    tags: ['IT', 'Roadmap', 'IPA', 'IT Passport', 'FE', 'AP', 'Career'],
};

export default function ContentJa() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#121212] py-8 transition-colors duration-300 text-slate-900 dark:text-slate-200">
            {/* HEADER */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="mb-4">
                    <span className="bg-primary text-white dark:bg-blue-900  text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
                        {postDetail.category}
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
                    {postDetail.title}
                </h1>

                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-4xl">{postDetail.excerpt}</p>

                {/* META */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <Image
                            src={postDetail.author.avatar}
                            alt={postDetail.author.name}
                            height={48}
                            width={48}
                            className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-700 object-cover"
                        />
                        <div>
                            <div className="font-semibold text-slate-900 dark:text-white">{postDetail.author.name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{postDetail.author.role}</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {postDetail.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {postDetail.readTime}
                        </div>

                        <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-700">
                            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <Share2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <Bookmark className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* COVER IMAGE */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <Image
                    src={postDetail.coverImage}
                    alt={postDetail.title}
                    width={1200}
                    height={630}
                    className="w-full h-auto max-h-[500px] object-cover rounded-md shadow-sm"
                />
            </div>

            {/* CONTENT */}
            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                <p className="mb-6">
                    IPA（情報処理推進機構）が主催する日本の情報技術資格制度は、4つのレベル（レベル1からレベル4）に分かれています。この記事では、初心者からエキスパートまでのロードマップを、各レベルの試験構造と登録手順とともに分析します。
                </p>

                <figure className="my-10">
                    <img 
                        src="/it-roadmap.png" 
                        alt="Japan IT Certification Roadmap from Basic to Advanced" 
                        className="w-full h-auto object-contain rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] dark:shadow-none border border-slate-100 dark:border-slate-800 bg-white"
                    />
                    <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
                        日本の国家IT資格のロードマップ（出典：IPA）
                    </figcaption>
                </figure>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
                    レベル1：共通の知識 - ITパスポート（IP）
                </h2>
                <p className="mb-4">
                    <strong>ITパスポート</strong>はテクノロジーの世界へのパスポートです。これは、現代の企業環境で働くすべての人を対象とした最も基本的な資格です。
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-6 my-8">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-primary dark:bg-blue-600 rounded-full"></span>
                        ITパスポートの試験構造と登録
                    </h4>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                        <li><strong>試験形式：</strong>CBT（Computer-Based Testing）方式</li>
                        <li><strong>試験時間と問題数：</strong>120分 - 四肢択一式 100問</li>
                        <li><strong>合格基準：</strong>総合評価点が600点以上、かつ各分野別の評価点が300点以上であること。
                            <ul className="list-disc pl-6 mt-1 text-sm">
                                <li>ストラテジ系（経営全般）：約35問</li>
                                <li>マネジメント系（IT管理）：約20問</li>
                                <li>テクノロジ系（IT技術）：約45問</li>
                            </ul>
                        </li>
                        <li className="pt-2 border-t border-slate-200 dark:border-slate-700"><strong>受験料：</strong>7,500円</li>
                        <li><strong>登録手順：</strong>IPAのWebサイトからオンラインで登録します。CBT試験は全国のテストセンター（Prometric / CBT-Solutions）で<strong>年間を通じて</strong>実施されています。週末に試験を予約することができます。</li>
                    </ul>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
                    レベル2：基本的知識・技能 - FE / SG
                </h2>
                <p className="mb-4">
                    この段階は、実践的なソフトウェアエンジニアまたは基本的な情報セキュリティ管理者になることを目指す人向けです。これには、<strong>FE（基本情報技術者試験）</strong>と<strong>SG（情報セキュリティマネジメント試験）</strong>の2つの資格が含まれます。
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-6 my-8">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-secondary dark:bg-blue-600 rounded-full"></span>
                        FE / SGの試験構造と登録
                    </h4>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">FE（基本情報技術者試験）の場合：</p>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300 text-sm mb-4">
                        <li><strong>試験形式：</strong>CBT方式 - 年間を通じて利用可能。</li>
                        <li><strong>試験構造：</strong>同日に2つの科目に分かれています。
                            <ul className="list-disc pl-6 mt-1">
                                <li><strong>科目A（理論）：</strong>90分 - 四肢択一式 60問。合格基準：600点/1000点。</li>
                                <li><strong>科目B（実践）：</strong>100分 - 多肢選択式 20問（アルゴリズム、プログラミング、情報セキュリティ）。合格基準：600点/1000点。</li>
                            </ul>
                        </li>
                    </ul>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2 pt-4 border-t border-slate-200 dark:border-slate-700">SG（情報セキュリティマネジメント試験）の場合：</p>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300 text-sm mb-4">
                        <li><strong>試験形式：</strong>CBT方式 - 年間を通じて利用可能。</li>
                        <li><strong>試験構造：</strong>科目A（理論 - 60分/48問）および科目B（シナリオ - 60分/12問）。</li>
                    </ul>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-sm"><strong>受験料：</strong>各試験7,500円。</p>
                        <p className="text-sm"><strong>登録手順：</strong>IPAのCBTポータルから登録します。ITパスポートと同様に、テストセンターで試験日時を柔軟に選択できます。</p>
                    </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
                    レベル3：応用的知識・技能 - AP
                </h2>
                <p className="mb-4">
                    <strong>AP（応用情報技術者試験）</strong>は、シニアエンジニアまたはプロジェクトマネージャーとしての地位を確立するための重要な資格です。このレベルでは、包括的なシステム分析と設計機能が必要です。
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-6 my-8">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-green-500 rounded-full"></span>
                        APの試験構造と登録
                    </h4>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                        <li><strong>試験形式：</strong>筆記試験。年2回開催（春期は4月、秋期は10月）。</li>
                        <li><strong>試験構造：</strong>
                            <ul className="list-disc pl-6 mt-1 text-sm">
                                <li><strong>午前（09:30 - 12:00）：</strong>150分 - IT全般をカバーする四肢択一式 80問。合格基準：60％。</li>
                                <li><strong>午後（13:00 - 15:30）：</strong>150分 - 記述式。11問中4問を選択して解答します。合格基準：60％。</li>
                            </ul>
                        </li>
                        <li className="pt-2 border-t border-slate-200 dark:border-slate-700"><strong>受験料：</strong>7,500円</li>
                        <li><strong>登録手順：</strong>筆記試験であるため、IPAのWebサイトで試験の2〜3ヶ月前に登録する必要があります。（春期の登録は1月中旬、秋期の登録は7月中旬に始まります）。</li>
                    </ul>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
                    レベル4：高度な知識・技能（スペシャリスト）
                </h2>
                <p className="mb-4">
                    これはIPAシステムで最高のレベルです。レベル4の資格は、ITストラテジスト（ST）、システムアーキテクト（SA）、プロジェクトマネージャ（PM）、ネットワークスペシャリスト（NW）、データベーススペシャリスト（DB）など、9つの専門分野に分かれています。
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-6 my-8">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
                        レベル4の試験構造と登録
                    </h4>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                        <li><strong>試験形式：</strong>筆記試験。各資格は年に1回のみ開催されます（科目に応じて春期または秋期）。</li>
                        <li><strong>試験構造（非常に厳しい）：</strong>
                            <ul className="list-disc pl-6 mt-1 text-sm">
                                <li>午前I（50分）：共通の多肢選択式（APを保持しているか、2年以内に別のレベル4試験に合格している場合は免除されます）。</li>
                                <li>午前II（40分）：専門の多肢選択式。</li>
                                <li>午後I（90分）：シナリオに基づいた短い記述式の解答。</li>
                                <li>午後II（120分）：小論文 - 実際に携わったプロジェクトに関する分析論文を書く必要があります。</li>
                            </ul>
                        </li>
                        <li className="pt-2 border-t border-slate-200 dark:border-slate-700"><strong>手順と料金：</strong>7,500円。登録スケジュールはAP試験と同じです。</li>
                    </ul>
                </div>

                <div className="bg-primary/10 dark:bg-blue-900/20 border-l-4 border-primary rounded-r-md p-6 my-10">
                    <h3 className="text-xl font-bold text-primary dark:text-blue-100 mb-3">専門家のアドバイス</h3>
                    <p className="text-slate-800 dark:text-slate-200">
                        しっかりとしたITの基礎がある場合は<strong>FE</strong>から、キャリアを変えようとしている場合は<strong>ITパスポート</strong>から始めてください。特定のレベル4の分野に深く入り込むことを決定する前に、日本の雇用主へのアピールを最大化するために、<strong>AP</strong>の資格が最も価値のある長期的な目標です。
                    </p>
                </div>
            </article>
        </main>
    );
}
