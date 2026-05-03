import Image from 'next/image';
import { AlertTriangle, Bookmark, Calendar, CheckCircle2, Clock, Info, Link as LinkIcon, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import React from 'react';

const postDetail = {
    id: 'ky-thi-fe',
    title: 'FE試験とは？合格のための完全ガイド',
    excerpt: '定義、試験の構成、申し込み方法から学習ロードマップまで。',
    coverImage: '/blog-it-fe-thumbnail.jpg',
    author: {
        name: 'Nguyễn Lê Tuấn Phi',
        role: 'Author',
        avatar: '/avatar-Phi.jpg',
    },
    date: '01/05/2026',
    category: 'IT資格',
    readTime: '30分',
    tags: ['FE', '基本情報技術者試験', 'Itshiken', '日本', 'キャリア'],
};

const compareStyles = {
    // .compare
    container: 'grid grid-cols-1 sm:grid-cols-2 gap-4 my-6',

    // .compare-card
    cardBase: 'rounded-md p-5 border-2 transition-colors',

    // .compare-card.fe & .compare-card.ip
    cardVariants: {
        fe: 'border-primary bg-primary/10 dark:border-blue-700 dark:bg-blue-900/20',
        ip: 'border-secondary bg-gray-50 dark:border-blue-500 dark:bg-blue-900/10',
    },

    // .compare-card h4
    titleBase: 'text-[15px] font-bold mb-2.5',
    titleVariants: {
        fe: 'text-primary dark:text-blue-400',
        ip: 'text-secondary dark:text-blue-400',
    },

    // .compare-card ul & li
    list: 'list-disc pl-4 m-0 space-y-1.5',
    listItem: 'text-sm text-secondary dark:text-slate-300',
};
const sessionStyles = {
    container: 'grid grid-cols-1 sm:grid-cols-2 gap-4 my-6',
    cardBase: 'rounded-md p-5 border-2 transition-colors',
    cardVariants: {
        morning: 'border-primary bg-primary/10 dark:border-blue-700 dark:bg-blue-900/20',
        afternoon: 'border-secondary bg-gray-50 dark:border-blue-500 dark:bg-blue-900/10',
    },
    titleBase: 'text-[15px] font-bold mb-2.5',
    titleVariants: {
        morning: 'text-primary dark:text-blue-400',
        afternoon: 'text-secondary dark:text-blue-400',
    },
    text: 'text-sm mb-1.5 text-slate-600 dark:text-slate-400',
    strong: 'font-semibold text-slate-900 dark:text-slate-200',
};

export default function ContentJa() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#121212] py-8 transition-colors duration-300 text-slate-900 dark:text-slate-200">
            {/* HEADER */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="mb-4">
                    <span className="bg-primary text-white dark:bg-blue-900 dark:text-blue-100 text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
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
                            {postDetail.readTime} 読む
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
                    alt="IT FEとは - 日本の情報処理技術者試験"
                    width={500}
                    height={500}
                    className="w-full h-auto max-h-[500px] object-cover rounded-md shadow-sm"
                />
                <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
                    FE資格とは？
                </figcaption>
            </div>

            {/* CONTENT */}
            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                <p className="mb-4">
                    IT業界で働いており、自分の能力を証明するための資格が欲しい場合、または日本の労働市場を目指している場合は、FE資格について聞いたことがあるでしょう。しかし、具体的にFEとは何か、何を学ぶのか、そして全くの初心者からでも合格できるのでしょうか？
                </p>

                <p className="mb-6">
                    この記事では、すべてにお答えします。難しい専門用語は抜きにして、実践的な情報と、始めるにあたって本当に知っておくべきことだけをお伝えします。
                </p>

                {/* TABLE OF CONTENTS (TOC) */}
                <nav className="bg-primary/10 dark:bg-blue-900/10 border-l-4 border-primary rounded-r-md p-6 my-10">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary dark:text-blue-400 mb-4">
                        目次
                    </h3>
                    <ul className="space-y-2 text-base text-secondary">
                        <li>
                            <a
                                href="#it-fe-la-gi"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                1. FE資格とは？
                            </a>
                        </li>
                        <li>
                            <a
                                href="#fe-khac-it-passport"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                2. FEとITパスポートの違いは？
                            </a>
                        </li>
                        <li>
                            <a
                                href="#cau-truc-de-thi"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                3. 試験構成の詳細
                            </a>
                        </li>
                        <li>
                            <a
                                href="#loi-ich"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                4. FE資格取得の実践的なメリット
                            </a>
                        </li>
                        <li>
                            <a
                                href="#dang-ky"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                5. 日本とベトナムでの受験申込方法
                            </a>
                        </li>
                        <li>
                            <a
                                href="#lo-trinh-on-luyen"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                6. ゼロからの3ヶ月学習ロードマップ
                            </a>
                        </li>
                        <li>
                            <a href="#faq" className="hover:text-primary dark:hover:text-blue-400 transition-colors">
                                7. よくある質問 (FAQ)
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* SECTION 1 */}
                <h2
                    id="it-fe-la-gi"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    1. FE資格とは？
                </h2>
                <p className="mb-6">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://viblo.asia/p/thi-do-chung-chi-ki-su-cntt-chuan-nhat-ban-fe-fundamental-information-technology-engineers-examination-tu-con-so-0-eW65GGO65DO"
                        className="font-medium text-primary underline mr-1"
                    >
                        FE
                    </a>
                    – <strong>基本情報技術者試験（Fundamental Information Technology Engineer Examination）</strong> –
                    は、日本の標準的な基本的なITエンジニアの資格です。これは<strong>IPA</strong>
                    （情報処理推進機構）が主催し、日本の経済産業省（METI）が正式に認定する国家試験です。
                </p>
                <p className="mb-6">
                    FEの特別な点は、<strong>どこで学んだか、どのような学位を持っているかは問われない</strong>
                    ということです。この資格は、理論とプログラミング能力の両方を含む、IT分野におけるあなたの実践的な知識とスキルのみを評価します。
                </p>

                {/* INFO BOX */}
                <div className="flex gap-4 bg-primary/10 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-5 my-8">
                    <Info className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-secondary dark:text-blue-100 m-0">
                        FEは、日本のITスキル標準（ITSS）の<strong>レベル2</strong>
                        に位置付けられています。これはITパスポート（レベル1）の次のステップであり、AP、PM、SCなどのより高いレベルへステップアップするための基盤となります。
                    </p>
                </div>

                {/* SECTION 2 */}
                <h2
                    id="fe-khac-it-passport"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    2. FEとITパスポートの違いは？
                </h2>

                <p className="mb-6">
                    多くの人が「すでにITパスポートを持っているが、次にFEを学ぶ価値はあるか？」とよく尋ねます。その答えは、
                    <strong>これら2つの資格は、対象者、難易度、内容の点で完全に異なる</strong>
                    ということです。簡単にイメージできるように、以下の比較をご覧ください：
                </p>
                <div className={compareStyles.container}>
                    <div className={`${compareStyles.cardBase} ${compareStyles.cardVariants.fe}`}>
                        <h4 className={`${compareStyles.titleBase} ${compareStyles.titleVariants.fe}`}>
                            FE資格 (レベル2)
                        </h4>
                        <ul className={compareStyles.list}>
                            <li className={compareStyles.listItem}>エンジニア、開発者、プログラマー向け</li>
                            <li className={compareStyles.listItem}>実践スキルセクション（午後試験）を含む</li>
                            <li className={compareStyles.listItem}>アルゴリズム的およびプログラミング的思考が必要</li>
                            <li className={compareStyles.listItem}>合格率は約20〜25％</li>
                            <li className={compareStyles.listItem}>日本のビザ取得時に大学の学位の代わりになる</li>
                        </ul>
                    </div>

                    <div className={`${compareStyles.cardBase} ${compareStyles.cardVariants.ip}`}>
                        <h4 className={`${compareStyles.titleBase} ${compareStyles.titleVariants.ip}`}>
                            ITパスポート (レベル1)
                        </h4>
                        <ul className={compareStyles.list}>
                            <li className={compareStyles.listItem}>非ITを含むすべての対象者向け</li>
                            <li className={compareStyles.listItem}>多肢選択式の理論セクションのみ</li>
                            <li className={compareStyles.listItem}>一般的な知識、マネジメント、戦略</li>
                            <li className={compareStyles.listItem}>合格率は約52％</li>
                            <li className={compareStyles.listItem}>ビザ取得時に大学の学位の代わりにならない</li>
                        </ul>
                    </div>
                </div>
                <p>
                    要するに、ITパスポートは業界に入るための「ITパスポート」であり、FEはあなたが実際に仕事ができることを証明するための「エンジニアの身分証明書」です。開発者であるか、プロのエンジニアになりたいのであれば、FEが真の目標となります。
                </p>

                {/* SECTION 3 */}
                <h2
                    id="cau-truc-de-thi"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    3. FE試験構成の詳細
                </h2>
                <p className="mb-6">
                    これは最もよく尋ねられる部分です。試験の構成を明確に知ることで、学習時間をより賢く割り当てることができます。
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 my-6 text-center font-medium">
                    これは、学習を始める前に把握しておくべき最も重要な部分です。FE試験は
                    <strong>2つの別々のセクション</strong>
                    で構成されており、それぞれ「午前試験」と「午後試験」と呼ばれ、同日にそれぞれ150分間行われます。
                </div>

                <div className={sessionStyles.container}>
                    {/* Card Buổi Sáng */}
                    <div className={`${sessionStyles.cardBase} ${sessionStyles.cardVariants.morning}`}>
                        <h4 className={`${sessionStyles.titleBase} ${sessionStyles.titleVariants.morning}`}>
                            午前試験 – 理論
                        </h4>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>時間:</strong> 150分
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>問題数:</strong> 短答式多肢選択問題 80問
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>1問あたりの配点:</strong> 1.25点
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>合格基準:</strong> 48/80問以上正解 (60点以上)
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>内容:</strong> 総合的なIT知識 –
                            ハードウェア、ネットワーク、データベース、セキュリティ、アルゴリズム、プロジェクトマネジメント、法務など
                        </p>
                    </div>

                    {/* Card Buổi Chiều */}
                    <div className={`${sessionStyles.cardBase} ${sessionStyles.cardVariants.afternoon}`}>
                        <h4 className={`${sessionStyles.titleBase} ${sessionStyles.titleVariants.afternoon}`}>
                            午後試験 – スキル
                        </h4>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>時間:</strong> 150分
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>問題数:</strong>{' '}
                            大問8問、それぞれに複数の小問を含む
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>構成:</strong>{' '}
                            問1〜5は必須（各12点）、問6は必須（20点）、問7または問8のいずれかを選択（20点）
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>合格基準:</strong> 60点以上
                        </p>
                        <p className={sessionStyles.text}>
                            <strong className={sessionStyles.strong}>内容:</strong>{' '}
                            プログラミング（C/Java/Python/アセンブラ/表計算）、アルゴリズム、システム設計、実践的なセキュリティ
                        </p>
                    </div>
                </div>

                {/* WARNING BOX */}
                <div className="flex gap-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-md p-5 my-8">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-yellow-900 dark:text-yellow-100 m-0">
                        重要：両方のセクションでそれぞれの合格基準を満たす必要があります。片方のセクションに合格した場合、その結果は
                        <strong>直後の試験に免除（保留）され</strong>
                        、残りのセクションのみを再受験する必要があります。これは、他の多くの資格と比較して、FEのかなり「受験者に優しい」点です。
                    </p>
                </div>

                {/* TIẾP TỤC SECTION 3 */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3">習得すべき主要な知識分野</h3>
                <p className="mb-6">FE試験の範囲は非常に広いですが、主に以下の分野に焦点を当てています：</p>

                <div className="overflow-x-auto mb-8">
                    <table className="w-full border border-slate-200 dark:border-slate-700 text-sm text-left">
                        <thead className="bg-[#053825] text-white">
                            <tr>
                                <th className="px-4 py-3 font-semibold border border-slate-300 dark:border-slate-600">
                                    トピック
                                </th>
                                <th className="px-4 py-3 font-semibold border border-slate-300 dark:border-slate-600">
                                    主な重要項目
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700 dark:text-slate-300">
                            <tr className="bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    基礎情報科学
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    2進数、基数変換、論理演算、データ構造（スタック、キュー、ツリー、ハッシュ）
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    コンピュータアーキテクチャ
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    RAM、CPU、スケジューリングアルゴリズム（FIFO、LRU）、キャッシュメモリ
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    コンピュータネットワーク
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    TCP/IP、DNS、DHCP、NAT、一般的なプロトコル
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    データベース
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    SQL、DB設計、リレーション、正規化
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    セキュリティ
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    SQLインジェクション、フィッシング、暗号化、セキュリティポリシー
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    ソフトウェア開発
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    開発ライフサイクル、テスト（単体テスト、結合テスト）、オブジェクト指向設計
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    マネジメントと戦略
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    プロジェクト管理、損益分岐点、ビジネス戦略、IT監査
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    プログラミング（午後試験）
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    アルゴリズム、フローチャート、C/Java/Pythonコード – 最も得意な1言語を選択
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <figure className="my-8">
                    {/* Sử dụng thẻ img thay vì Image của Next.js để tránh lỗi cấu hình domain host (nếu có) với Unsplash */}
                    <Image
                        width={500}
                        height={500}
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=75"
                        alt="午後FE試験のプログラミングコードを表示するコンピュータ画面"
                        className="w-full h-auto object-cover rounded-md shadow-sm"
                        loading="lazy"
                    />
                    <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
                        FEの午後試験では、実践的なプログラミング的思考が求められます。テストを受けるには、最も自信のある言語を選択します。
                    </figcaption>
                </figure>

                {/* SECTION 4 */}
                <h2
                    id="loi-ich"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    4. FE資格取得の実践的なメリット
                </h2>
                <p className="mb-4">
                    他の国際的なIT資格よりもFEを選ぶ理由は何でしょうか？日本で働く多くのベトナム人エンジニアが共有する理由は以下の通りです：
                </p>

                <h3 className="text-xl font-bold text-primary dark:text-blue-400 mt-6 mb-3">
                    日本での就労ビザの申請 – 大学の学位は不要
                </h3>
                <p className="mb-4">
                    これが、すべての資格が持っているわけではないFEの「キラー機能（最大の魅力）」です。通常、日本でITエンジニアの就労ビザを申請するには、関連する大学の学位、または10年以上の経験が必要です。しかし、
                    <strong>FE資格を取得していれば、上記の2つの条件の両方を代替することができます</strong>
                    。大学の学位は持っていないが、技術的なスキルが本当に高い人にとって、これは非常に価値のある道です。
                </p>

                <h3 className="text-xl font-bold text-primary dark:text-blue-400 mt-6 mb-3">
                    高度専門職ビザと永住権の加点
                </h3>
                <p className="mb-4">
                    FE資格は、日本の「高度人材ポイント制度」のポイントシステムにカウントされます。これにより、高度専門職（Highly
                    Skilled
                    Worker）ビザ、そしてその後の永住権ビザを申請するためのポイントをより早く蓄積することができます。
                </p>

                <h3 className="text-xl font-bold text-primary dark:text-blue-400 mt-6 mb-3">12カ国で認定</h3>
                <p className="mb-6">
                    FEは日本だけで価値があるわけではありません。<strong>ITPEC</strong>
                    （アジア情報処理試験協議会）の枠組みに基づくFE試験は、インド、シンガポール、韓国、中国、フィリピン、タイ、ベトナム、ミャンマー、台湾、マレーシア、モンゴル、バングラデシュを含むアジアの12か国で同等に認定されています。
                </p>

                {/* SUCCESS BOX */}
                <div className="flex gap-4 bg-primary/10 dark:bg-green-900/20 border-l-4 border-primary dark:border-green-500 rounded-r-md p-5 my-8">
                    <CheckCircle2 className="w-6 h-6 text-primary dark:text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-slate-800 dark:text-green-100 m-0">
                        <strong>永久有効 + より高いレベルへの足がかり:</strong>{' '}
                        ITパスポートと同様に、FE資格には有効期限がありません。そしてFEの後は、AP（応用情報技術者）を制覇し、その後はキャリアパスに応じてPM（プロジェクトマネージャ）、SC（情報処理安全確保支援士）、DB（データベーススペシャリスト）などの専門資格へ進むための確固たる基盤となります。
                    </p>
                </div>

                {/* SECTION 5 */}
                <h2
                    id="dang-ky"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    5. FE試験の受験申込方法
                </h2>
                <div className="overflow-x-auto mb-6">
                    <table className="w-full border border-slate-200 dark:border-slate-700 text-sm text-left">
                        <thead className="bg-[#053825] text-white">
                            <tr>
                                <th className="px-4 py-3 font-semibold border border-slate-300 dark:border-slate-600">
                                    基準
                                </th>
                                <th className="px-4 py-3 font-semibold border border-slate-300 dark:border-slate-600">
                                    🇻🇳 ベトナムの場合
                                </th>
                                <th className="px-4 py-3 font-semibold border border-slate-300 dark:border-slate-600">
                                    🇯🇵 日本の場合
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700 dark:text-slate-300">
                            <tr className="bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    主催機関
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    HITC / VITEC (IPA – ITPECと連携)
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">IPA直接</td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    試験日程
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    年2回 (4月と10月)
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    年2回 (4月と10月)
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    試験言語
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    英語 + ベトナム語翻訳
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    日本語 (N2〜N3程度必要)
                                </td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    試験形式
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    ペーパーテスト
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    CBT（コンピュータベーステスト）
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    受験料
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    ~1,500,000 VND
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">~7,500 円</td>
                            </tr>
                            <tr className="bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    受験地
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    ハノイ、ダナン、ホーチミン、その他の場所
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    日本全国47都道府県
                                </td>
                            </tr>
                            <tr className="bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium border border-slate-200 dark:border-slate-700">
                                    結果発表
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    試験後約20日
                                </td>
                                <td className="px-4 py-3 border border-slate-200 dark:border-slate-700">
                                    試験終了直後に確認可能 (CBT)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* TIP BOX */}
                <div className="flex gap-4 bg-gray-50 dark:bg-blue-900/20 border-l-4 border-secondary dark:border-blue-500 rounded-r-md p-5 my-8">
                    <p className="text-sm sm:text-base text-secondary dark:text-blue-100 m-0">
                        <strong>ヒント:</strong>{' '}
                        ベトナムで受験する場合、試験にはベトナム語の翻訳が付属しているため、英語についてあまり心配する必要はありません。より重要なのは、IT用語を理解することです。ただし可能であれば、
                        <strong>主となる情報源として英語版を読んでください</strong>
                        。多くの人が、ベトナム語の翻訳が時々不自然であると指摘しています。
                    </p>
                </div>

                {/* SECTION 6 */}
                <h2
                    id="lo-trinh"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    6. ゼロからの3ヶ月FE学習ロードマップ
                </h2>

                <figure className="my-8">
                    <Image
                        width={500}
                        height={500}
                        src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=900&q=75"
                        alt="ノートとコンピュータでFE資格の学習計画を立てている人"
                        className="w-full h-auto object-cover rounded-md shadow-sm"
                        loading="lazy"
                    />
                    <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
                        FEの総準備期間は通常、3ヶ月（IT経験者）から5〜6ヶ月（完全な初心者）の範囲です。
                    </figcaption>
                </figure>

                <p className="mb-6">
                    これは、FEに合格した多くの人が共有している実践的なロードマップです。1,200万ドン以上の高額な授業料は必要ありません。豪華なコースも必要ありません。必要なのは、規律と正しい方法だけです。
                </p>

                {/* STEPS */}
                <div className="flex flex-col gap-4 my-8">
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            1
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                1ヶ月目 – 基礎テキストを読む（午前試験）
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                IPA発行の「New FE Textbook Vol.1 &
                                Vol.2」（無料の英語版あり）を使用します。毎晩1〜2時間費やし、すぐにすべてを記憶する必要はありません。目標：各章の全体像を理解し、Q&A形式でキーワードをメモします。各章の終わりに、その章の練習問題を行います。
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            2
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                2ヶ月目 – 過去問を解く（午前試験 + 午後試験の開始）
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                ITPECのWebサイト（itpec.org）から過去の試験問題をダウンロードします。毎日少なくとも1回は午前試験を解き、正解した問題であっても解答の解説を注意深く読んでください。同時に、午後試験に慣れ始め、最も得意なプログラミング言語（Java/Python/C）を選択して徹底的に復習します。
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            3
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                3ヶ月目 – 午後試験への取り組みと総合模擬試験
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                午後試験に取り組むことに集中します。ここは多くの人が不合格になる部分です。問題をすばやく読む練習をし、最初に解くべき簡単な問題を特定します。月末には、実際のプレッシャーに慣れるために、午前と午後の両方の完全な模擬試験を連続300分間実施します。覚えておいてください：問7と問8については、1つを選択します。事前に決定しておき、試験会場で迷わないようにしてください。
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            4
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                最終週 – 弱点の迅速な復習、メンタルの維持
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                新しい知識を学ばないでください。よく間違える問題を見直し、頻出するキーワードを復習します。十分な睡眠をとってください。試験会場では、簡単な問題から始めます。午前試験では1問あたり平均2分未満で解答し、難しい問題で「立ち往生」しないようにします。
                            </p>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">おすすめの教材とツール</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>
                        <strong>公式テキスト:</strong>
                        <a
                            href={'https://pdfcoffee.com/new-fe-textbook-vol2-pdf-free.html'}
                            className="ml-1 font-bold underline text-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            New FE Textbook Vol.1 & Vol.2（IPA発行、LIGHTBOATで無料PDFあり）
                        </a>
                    </li>
                    <li>
                        <strong>過去問:</strong>
                        <a
                            href="https://itpec.org/"
                            className="ml-1 font-bold underline text-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            itpec.orgでダウンロード – 2017年から現在までの過去問
                        </a>
                    </li>
                    <li>
                        <strong>日本の学習サイト:</strong>
                        <a
                            href="https://www.fe-siken.com/"
                            className="ml-1 font-bold underline text-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            基本情報技術者試験ドットコム（fe-siken.com）- 日本で受験する場合
                        </a>
                    </li>
                    <li>
                        <strong>オンライン模擬試験:</strong>
                        <Link href="/ja/" className="ml-1 font-bold underline text-primary">
                            IT Shiken – 実際の試験をシミュレートしたインターフェース、自動採点、無料
                        </Link>
                    </li>
                </ul>

                {/* INTERNAL LINK 2 */}
                <Link
                    href="/ja/exams"
                    className="flex items-center gap-4 bg-primary/10 dark:bg-blue-900/10 border border-green-200 dark:border-blue-800/50 rounded-md p-4 my-8 hover:shadow-md hover:border-primary dark:hover:border-blue-700 transition-all duration-200 group"
                >
                    <div>
                        <div className="text-xs text-primary dark:text-blue-400 font-bold mb-1 uppercase tracking-wider">
                            IT Shiken – FE試験の無料練習
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                            オンラインでFE模擬試験を受ける – 実際の試験を99%シミュレートし、完了直後に自動採点します
                        </div>
                    </div>
                </Link>

                {/* SECTION 7 - FAQ */}
                <h2
                    id="faq"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    7. よくある質問 (FAQ)
                </h2>

                <div className="space-y-4 mb-10">
                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-400 font-extrabold">Q</span>
                            FEは難しいですか？合格率はどのくらいですか？
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            ベトナムでのFEの平均合格率は25%未満であり、かなり低いです。これは合格不可能という意味ではなく、多くの人が間違った勉強法をしているか、午後試験を軽視しているということです。適切なロードマップに従って丸3ヶ月勉強すれば、合格の可能性は十分に現実的です。
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-400 font-extrabold">Q</span>
                            大学の学位を持っていなくてもFE試験を受けるべきですか？
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            これが、多くの人がFEを選ぶ理由の1つです。FE資格は、ITエンジニアの就労ビザを申請する際に、大学の学位の代わりとして日本政府に認められています。したがって、ITの学位を持たずに日本で働きたい場合、FEは最短かつ最も現実的な道です。
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-400 font-extrabold">Q</span>
                            午後試験ではどのプログラミング言語を選ぶべきですか？
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            午後試験では、C、Java、Python、アセンブラ、表計算の5つの言語から1つを選択できます。コミュニティからの最も一般的なアドバイスは、毎日使用している言語を選択することです。PythonとJavaは構文が明確であり、試験の条件下でも読みやすいため、最も人気のある2つの選択肢です。
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-400 font-extrabold">Q</span>
                            1つのセクションに合格した場合、両方を再受験する必要がありますか？
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            いいえ。1つのセクション（午前または午後）に合格した場合、その結果は直後の試験に免除（保留）されます。合格していないセクションのみを再受験する必要があります。これにより、初めて受験する人のプレッシャーが大幅に軽減されます。
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-400 font-extrabold">Q</span>
                            私は非IT分野の人間ですが、FE試験を受けるべきですか？
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            正直に言うと、プログラミングとアルゴリズムのセクションがあるため、ITの背景が全くない人にとってFEはかなり困難です。あなたが非IT分野の人であれば、まずITパスポートから始めて基礎を構築し、それからFEにステップアップするかどうかを決定する必要があります。多くのコミュニケーター、BA、テスターがITパスポートからステップアップしてFEに合格しています。十分な学習時間があれば、それは完全に可能です。
                        </div>
                    </div>
                </div>

                {/* INTERNAL LINK 3 */}
                <Link
                    href="/ja/flashcards"
                    className="flex items-center gap-4 bg-primary/10 dark:bg-blue-900/10 border border-green-200 dark:border-blue-800/50 rounded-md p-4 my-8 hover:shadow-md hover:border-primary dark:hover:border-blue-700 transition-all duration-200 group"
                >
                    <div>
                        <div className="text-xs text-primary dark:text-blue-400 font-bold mb-1 uppercase tracking-wider">
                            IT Shiken – フラッシュカード
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                            フラッシュカードを使用してITの語彙と概念を復習します – 早く学び、長く記憶に残します
                        </div>
                    </div>
                </Link>

                {/* CONCLUSION */}
                <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-md p-6 sm:p-8 my-10">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">まとめ</h2>
                    <p className="mb-4 text-slate-700 dark:text-slate-300">
                        FE資格は簡単ではありませんが、あなたが費やすすべての努力に見合う価値があります。履歴書の単なる一行にとどまらず、FEはあなたが日本で働き、大学の学位なしでビザを取得し、より高いレベルへステップアップするための確固たる基盤を持つための真の扉でもあります。
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium mb-4">
                        さらに重要なことは、<strong>完璧なスタート地点は必要ない</strong>
                        ということです。多くの人が、正しく勉強し、計画を守り抜くことで、ほぼゼロの状態からFEに合格しています。上記の3ヶ月のロードマップは現実的であり、コミュニティの人々自身によって検証されています。
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                        このエンジニア資格を制覇できるよう頑張ってください！
                    </p>
                </div>

                {/* CTA BOX */}
                <div className="bg-gradient-to-br from-[#053825] to-primary dark:to-blue-800 rounded-md p-8 sm:p-10 text-center my-12 shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-4">今日からFEの練習を始めませんか？</h3>
                    <p className="text-green-100 mb-8 max-w-2xl mx-auto">
                        IT
                        Shikenは、無料のFE模擬試験、実際の試験をシミュレートしたインターフェース、自動採点、詳細な結果分析を提供し、自分の弱点がどこにあるかを明確に把握するのに役立ちます。
                    </p>

                    <Button asChild className="text-lg !py-6 bg-accent hover:bg-accent/90 text-slate-900 border-none">
                        <Link href="/ja/exams">今すぐFE模擬試験を受ける – 無料</Link>
                    </Button>
                </div>
            </article>

            {/* FOOTER */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex flex-wrap gap-2">
                        {postDetail.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm px-3 py-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-500 dark:text-slate-400">共有:</span>
                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-primary transition-colors">
                            <LinkIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
