/* eslint-disable */
import Image from 'next/image';
import { 
    Bookmark, Calendar, Clock, Share2, 
    Eye, MessageSquare, ChevronRight, 
    Target, Lightbulb, CheckCircle2
} from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

const postDetail = {
    id: 'ky-thi-ap',
    title: '応用情報技術者試験（AP）とは？',
    excerpt: 'AP資格 - 日本のシニアソフトウェアエンジニアのキャリアへの確かな足がかり。',
    coverImage: '/blog-it-passport-thumbnail.jpg',
    author: {
        name: 'Trần Thiên Phú',
        role: 'Author',
        avatar: '/Shin.png',
    },
    date: '08/05/2026',
    category: 'IT資格',
    readTime: '25分',  views: '1.2k',
    comments: '15',
    tags: ['AP', '応用情報技術者試験', 'Itshiken', '日本', 'キャリア'],
    relatedPosts: [
        { 
            id: 'ky-thi-it-passport', 
            title: 'ITパスポート試験とは？日本のIT資格をAからZまで攻略する完全ガイド', 
            image: '/blog-it-passport-thumbnail.jpg', 
            date: '01/05/2026',
            href: '/ja/blogs/ky-thi-it-passport'
        },
        { 
            id: 'ky-thi-fe', 
            title: '基本情報技術者試験（FE）とは？自信を持って合格するための疑問をすべて解決', 
            image: '/blog-it-fe-thumbnail.jpg', 
            date: '01/05/2026',
            href: '/ja/blogs/ky-thi-fe'
        },
        { 
            id: 'lo-trinh-hoc-it', 
            title: '基礎から専門家までの日本のIT資格（IPA）ロードマップ', 
            image: '/it-roadmap.png', 
            date: '08/05/2026',
            href: '/ja/blogs/lo-trinh-hoc-it'
        },
    ]
};

export default function ContentJa() {
    return (
        <main className="min-h-screen bg-background transition-colors duration-300">
            {/* HERO SECTION */}
            <header className="bg-card pt-12 pb-8 border-b border-border/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                        <a href="/ja" className="hover:text-primary dark:hover:text-blue-400 transition-colors">ホーム</a>
                        <ChevronRight className="w-4 h-4" />
                        <a href="/ja/category" className="hover:text-primary dark:hover:text-blue-400 transition-colors">ブログ</a>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground/90 truncate">{postDetail.title}</span>
                    </nav>

                    <div className="mb-6">
                        <span className="inline-block bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {postDetail.category}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.2]">
                        {postDetail.title}
                    </h1>

                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                        {postDetail.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center justify-between gap-6 py-4">
                        <div className="flex items-center gap-4">
                            <Image
                                src={postDetail.author.avatar}
                                alt={postDetail.author.name}
                                height={56}
                                width={56}
                                className="w-14 h-14 rounded-full border-2 border-white dark:border-slate-800 shadow-md object-cover"
                            />
                            <div>
                                <div className="font-bold text-foreground text-base">{postDetail.author.name}</div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {postDetail.date}</span>
                                    <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {postDetail.readTime} 読了</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                            <span className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"><Eye className="w-5 h-5" /> {postDetail.views}</span>
                            <span className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"><MessageSquare className="w-5 h-5" /> {postDetail.comments}</span>
                            <div className="flex items-center gap-2 pl-4 border-l border-border/60">
                                <button className="p-2 rounded-full hover:bg-secondary/20 transition-colors" title="共有">
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-full hover:bg-secondary/20 transition-colors" title="保存">
                                    <Bookmark className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN LAYOUT: 2 COLUMNS */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="lg:grid lg:grid-cols-12 lg:gap-10">

                    {/* LEFT COLUMN: MAIN CONTENT */}
                    <article className="lg:col-span-9 bg-card rounded-2xl shadow-sm border border-border/40 overflow-hidden">
                        
                        <figure className="w-full bg-slate-50 dark:bg-slate-800/50 p-4">
                            <Image 
                                src={postDetail.coverImage} 
                                alt={postDetail.title} 
                                width={1200} 
                                height={800}
                                className="w-full h-auto object-cover rounded-lg max-h-[500px]"
                                priority 
                            />
                        </figure>

                        <div className="p-6 sm:p-10 text-lg leading-relaxed text-foreground/80">
                            <p className="mb-6 drop-cap">
                                こんにちは、ITエンジニアの皆さん。日本の企業で働く、またはキャリアを積む予定があるなら、「ITスキル標準（ITSS）」について聞いたことがあるでしょう。その中でも、応用情報技術者試験（AP）は、エンジニアの能力を証明する最も権威ある「保証」と見なされています。
                            </p>
                            <p className="mb-6">
                                APは、単にコードを書く能力をテストするものではありません。リーダー、システムアーキテクト、またはプロジェクトマネージャーとしての思考力があるかを確認する総合的なテストです。APの合格率は厳しく、通常20%〜25%程度です。しかし、正しい戦略を持てば、合格は十分に可能です。
                            </p>

                            <h2 id="section-1" className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-xl">1</span>
                                なぜ他の資格ではなくAPなのか？
                            </h2>
                            <p className="mb-4">
                                AP資格を持つことは、日本での収入と生活に直接影響を与える明確なメリットをもたらします：
                            </p>
                            <ul className="list-disc pl-6 mb-6 space-y-2">
                                <li><strong>永住権ビザのポイント：</strong>高度専門職（HSP）ビザの申請時に20ポイントが直接加算されます。これは、永住権（PR）取得までの期間をわずか1〜3年に短縮する大きな後押しとなります。</li>
                                <li><strong>資格手当：</strong>多くの日本の企業では、AP資格を持っていると基本給に月額10,000円〜30,000円を加算する制度があります。</li>
                                <li><strong>キャリアアップ：</strong>プログラマー（コーダー）からシステムエンジニア（SE）などの上位職への移行を意味します。</li>
                            </ul>

                            <h2 id="section-2" className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 text-xl">2</span>
                                ルール：2つの試験が行われる「頭脳戦」の1日
                            </h2>
                            <p className="mb-6">
                                AP試験はIPAによって年に2回（4月と10月）開催されます。同じ日に2つの試験を連続して受けます。重要なポイントは、両方の試験で最低60/100点以上のスコアを獲得する必要があることです。午前の試験に不合格の場合、午後の試験は採点されません。
                            </p>

                            <h3 className="text-xl font-semibold text-foreground/90 mt-6 mb-3">
                                バトル1：午前試験（Gozen） - スプリント
                            </h3>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li><strong>時間：</strong>80問の選択式問題に150分。1問あたり2分未満です。</li>
                                <li><strong>知識構成：</strong>
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li><strong>テクノロジ系（約50問）：</strong>数学、アルゴリズム、コンピュータアーキテクチャ、OS、ネットワーク、データベース、セキュリティ。</li>
                                        <li><strong>マネジメント系（約10問）：</strong>プロジェクトマネジメント（PMBOK）、リスクマネジメント、ITIL。</li>
                                        <li><strong>ストラテジ系（約20問）：</strong>ビジネス戦略、エンタープライズアーキテクチャ、会計、法律（著作権、労働法）。</li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-md">
                                <div className="flex items-center gap-2 font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                                    <Lightbulb className="w-5 h-5 text-yellow-500" /> 実践的な戦略：
                                </div>
                                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                    教科書を暗記しようとしないでください。IPAは過去の問題の約40〜50％を再利用するため、鍵は「過去問」を解くことです。「応用情報技術者試験過去問道場」というウェブサイトを利用してください。直近5〜7年分の過去問を、正解率が常に80％を超えるまでやり込めば、合格は確実です。
                                </p>
                            </div>

                            <h3 className="text-xl font-semibold text-foreground/90 mt-8 mb-3">
                                バトル2：午後試験（Gogo） - 強みの選択
                            </h3>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>150分での短い記述式とケーススタディ分析（5〜10ページ）。</li>
                                <li>11のトピックがあります。問1の<strong>「情報セキュリティ」</strong>は必須です。その後、残りの10トピック（経営戦略、プログラミング、システムアーキテクチャ、ネットワーク、データベース、組込みシステム開発、情報システム開発、プロジェクトマネジメント、サービスマネジメント、システム監査）から4問を選択して解答します。</li>
                            </ul>
                            <p className="mb-6">
                                Web開発（MERNスタックやフルスタックなど）に携わっている場合は、技術的なバックグラウンドを最大限に活用してください。「隣の芝生は青い」と思わず、自宅で得意科目を決めておきましょう。アドバイスとしては、<strong>「データベース」</strong>と<strong>「システムアーキテクチャ」</strong>を狙うことです。
                            </p>

                            <h2 id="section-3" className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 text-xl">3</span>
                               データベースとシステムアーキテクチャの「攻略」
                            </h2>
                            <p className="mb-6">
                                Webの経験がある場合、これらは2つのポイントの「金脈」です。
                            </p>

                            <h3 className="text-xl font-semibold text-foreground/90 mt-6 mb-3">
                                データベース（Database）：データ思考が支配するとき
                            </h3>
                            <p className="mb-4">
                                APは、リレーショナルデータベース（RDBMS）標準に従った厳格なシステム思考を要求します。
                            </p>
                            <ul className="list-disc pl-6 mb-6 space-y-2">
                                <li><strong>ER図の読み方のコツ：</strong>すぐにテキストを読み始めないでください。まず、実体関連モデル（ERD）をざっと見てください。テキストを読むときは、数量と関係を示すフレーズ（例：「1つの注文は複数の製品を持つことができる」-&gt; 1対Nの関係）に下線を引きます。</li>
                                <li><strong>正規化の診断（Seikika）：</strong>試験では第1、第2、第3正規形についてよく聞かれます。「このテーブルは主キーに完全に関数従属しているか？推移的関数従属はないか？」というルールを覚えておいてください。冗長な情報がある場合は、テーブルを分割し、外部キーを指定します。</li>
                                <li><strong>日本語でのSQLキーワードの「キャッチ」：</strong>
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>降順 = <code>ORDER BY ... DESC</code></li>
                                        <li>グループ化 = <code>GROUP BY</code></li>
                                        <li>重複を排除 = <code>DISTINCT</code></li>
                                    </ul>
                                </li>
                            </ul>

                            <h3 className="text-xl font-semibold text-foreground/90 mt-8 mb-3">
                                システムアーキテクチャ（System Architecture）：最適化問題
                            </h3>
                            <p className="mb-4">
                                この科目は、サーバーの負荷容量、ネットワーク帯域幅の計算、または冗長システムの設計方法を知っているかどうかをテストします。
                            </p>
                            <ul className="list-disc pl-6 mb-6 space-y-2">
                                <li><strong>データフローの描画：</strong>ケーススタディは非常に長いことが多いです。コンポーネント（<code>クライアント -&gt; ロードバランサ -&gt; Webサーバー -&gt; DBサーバー</code>）をスケッチします。問題にボトルネックが言及されている場所に「X」をマークします。</li>
                                <li><strong>必須の公式：</strong>稼働率（Availability）の計算方法を暗記する必要があります。
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>直列システム：<code>A × B</code></li>
                                        <li>並列システム：<code>1 - (1-A) × (1-B)</code></li>
                                    </ul>
                                </li>
                                <li><strong>命を救う語彙：</strong>
                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                        <li>ボトルネック（Bottleneck） - CPU、RAM、I/Oのどれが原因かを特定します。</li>
                                        <li>高可用性（High Availability）。</li>
                                        <li>システム拡張：スケールアップ（1台の構成を上げる） vs スケールアウト（マシンの数を増やす）。</li>
                                    </ul>
                                </li>
                            </ul>

                            <h2 id="section-4" className="text-2xl sm:text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 text-xl">4</span>
                                最大の障壁：「専門的な日本語」という悪夢
                            </h2>
                            <p className="mb-4">
                                APのIT知識はエンジニアにとって難しくありませんが、言語の壁はあります。JLPT N3に合格し、N2を目指しているなら、非常に強固な基盤があります。しかし、システムの読み取りと分析は、日常的な読解とはまったく異なります。
                            </p>
                            <div className="space-y-4 mb-6">
                                <div className="flex gap-3">
                                    <Target className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground">スピードが命</h4>
                                        <p className="text-base text-muted-foreground">各ケーススタディに与えられた時間はわずか30分です。一言一句翻訳して読まないでください。スキャニング技術を使い、「～という課題がある」や「～を満たす必要がある」といった構造を見つけてください。これが設計の制約条件を見つける鍵です。</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-foreground">記述式解答</h4>
                                        <p className="text-base text-muted-foreground">解決策を説明するために、日本語で短い文章（15〜40文字）を書く必要があります。正しい簡略形（常体／である調）を使用して、簡潔に書く練習をしてください。</p>
                                    </div>
                                </div>
                            </div>

                            <h2 id="section-5" className="text-2xl sm:text-3xl font-bold text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300 text-xl">5</span>
                                推奨される学習ロードマップ（4ヶ月のキャンペーン）
                            </h2>
                            <ul className="list-disc pl-6 mb-6 space-y-2">
                                <li><strong>1ヶ月目：</strong>一般的な理論の復習。「オールインワン」のテキストを読んで、専門的な漢字に慣れましょう。</li>
                                <li><strong>2ヶ月目：</strong>過去問道場で午前の問題をやり込みます。1日50〜100問を目標にします。間違えた箇所をメモします。</li>
                                <li><strong>3ヶ月目：</strong>午後の試験の練習。固定の4科目を選び、1科目30分でタイマーを設定します。キーワードに下線を引いて答えを書く練習をします。</li>
                                <li><strong>4ヶ月目（スプリントフェーズ）：</strong>週末にフルテスト（午前と午後）を2〜3回受け、試験室に5時間連続で座るプレッシャーに慣れます。</li>
                            </ul>

                            <h2 id="conclusion" className="text-2xl sm:text-3xl font-bold text-foreground mt-12 mb-6 pb-2 border-b border-border/40 scroll-mt-24">
                                結論
                            </h2>
                            <p className="mb-4">
                                AP試験は、システムの技術的知識、マネジメント思考、そして日本語処理能力のバランスが求められる、真の「厳しい」挑戦です。しかし、それが日本のキャリアパス、収入、そして定住にもたらす価値は、あなたが勉強に費やすすべての時間に見合うものです。
                            </p>
                            <p className="font-medium text-foreground/90">
                                皆さんの健闘を祈り、早くこの強力な資格証明書を手にすることを願っています！
                            </p>

                            {/* Tags Section */}
                            <div className="mt-16 pt-8 border-t border-border/40">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-sm font-semibold text-foreground">Tags:</span>
                                    {postDetail.tags.map((tag) => (
                                        <a key={tag} href={`/ja/tag/${tag}`} className="px-3 py-1.5 bg-secondary/10 text-slate-600 dark:text-slate-300 text-sm rounded-md hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900 dark:hover:text-blue-200 transition-colors font-medium">
                                            #{tag}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* RIGHT COLUMN: TABLE OF CONTENTS */}
                    <aside className="hidden lg:block lg:col-span-3 space-y-8">
                        {/* Sticky TOC */}
                        <div className="sticky top-24 bg-card p-6 rounded-2xl shadow-sm border border-border/40">
                            <h3 className="font-bold text-base text-foreground mb-5 flex items-center gap-2 pb-3 border-b border-border/40">
                                <Bookmark className="w-4 h-4 text-blue-500" /> 目次
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <a href="#section-1" className="flex items-center gap-2.5 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">1</span>
                                        なぜAPなのか？
                                    </a>
                                </li>
                                <li>
                                    <a href="#section-2" className="flex items-center gap-2.5 text-muted-foreground hover:text-green-600 dark:hover:text-green-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 flex items-center justify-center text-xs font-bold group-hover:bg-green-600 group-hover:text-white transition-colors">2</span>
                                        試験のルール
                                    </a>
                                </li>
                                <li>
                                    <a href="#section-3" className="flex items-center gap-2.5 text-muted-foreground hover:text-orange-600 dark:hover:text-orange-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 flex items-center justify-center text-xs font-bold group-hover:bg-orange-600 group-hover:text-white transition-colors">3</span>
                                        ケーススタディ解読
                                    </a>
                                </li>
                                <li>
                                    <a href="#section-4" className="flex items-center gap-2.5 text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center justify-center text-xs font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors">4</span>
                                        専門的な日本語
                                    </a>
                                </li>
                                <li>
                                    <a href="#section-5" className="flex items-center gap-2.5 text-muted-foreground hover:text-pink-600 dark:hover:text-pink-400 transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300 flex items-center justify-center text-xs font-bold group-hover:bg-pink-600 group-hover:text-white transition-colors">5</span>
                                        学習ロードマップ
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>

            {/* CTA BOX */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="bg-gradient-to-br from-secondary/60 to-secondary dark:to-blue-800 rounded-xl p-8 sm:p-10 text-center shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-4">IT資格の練習をする準備はできましたか？</h3>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        IT Shikenは、本番に近い無料の模擬試験を提供しており、自動採点と詳細な結果分析も備えています。登録不要で今すぐ始められます！
                    </p>
                    <Button asChild className="text-lg !py-6">
                        <Link href="/ja/exams">今すぐ模擬試験を受ける – 無料</Link>
                    </Button>
                </div>
            </div>

            {/* RELATED POSTS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border/40">
                <h3 className="text-2xl font-bold text-foreground mb-8">関連記事</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postDetail.relatedPosts.map((post) => (
                        <a key={post.id} href={post.href} className="group block">
                            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-secondary/10">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                <Calendar className="w-3.5 h-3.5" />
                                {post.date}
                            </div>
                            <h4 className="font-bold text-lg text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {post.title}
                            </h4>
                        </a>
                    ))}
                </div>
            </section>
        </main>
    );
}
