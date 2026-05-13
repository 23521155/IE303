import Image from 'next/image';
import { Bookmark, Calendar, Clock, Share2 } from 'lucide-react';
import React from 'react';

const postDetail = {
    id: 'ky-thi-ap',
    title: '応用情報技術者試験（AP）とは？',
    excerpt: 'AP資格 - 日本のシニアソフトウェアエンジニアのキャリアへの確かな足がかり。',
    coverImage: '/blog-it-passport-thumbnail.jpg',
    author: {
        name: 'Trần Thiên Phú',
        role: 'Author',
        avatar: '/avatar-Phi.jpg',
    },
    date: '08/05/2026',
    category: 'IT資格',
    readTime: '25分',
    tags: ['AP', '応用情報技術者試験', 'Itshiken', '日本', 'キャリア'],
};

export default function ContentJa() {
    return (
        <main className="min-h-screen bg-background py-8 transition-colors duration-300 text-foreground/90">
            {/* HEADER */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="mb-4">
                    <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider">
                        {postDetail.category}
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-secondary dark:text-foreground mb-6 leading-tight">
                    {postDetail.title}
                </h1>

                <p className="text-lg text-muted-foreground mb-8 max-w-4xl">{postDetail.excerpt}</p>

                {/* META */}
                <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-border/40">
                    <div className="flex items-center gap-3">
                        <Image
                            src={postDetail.author.avatar}
                            alt={postDetail.author.name}
                            height={48}
                            width={48}
                            className="w-12 h-12 rounded-full border border-border/60 object-cover"
                        />
                        <div>
                            <div className="font-semibold text-secondary dark:text-foreground">{postDetail.author.name}</div>
                            <div className="text-xs text-muted-foreground">{postDetail.author.role}</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {postDetail.date}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {postDetail.readTime}
                        </div>

                        <div className="flex items-center gap-2 pl-4 border-l border-border/40">
                            <button className="p-2 rounded-full hover:bg-muted/60 hover:text-primary transition-colors">
                                <Share2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-muted/60 hover:text-primary transition-colors">
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
                    className="w-full h-auto max-h-[500px] object-cover rounded-2xl border border-border/60"
                />
            </div>

            {/* CONTENT */}
            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-lg leading-relaxed text-foreground/80">
                <p className="mb-6">
                    FEに合格した場合、日本でのソフトウェアエンジニアのキャリアのはしごの次のステップは、AP（応用情報技術者）資格です。
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-12 mb-6 pb-2 border-b border-border/50">
                    1. APはFEとどう違うのですか？
                </h2>
                <p className="mb-4">
                    FEが「コードを書き、システムを理解する」能力を評価するのに対し、APは「システムを設計し、プロジェクトを管理する」能力を評価します。
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>C、Java、またはPythonでの基本的なアルゴリズムを必要とする試験はもうありません。</li>
                    <li>データベース設計、システムアーキテクチャ、およびビジネス戦略に重点を置いています。</li>
                    <li>午後の試験は、分析と解決策を必要とするケーススタディ問題で構成されています。</li>
                </ul>

                <h2 className="text-2xl sm:text-3xl font-bold text-secondary dark:text-foreground mt-12 mb-6 pb-2 border-b border-border/50">
                    2. AP資格のメリット
                </h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>シニアレベルの確認：</strong>多くの企業は、プロジェクトマネージャーまたはリーダーのポジションへの昇進にAPを必要とします。</li>
                    <li><strong>ビザポイント：</strong>APは、日本で高度専門職ビザを申請する際に重要なポイントをもたらします。</li>
                </ul>
            </article>
        </main>
    );
}
