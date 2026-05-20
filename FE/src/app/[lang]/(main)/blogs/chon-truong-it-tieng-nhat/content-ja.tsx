import Image from 'next/image';
import {
    Bookmark, Calendar, Clock, Share2,
    Eye, MessageSquare, ChevronRight,
    CheckCircle2, Target, Lightbulb, AlertTriangle
} from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';

// Custom SVG Icons for Brands
const Facebook = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const Twitter = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;

const postDetail = {
    id: 'chon-truong-it-tieng-nhat',
    title: 'ITと日本語を両方学べる大学の選び方：Uni2InsightとIT Shikenを活用しよう',
    excerpt: 'デジタル時代において、ITと日本語のスキルを同時に習得することは、高収入のキャリアへの近道です。どのように大学を選びますか？Uni2Insightの口コミとIT Shikenを活用した学習方法について解説します。',
    coverImage: '/uni2insight-real.png',
    author: {
        name: 'Trần Thiên Phú',
        role: 'Author',
        avatar: '/Shin.png',
        bio: '日本で5年以上の実務経験を持つエンジニア。プログラミング、日本のIT企業文化、キャリアアップについての知識を共有しています。',
    },
    date: '20/05/2026',
    category: 'キャリアガイド',
    readTime: '8 分',
    views: '1.2K',
    comments: 12,
    tags: ['IT日本語', '大学選び', 'Uni2Insight', 'IT Shiken', 'ブリッジSE'],
    relatedPosts: [
        {
            id: 'lo-trinh-hoc-it',
            title: '日本のIT資格ロードマップ（IPA）：初心者からエキスパートまで',
            image: '/it-roadmap.png',
            date: '08/05/2026',
            href: '/ja/blogs/lo-trinh-hoc-it'
        },
        {
            id: 'ky-thi-it-passport',
            title: 'ITパスポート試験とは？完全対策ガイドA-Z',
            image: '/blog-it-passport-thumbnail.jpg',
            date: '01/05/2026',
            href: '/ja/blogs/ky-thi-it-passport'
        },
        {
            id: 'ky-thi-fe',
            title: 'FE（基本情報技術者）試験とは？合格のための完全解説',
            image: '/blog-it-fe-thumbnail.jpg',
            date: '01/05/2026',
            href: '/ja/blogs/ky-thi-fe'
        },
    ]
};

export default function DetailedPostJa() {
    return (
        <main className="min-h-screen bg-background transition-colors duration-300">
            {/* HERO SECTION */}
            <header className="bg-background border-b border-border/50 pt-12 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                        <Link href="/" className="hover:text-primary transition-colors">ホーム</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/ja/blogs" className="hover:text-primary transition-colors">ブログ</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground/80 truncate">{postDetail.title}</span>
                    </nav>

                    <div className="mb-6">
                        <span className="inline-block bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {postDetail.category}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-secondary dark:text-foreground mb-6 leading-[1.2]">
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
                                className="w-14 h-14 rounded-full border-2 border-border/60 object-cover"
                            />
                            <div>
                                <div className="font-bold text-secondary dark:text-foreground text-base">{postDetail.author.name}</div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {postDetail.date}</span>
                                    <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-border/60"></span>
                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {postDetail.readTime} 読む</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                            <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"><Eye className="w-5 h-5" /> {postDetail.views}</span>
                            <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"><MessageSquare className="w-5 h-5" /> {postDetail.comments}</span>
                            <div className="flex items-center gap-2 pl-4 border-l border-border/40">
                                <button className="p-2 rounded-full hover:bg-muted/60 hover:text-primary transition-colors" title="共有">
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-full hover:bg-muted/60 hover:text-primary transition-colors" title="保存">
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
                    <article className="lg:col-span-9 bg-background rounded-2xl border border-border/60 overflow-hidden">
                        <figure className="w-full bg-muted/[0.2] p-4">
                            <Image
                                src={postDetail.coverImage}
                                alt="ITと日本語を学べる大学選び"
                                width={1200}
                                height={800}
                                className="w-full h-auto object-contain rounded-lg"
                                priority
                            />
                            <figcaption className="text-center text-sm text-muted-foreground/60 mt-3 italic">
                                ITと日本語を同時に学ぶことは、日本市場における高い就職力に直結します。
                            </figcaption>
                        </figure>

                        <div className="p-6 sm:p-10 text-lg leading-relaxed text-foreground/80">
                            <p className="mb-6 drop-cap">
                                デジタル時代において、ITスキルは強力な武器ですが、さらに日本語を習得すれば、高年収のキャリアへの「プラチナチケット」を手に入れたことになります。日系企業で働くブリッジシステムエンジニア（BrSE）やプログラマーへの需要は、非常に高まっています。
                            </p>
                            <p className="mb-6">
                                しかし、学生や保護者にとって最大の悩みは<strong>「どちらも一流レベルで学べる大学はどこか？」</strong>ということです。プログラミングの授業は充実していても日本語教育がおろそかな学校や、提携プログラムをアピールしていても学費が非常に高く実態が曖昧な学校もあります。どうすれば信頼できる情報を見つけられるでしょうか？
                            </p>
                            <p className="mb-8">
                                その答えは、非常に画期的なプラットフォーム**Uni2Insight**にあります。
                            </p>

                            {/* SECTION 1 */}
                            <h2 id="part-1" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-12 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-xl">1</span>
                                Uni2Insightとは？なぜ学生の味方なのか？
                            </h2>
                            <p className="mb-6">
                                Facebookなどのグループで「X大学のIT日本語コースはどうですか？」と質問しても、宣伝や抽象的な回答しか得られず、がっかりしたことはありませんか？Uni2Insightは、そうした課題を解決するサービスです。
                            </p>
                            <p className="mb-6">
                                <a href="https://uni2insight.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Uni2Insight</a>は、ベトナム国内の大学・専門学校・学科に関する評価やリアルな口コミをまとめているプラットフォームです。<strong>すべて現役学生や卒業生の実体験に基づいた信頼性の高い情報</strong>が提供されています。
                            </p>
                            
                            <div className="bg-muted/[0.15] border-l-4 border-blue-500 p-5 rounded-r-xl mb-8">
                                <div className="flex items-center gap-2 font-bold text-secondary dark:text-foreground mb-2">
                                    <Lightbulb className="w-5 h-5 text-yellow-500" /> Uni2Insightの特徴：
                                </div>
                                <p className="text-base">
                                    匿名での投稿が可能なため、大学のパンフレットには載っていない「リアルな裏事情」や「不満な点」も含めて、ありのままの情報を確認することができます。
                                </p>
                            </div>

                            {/* SECTION 2 */}
                            <h2 id="part-2" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 text-xl">2</span>
                                「IT＋日本語」専攻の学生がUni2Insightを見るべき理由
                            </h2>
                            <p className="mb-6">
                                ITと外国語の同時習得は学習量が非常に多いため、環境選びに失敗すると挫折しやすくなります。Uni2Insightを活用することで、以下の情報を事前に入手できます：
                            </p>

                            <div className="space-y-6 mb-8">
                                <div className="flex gap-3">
                                    <Target className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-secondary dark:text-foreground text-lg">双方の教育の質の実態</h4>
                                        <p className="text-base text-muted-foreground mt-1">
                                            ITの専門知識に加え、日本語の読み書きや会話のスキルを本当に身につけられるのか、先輩たちの本音レビューから確認できます。
                                        </p>
                                        <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                                            <li><strong>IT分野：</strong> 最新の技術（React, Node.js, AI, クラウドなど）が学べるか？</li>
                                            <li><strong>日本語分野：</strong> 卒業までにビジネスで使えるJLPT（N3、N2）レベルに到達できるカリキュラムか？</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-secondary dark:text-foreground text-lg">日系企業へのインターンシップ実績</h4>
                                        <p className="text-base text-muted-foreground mt-1">
                                            「日系コース」と謳う高額な提携プログラムが、学費に見合った価値を提供しているか？日系大手企業への実習の機会が本当にあるかを確認できます。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* SECTION 3 */}
                            <h2 id="part-3" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 text-xl">3</span>
                                最適なロードマップ：大学での学びとIT Shikenでの資格取得
                            </h2>
                            <p className="mb-6">
                                Uni2Insightで相性の良い大学を見つけることは重要ですが、それは最初の一歩に過ぎません。日本市場での市場価値を高めるためには、日本国家規格のIT資格である**ITパスポート**や**基本情報技術者（FE）**を取得することが非常に効果的です。
                            </p>
                            <p className="mb-6">
                                そこで、ベトナム人向けのIT資格対策プラットフォーム**IT Shiken**の出番です。
                            </p>

                            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-r-xl mb-8">
                                <div className="flex items-center gap-2 font-bold text-secondary dark:text-foreground mb-2 text-amber-700 dark:text-amber-400">
                                    <AlertTriangle className="w-5 h-5 text-amber-500" /> 将来のBrSEに向けたアドバイス：
                                </div>
                                <p className="text-base">
                                    大学1・2年生のうちに**ITパスポート**を、3・4年生の時に**FE**試験の合格を目指しましょう。<Link href="/ja/exams" className="text-blue-600 hover:underline font-semibold">IT Shiken</Link>では、いつでも無料で本番に近い模擬試験を受けることができ、詳細な日本語・ベトナム語解説で効率よく学習できます。
                                </p>
                            </div>

                            {/* SECTION 4 */}
                            <h2 id="part-4" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 text-xl">4</span>
                                Uni2Insightでの検索方法
                            </h2>
                            <p className="mb-6">
                                Uni2Insightを効果的に使いこなす手順です：
                            </p>
                            <ul className="list-decimal pl-6 space-y-3 mb-8">
                                <li><strong>検索バーの活用:</strong> 「IT 日本語コース」や特定の大学名を入力します。</li>
                                <li><strong>項目別スコアの確認:</strong> 「授業の質」「施設・設備」「就職サポート」などの詳細な数値をチェックします。</li>
                                <li><strong>具体的な口コミを閲覧:</strong> メリットとデメリットの両方が丁寧に記述されている評価を優先して参考にしましょう。</li>
                            </ul>

                            {/* SECTION 5 */}
                            <h2 id="part-5" className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-16 mb-6 scroll-mt-24 flex items-center gap-3">
                                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 text-xl">5</span>
                                終わりに：未来への第一歩を賢く選択しよう
                            </h2>
                            <p className="mb-6">
                                進学先を決めることは、将来のキャリアパスを左右する重要な決定です。誇大広告に騙されず、インターネットのプラットフォームを賢く使って実態を掴みましょう。
                            </p>
                            <p className="mb-6">
                                ぜひ<strong>Uni2Insight</strong>で大学の実態を確認してみてください。同時に、プログラミングやIT知識の対策教材が揃っている<strong>IT Shiken</strong>でしっかりと準備を行い、安定した将来を勝ち取りましょう。
                            </p>

                            {/* Tags Section */}
                            <div className="mt-16 pt-8 border-t border-border/40">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-sm font-semibold text-secondary dark:text-foreground">Tags:</span>
                                    {postDetail.tags.map((tag) => (
                                        <Link key={tag} href={`/tag/${tag}`} className="px-3 py-1.5 bg-muted/50 border border-border/40 text-foreground/70 text-sm rounded-md hover:bg-muted hover:text-foreground transition-colors font-medium">
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* RIGHT COLUMN: TABLE OF CONTENTS */}
                    <aside className="hidden lg:block lg:col-span-3 space-y-8">
                        <div className="sticky top-24 bg-background/60 border border-border/50 p-6 rounded-2xl">
                            <h3 className="font-bold text-base text-secondary dark:text-foreground mb-5 flex items-center gap-2 pb-3 border-b border-border/40">
                                <Bookmark className="w-4 h-4 text-primary" /> 目次
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <a href="#part-1" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">1</span>
                                        Uni2Insightとは？
                                    </a>
                                </li>
                                <li>
                                    <a href="#part-2" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">2</span>
                                        利用するメリット
                                    </a>
                                </li>
                                <li>
                                    <a href="#part-3" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">3</span>
                                        IT Shikenの活用
                                    </a>
                                </li>
                                <li>
                                    <a href="#part-4" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">4</span>
                                        検索のコツ
                                    </a>
                                </li>
                                <li>
                                    <a href="#part-5" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors group">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-md bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors">5</span>
                                        まとめ
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>

            {/* CTA BOX */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="bg-gradient-to-br from-secondary/60 to-secondary dark:to-secondary/80 rounded-2xl p-8 sm:p-10 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">日系IT業界へ挑戦しませんか？</h3>
                    <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                        Uni2Insightで大学の評判を調べ、IT ShikenでITパスポートや基本情報の合格対策を今すぐスタートしましょう！
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild className="text-lg !py-6 bg-white text-secondary hover:bg-white/90">
                            <a href="https://uni2insight.com" target="_blank" rel="noopener noreferrer">Uni2Insightを見る</a>
                        </Button>
                        <Button asChild className="text-lg !py-6">
                            <Link href="/ja/exams">IT Shikenで学習</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* RELATED POSTS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border/40">
                <h3 className="text-2xl font-bold text-secondary dark:text-foreground mb-8">関連する記事</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postDetail.relatedPosts.map((post) => (
                        <Link key={post.id} href={post.href} className="group block">
                            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-muted/50">
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
                            <h4 className="font-bold text-lg text-secondary dark:text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                {post.title}
                            </h4>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
