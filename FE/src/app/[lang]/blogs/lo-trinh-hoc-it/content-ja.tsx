import Image from 'next/image';
import { Bookmark, Calendar, Clock, Share2, Eye, MessageSquare, ChevronRight, CheckCircle2, Target, Lightbulb } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

const postDetail = {
    id: 'lo-trinh-hoc-it',
    title: '日本のIT資格ロードマップ（IPA）：基礎からエキスパートまで',
    excerpt: '日本の国家IT資格制度（IPA）の総合ガイド。ITパスポートからスペシャリストまで、各レベルの試験構造・対象者・合格のコツを詳しく解説します。',
    coverImage: '/it-roadmap.png',
    author: { name: 'Trần Thiên Phú', role: 'Author', avatar: '/Shin.png', bio: '日本での実務経験5年以上。ITキャリア、日本のIT企業文化、資格取得について情報発信中。' },
    date: '08/05/2026',
    category: '学習ロードマップ',
    readTime: '20分',
    views: '15.2K',
    comments: 38,
    tags: ['IT', 'Roadmap', 'IPA', 'ITパスポート', 'FE', 'AP', 'Career'],
    relatedPosts: [
        { id: 'ky-thi-it-passport', title: 'ITパスポートとは？A-Zの完全ガイド', image: '/blog-it-passport-thumbnail.jpg', date: '01/05/2026', href: '/ja/blogs/ky-thi-it-passport' },
        { id: 'ky-thi-fe', title: '基本情報技術者試験（FE）とは？', image: '/blog-it-fe-thumbnail.jpg', date: '01/05/2026', href: '/ja/blogs/ky-thi-fe' },
        { id: 'ky-thi-ap', title: '応用情報技術者試験（AP）とは？', image: '/blog-it-passport-thumbnail.jpg', date: '08/05/2026', href: '/ja/blogs/ky-thi-ap' },
    ]
};

export default function ContentJa() {
    return (
        <main className="min-h-screen bg-background transition-colors duration-300">
            <header className="bg-background pt-12 pb-8 border-b border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                        <a href="/" className="hover:text-primary transition-colors">ホーム</a>
                        <ChevronRight className="w-4 h-4" />
                        <a href="/ja/blogs" className="hover:text-primary transition-colors">ブログ</a>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground/80 truncate">{postDetail.title}</span>
                    </nav>
                    <div className="mb-6">
                        <span className="inline-block bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{postDetail.category}</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-secondary dark:text-foreground mb-6 leading-[1.2]">{postDetail.title}</h1>
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{postDetail.excerpt}</p>
                    <div className="flex flex-wrap items-center justify-between gap-6 py-4">
                        <div className="flex items-center gap-4">
                            <Image src={postDetail.author.avatar} alt={postDetail.author.name} height={56} width={56} className="w-14 h-14 rounded-full border-2 border-border/60 shadow-md object-cover" />
                            <div>
                                <div className="font-bold text-secondary dark:text-foreground text-base">{postDetail.author.name}</div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {postDetail.date}</span>
                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {postDetail.readTime}で読める</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                            <span className="flex items-center gap-1.5 cursor-pointer"><Eye className="w-5 h-5" /> {postDetail.views}</span>
                            <span className="flex items-center gap-1.5 cursor-pointer"><MessageSquare className="w-5 h-5" /> {postDetail.comments}</span>
                            <div className="flex items-center gap-2 pl-4 border-l border-border/40">
                                <button className="p-2 rounded-full hover:bg-muted/60 hover:text-primary transition-colors"><Share2 className="w-4 h-4" /></button>
                                <button className="p-2 rounded-full hover:bg-muted/60 hover:text-primary transition-colors"><Bookmark className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="lg:grid lg:grid-cols-12 lg:gap-10">
                    <article className="lg:col-span-9 bg-background rounded-2xl border border-border/60 overflow-hidden">
                        <figure className="w-full bg-muted/[0.2] p-4">
                            <Image src={postDetail.coverImage} alt="日本のIT資格ロードマップ（IPA）" width={1200} height={800} className="w-full h-auto object-contain rounded-lg" priority />
                            <figcaption className="text-center text-sm text-muted-foreground/60 mt-3 italic">
                                IPAが定める国家IT資格制度の全体像 — レベル1（ITパスポート）からレベル4（高度専門家）まで。出典：<a href="https://www.ipa.go.jp/shiken/about/about.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">IPA</a>
                            </figcaption>
                        </figure>

                        <div className="p-6 sm:p-10 text-lg leading-relaxed text-foreground/80">
                            <p className="mb-6">
                                日本でITエンジニアとしてキャリアアップを目指す方にとって、IPA（情報処理推進機構）の資格は単なる証明書以上の意味を持ちます。昇給・昇進の判断材料になるだけでなく、高度専門職（HSP）ビザや永住権申請の加点対象にもなります。このシステムは明確な4段階に分かれています。
                            </p>

                            <h2 id="level-1" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-12 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-xl">1</span>
                                ITパスポート（iPass）— 共通的知識
                            </h2>
                            <p className="mb-4">
                                <strong><a href="https://www3.jitec.ipa.go.jp/JitesCbt/index.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ITパスポート</a></strong>は最も入門的な資格です。IT専門家だけでなく、<strong>すべての社会人・学生</strong>を対象に設計されています。
                            </p>
                            <div className="space-y-4 mb-6">
                                <div className="flex gap-3">
                                    <Target className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-secondary dark:text-foreground">対象者</h4>
                                        <p className="text-base text-muted-foreground">IT企業の営業・人事・マーケ担当者、理系以外からIT業界への転職希望者、新社会人全般。</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-secondary dark:text-foreground">試験の重点分野</h4>
                                        <ul className="list-disc pl-5 mt-1 text-base text-muted-foreground">
                                            <li><strong>ストラテジ系：</strong>経営戦略、法務（著作権・個人情報保護）</li>
                                            <li><strong>マネジメント系：</strong>プロジェクト管理、システム開発基礎</li>
                                            <li><strong>テクノロジ系：</strong>ハードウェア・ネットワーク・セキュリティ・アルゴリズムの基礎</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-muted/[0.15] border-l-4 border-blue-500 p-5 rounded-r-xl mb-8">
                                <div className="flex items-center gap-2 font-bold text-secondary dark:text-foreground mb-2">
                                    <Lightbulb className="w-5 h-5 text-yellow-500" /> 合格のコツ：
                                </div>
                                <p className="text-base">CBT方式で年中受験可能。プログラミング不要 — 用語を覚えて<a href="/ja/exams" className="text-primary hover:underline">IT Shikenの模擬試験システム</a>で過去問を繰り返すだけで、1〜2ヶ月の勉強で合格できます。</p>
                            </div>

                            <h2 id="level-2" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 text-xl">2</span>
                                FE・SG — 基本情報技術者
                            </h2>
                            <p className="mb-4">
                                正式な<strong>ITエンジニアとしての証明</strong>となる試験です。2つの人気トラックに分かれます：<strong><a href="https://www.ipa.go.jp/shiken/kubun/fe.html" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 hover:underline">FE（基本情報技術者）</a></strong>と<strong><a href="https://www.ipa.go.jp/shiken/kubun/sg.html" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 hover:underline">SG（情報セキュリティマネジメント）</a></strong>。
                            </p>
                            <div className="space-y-4 mb-6">
                                <div className="flex gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-secondary dark:text-foreground">FE試験の構成（独自形式）：</h4>
                                        <ul className="list-disc pl-5 mt-1 text-base text-muted-foreground">
                                            <li><strong>科目A（90分）：</strong>四肢択一60問。離散数学・アルゴリズム・OS・DB・ネットワーク・マネジメント等。</li>
                                            <li><strong>科目B（100分）：</strong>20問。最難関パート — 擬似言語によるアルゴリズム問題16問＋セキュリティ4問。</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <blockquote className="border-l-4 border-border/60 bg-muted/[0.25] p-5 italic text-foreground/70 rounded-r-xl text-base">
                                「2023年の改訂以降、科目BはC・Java・Pythonなどの実言語を廃止し、完全に擬似言語に移行。構文の暗記ではなく、純粋なアルゴリズム的思考力が問われます。」
                            </blockquote>

                            <h2 id="level-3" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 text-xl">3</span>
                                AP — 応用情報技術者・システム設計
                            </h2>
                            <p className="mb-4">
                                <strong><a href="https://www.ipa.go.jp/shiken/kubun/ap.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">応用情報技術者（AP）</a></strong>はシニアエンジニア・チームリード・BrSEの黄金資格。取得すると永住権・HSPビザの<strong>加点に大きく貢献</strong>します。
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                <div className="border border-border/60 p-5 rounded-xl">
                                    <h4 className="font-bold text-secondary dark:text-foreground mb-2 text-base border-b pb-2 border-border/50">午前（四肢択一）</h4>
                                    <p className="text-sm text-muted-foreground">80問／150分。60点以上で合格。マイクロプロセッサ・暗号アルゴリズム・DB正規化（第3・第4正規形）など非常に広い範囲をカバー。</p>
                                </div>
                                <div className="border border-border/60 p-5 rounded-xl">
                                    <h4 className="font-bold text-secondary dark:text-foreground mb-2 text-base border-b pb-2 border-border/50">午後（記述・事例解析）</h4>
                                    <p className="text-sm text-muted-foreground">150分。必須1問（セキュリティ）＋専門分野10問中4問選択（プログラミング・DB・NW・組込み・監査…）。A4数ページのシステム事例を読み込んで記述解答。</p>
                                </div>
                            </div>

                            <h2 id="level-4" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 text-xl">4</span>
                                高度専門家（スペシャリスト）
                            </h2>
                            <p className="mb-4">IPAの「ラスボス」 — 合格率は通常<strong>10〜15%</strong>のみ。学術知識だけでは不十分で、実際のプロジェクト経験が必須です。</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base mb-8">
                                <div className="p-3 border border-border/60 rounded-xl bg-muted/[0.15]"><strong className="text-purple-600 dark:text-purple-400"><a href="https://www.ipa.go.jp/shiken/kubun/nw.html" target="_blank" rel="noopener noreferrer" className="hover:underline">NW（ネットワークスペシャリスト）</a>：</strong>ネットワーク設計の専門家。</div>
                                <div className="p-3 border border-border/60 rounded-xl bg-muted/[0.15]"><strong className="text-purple-600 dark:text-purple-400"><a href="https://www.ipa.go.jp/shiken/kubun/db.html" target="_blank" rel="noopener noreferrer" className="hover:underline">DB（データベーススペシャリスト）</a>：</strong>DB設計・最適化の専門家。</div>
                                <div className="p-3 border border-border/60 rounded-xl bg-muted/[0.15]"><strong className="text-purple-600 dark:text-purple-400"><a href="https://www.ipa.go.jp/shiken/kubun/pm.html" target="_blank" rel="noopener noreferrer" className="hover:underline">PM（プロジェクトマネージャ）</a>：</strong>国際標準のPM資格。</div>
                                <div className="p-3 border border-border/60 rounded-xl bg-muted/[0.15]"><strong className="text-purple-600 dark:text-purple-400"><a href="https://www.ipa.go.jp/shiken/kubun/sa.html" target="_blank" rel="noopener noreferrer" className="hover:underline">SA（システムアーキテクト）</a>：</strong>ソリューション全体設計。</div>
                                <div className="p-3 border border-border/60 rounded-xl bg-muted/[0.15] sm:col-span-2"><strong className="text-purple-600 dark:text-purple-400"><a href="https://www.ipa.go.jp/shiken/kubun/sc.html" target="_blank" rel="noopener noreferrer" className="hover:underline">SC（情報セキュリティスペシャリスト）</a>：</strong>情報セキュリティの国家資格。</div>
                            </div>
                            <p className="text-base text-foreground/80">
                                <strong>論文の壁：</strong>PM・SA・ITストラテジスト（ST）区分の午後Ⅱは、実際に携わったプロジェクトについて<strong>120分で2,000〜3,000字の論文を手書き</strong>する必要があります。日本語ネイティブ以外にとって最大の障壁です。
                            </p>

                            <div className="mt-16 pt-8 border-t border-border/50">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-sm font-semibold text-secondary dark:text-foreground">タグ：</span>
                                    {postDetail.tags.map((tag) => (
                                        <a key={tag} href={`/tag/${tag}`} className="px-3 py-1.5 bg-muted/50 border border-border/40 text-foreground/70 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors font-medium">#{tag}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>

                    <aside className="hidden lg:block lg:col-span-3 space-y-8">
                        <div className="sticky top-24 bg-background/60 p-6 rounded-2xl border border-border/50">
                            <h3 className="font-bold text-base text-secondary dark:text-foreground mb-5 flex items-center gap-2 pb-3 border-b border-border/50">
                                <Bookmark className="w-4 h-4 text-primary" /> 目次
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#level-1" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group"><span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">1</span>ITパスポート</a></li>
                                <li><a href="#level-2" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group"><span className="flex-shrink-0 w-6 h-6 rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 flex items-center justify-center text-xs font-bold group-hover:bg-green-600 group-hover:text-white transition-colors">2</span>FE・SG</a></li>
                                <li><a href="#level-3" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group"><span className="flex-shrink-0 w-6 h-6 rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 flex items-center justify-center text-xs font-bold group-hover:bg-orange-600 group-hover:text-white transition-colors">3</span>応用情報（AP）</a></li>
                                <li><a href="#level-4" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group"><span className="flex-shrink-0 w-6 h-6 rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center justify-center text-xs font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors">4</span>高度専門家</a></li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="bg-gradient-to-br from-secondary/60 to-secondary dark:to-secondary/80 rounded-2xl p-8 sm:p-10 text-center shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-4">IT資格の試験対策、準備はできていますか？</h3>
                    <p className="text-white/80 mb-8 max-w-2xl mx-auto">IT Shikenでは、本番に近い無料の模擬試験・自動採点・詳細な解答解説を提供しています。今すぐ始めましょう — 登録不要！</p>
                    <Button asChild className="text-lg !py-6"><Link href="/ja/exams">今すぐ模擬試験を受ける</Link></Button>
                </div>
            </div>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border/50">
                <h3 className="text-2xl font-bold text-secondary dark:text-foreground mb-8">関連記事</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postDetail.relatedPosts.map((post) => (
                        <a key={post.id} href={post.href} className="group block">
                            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-muted/50">
                                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                <Calendar className="w-3.5 h-3.5" />{post.date}
                            </div>
                            <h4 className="font-bold text-lg text-secondary dark:text-foreground group-hover:text-primary transition-colors line-clamp-2">{post.title}</h4>
                        </a>
                    ))}
                </div>
            </section>
        </main>
    );
}
