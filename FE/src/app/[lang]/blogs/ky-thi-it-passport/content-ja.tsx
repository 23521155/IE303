import Image from 'next/image';
import { AlertTriangle, Bookmark, Calendar, CheckCircle2, Clock, Info, Link as LinkIcon, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import React from 'react';

// Cập nhật Mock data theo nội dung mới
const postDetail = {
    id: 'ky-thi-it-passport',
    title: 'ITパスポート試験とは？完全ガイド',
    excerpt: '定義・試験構造・勉強方法をまとめて解説。',
    coverImage: '/blog-it-passport-thumbnail.jpg',
    author: {
        name: 'Nguyễn Lê Tuấn Phi',
        role: 'Author',
        avatar: '/avatar-Phi.jpg',
    },
    date: '01/05/2026',
    category: 'IT資格',
    readTime: '30分',
    tags: ['ITパスポート', 'Itshiken', '日本', 'キャリア'],
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
                    alt="ITパスポートとは - 日本の情報技術資格"
                    width={500}
                    height={500}
                    className="w-full h-auto max-h-[500px] object-cover rounded-md shadow-sm"
                />
                <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
                    ITパスポート資格とは？
                </figcaption>
            </div>

            {/* CONTENT */}
            <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                <p className="mb-6">
                    ITパスポートについて調べていて、どこから始めればいいか迷っていませんか？あるいは、この資格が本当に自分に必要なのか疑問に思っていますか？ご安心ください。この記事では、十分な情報を得て自信を持って試験に臨めるよう、AからZまですべてを解説します。
                </p>

                {/* TABLE OF CONTENTS (TOC) */}
                <nav className="bg-primary/10 dark:bg-blue-900/10 border-l-4 border-primary rounded-r-md p-6 my-10">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary dark:text-blue-400 mb-4">
                        目次
                    </h3>
                    <ul className="space-y-2 text-base text-secondary">
                        <li>
                            <a
                                href="#it-passport-la-gi"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                1. ITパスポートとは？
                            </a>
                        </li>
                        <li>
                            <a
                                href="#ai-nen-thi"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                2. 誰がITパスポートを受験すべきか？
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
                                4. ITパスポート資格取得のメリット
                            </a>
                        </li>
                        <li>
                            <a
                                href="#dang-ky"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                5. 受験申込方法
                            </a>
                        </li>
                        <li>
                            <a
                                href="#lo-trinh-on-luyen"
                                className="hover:text-primary dark:hover:text-blue-400 transition-colors"
                            >
                                6. 効果的な学習ロードマップ
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
                    id="it-passport-la-gi"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    1. ITパスポートとは？
                </h2>
                <p className="mb-6">
                    <a
                        href="https://btacademy.vn/it-comtor/it-passport-la-gi-loi-the-cua-chung-chi-it-passport"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-primary underline mr-1"
                    >
                        ITパスポート
                    </a>
                    （略称：<strong>iPass</strong>）は、日本の経済産業省（METI）が管轄し、IPA（<em>情報処理推進機構</em>
                    ）を通じて認定される、ITスキル標準（ITSS）のレベル1に相当する国家資格です。
                </p>
                <p className="mb-6">
                    簡単に言うと、これは情報技術の世界へ足を踏み入れたいすべての人（経済学、外国語、その他の専攻を問わず）のための「パスポート」です。この資格は、IT環境、特に日本企業で働くために十分なITの基礎知識を持っていることを証明します。
                </p>

                {/* INFO BOX */}
                <div className="flex gap-4 bg-primary/10 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-5 my-8">
                    <Info className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-secondary dark:text-blue-100 m-0">
                        <strong>ITパスポートはIT専門家だけの資格ではありません。</strong> むしろ、
                        <em>IT専門分野の出身ではない</em>
                        が、テクノロジー環境や日本のパートナーと働きたい人に最適な試験です。
                    </p>
                </div>

                <figure className="my-8">
                    <Image
                        width={500}
                        height={500}
                        src="https://blog.sendmoney.jp/wp-content/uploads/2024/07/luyen-thi-chung-chi-IT-passport.jpg"
                        alt="IPAロゴ - 日本のITパスポート資格認定機関"
                        className="w-full rounded-md shadow-sm"
                    />
                    <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3 italic">
                        ITパスポート資格はIPA（日本）によって発行され、世界7カ国で認定されています。
                    </figcaption>
                </figure>

                {/* SECTION 2 */}
                <h2
                    id="ai-nen-thi"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    2. 誰がITパスポートを受験すべきか？
                </h2>
                <p className="mb-6">
                    ITパスポートが他の多くのIT資格と異なる点の1つは、<strong>受験対象者に制限がない</strong>
                    ことです。学位も経験も必要ありません。受験したい人なら誰でも受験できます。
                </p>
                <p className="mb-6">
                    では、この資格は特にどのような人に向いているのでしょうか？ITパスポートが明確な価値を生み出すのは、次のようなグループの人々です：
                </p>

                {/* BENEFITS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-6 text-center hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-primary dark:text-blue-400 mb-2">営業・マーケティング担当者</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            テクノロジークライアントと協力し、より良いコンサルティングのためにIT製品を理解する必要がある方。
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-6 text-center hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-primary dark:text-blue-400 mb-2">ITコムター（IT通訳・翻訳者）</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            正確かつ専門的に翻訳するための語彙力とITの基礎知識が必要な方。
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-6 text-center hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-primary dark:text-blue-400 mb-2">バックオフィス・人事（HR）</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            IT企業で働いているがエンジニアではなく、同僚の「言語」を理解したい方。
                        </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-6 text-center hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-primary dark:text-blue-400 mb-2">異業種への転職を目指す学生</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            IT業界への転職を希望し、履歴書を強化してキャリアの第一歩を踏み出すための資格が必要な方。
                        </p>
                    </div>
                </div>
                <p className="mb-6">
                    では、あなたがエンジニア、開発者、またはテスターである場合はどうでしょうか？ITパスポートは、多くのエンジニアが見落としがちな
                    <strong>マネジメント、経営戦略、IT法務</strong>に関する知識を補うため、依然として価値があります。
                </p>

                {/* SECTION 3 */}
                <h2
                    id="cau-truc-de-thi"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    3. ITパスポートの試験構成の詳細
                </h2>
                <p className="mb-6">
                    これは最もよく尋ねられる部分です。試験の構成を明確に知ることで、学習時間をより賢く割り当てることができます。
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 my-6 text-center font-medium">
                    概要: 多肢選択式 100問 <span className="mx-2 text-slate-300">|</span> 試験時間: 120分{' '}
                    <span className="mx-2 text-slate-300">|</span> 形式: CBT / ペーパーテスト
                </div>

                <div className="overflow-x-auto mb-6">
                    <table className="w-full border border-slate-200 dark:border-slate-700 text-sm text-left rounded-md">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                            <tr>
                                <th className="px-4 py-3 font-semibold">分野</th>
                                <th className="px-4 py-3 font-semibold">内容</th>
                                <th className="px-4 py-3 font-semibold">問題数</th>
                                <th className="px-4 py-3 font-semibold">合格基準</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700 dark:text-slate-300">
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium">ストラテジ系（経営全般）</td>
                                <td className="px-4 py-3">企業活動、法務、経営戦略システム戦略</td>
                                <td className="px-4 py-3">35問</td>
                                <td className="px-4 py-3">300/1000点</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium">マネジメント系（IT管理）</td>
                                <td className="px-4 py-3">
                                    プロジェクトマネジメント、サービスマネジメント、システム監査
                                </td>
                                <td className="px-4 py-3">20問</td>
                                <td className="px-4 py-3">300/1000点</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium">テクノロジ系（IT技術）</td>
                                <td className="px-4 py-3">
                                    基礎理論、コンピュータシステム、技術要素（セキュリティ、ネットワークなど）
                                </td>
                                <td className="px-4 py-3">45問</td>
                                <td className="px-4 py-3">300/1000点</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-blue-50 dark:bg-blue-900/20 font-bold">
                                <td className="px-4 py-3" colSpan={2}>
                                    総合評価点（合格基準）
                                </td>
                                <td className="px-4 py-3 text-primary dark:text-blue-400" colSpan={2}>
                                    総合評価点 600点以上（かつ分野別評価点がいずれも300点以上）
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* WARNING BOX */}
                <div className="flex gap-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-md p-5 my-8">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-yellow-900 dark:text-yellow-100 m-0">
                        <strong>重要な注意事項:</strong> <em>全3分野</em>
                        でそれぞれ300点以上を獲得する必要があります。1つの分野でも300点を下回った場合、総合評価点が600点を超えていても不合格となります。問題数が少ないからといって、マネジメント系をおろそかにしないでください！
                    </p>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3">
                    難易度はどのくらいですか？
                </h3>
                <p className="mb-6">
                    多くの受験者の声によると、ITパスポート試験は技術的な面では難しくありません。最も難しいのは通常、日本語の専門用語の量（日本で受験する場合）と、広範な知識範囲です。ITの知識が全くない人の場合、約80〜100時間の学習が必要です。すでにIT業界で働いている人なら、20〜30時間で十分です。
                </p>

                {/* INTERNAL LINK 1 */}
                <Link
                    href="/ja/exams"
                    className="flex items-center gap-4 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50 rounded-md p-4 my-8 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 group"
                >
                    <div>
                        <div className="text-xs text-primary dark:text-blue-400 font-bold mb-1 uppercase tracking-wider">
                            IT Shiken – 無料模擬試験
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                            今すぐITパスポートのオンライン模擬試験を受ける – 自動採点、完全無料
                        </div>
                    </div>
                </Link>

                {/* SECTION 4 */}
                <h2
                    id="loi-ich"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    4. なぜITパスポート資格を取得すべきなのか？
                </h2>
                <p className="mb-4">
                    多くの人が「これを勉強して何の役に立つのか？」と尋ねます。ここに最も実用的な答えがあります。
                </p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">
                    日本での就職活動とビザ審査における優位性
                </h3>
                <p className="mb-4">
                    日本の労働市場を目指す人にとって、ITパスポートは多くの日本企業が高く評価する基準の1つです。さらに、長期就労ビザや永住権ビザを審査する際、この資格は日本の「高度人材ポイント制度」のポイントとして計算されます。
                </p>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">
                    多くのキャリアの機会を開く
                </h3>
                <p className="mb-4">ITパスポートの取得者は、IT業界のさまざまな職種に簡単にアクセスできます：</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>
                        <strong>ブリッジSE（BSE）</strong> – ベトナムの開発チームと日本の顧客との架け橋
                    </li>
                    <li>
                        <strong>ITコムター</strong> – 日越IT専門の通訳・翻訳者
                    </li>
                    <li>
                        <strong>ビジネスアナリスト、コンサルタント</strong> – 顧客要件の分析
                    </li>
                    <li>
                        <strong>セールスエンジニアリング</strong> – 技術ソリューションの販売
                    </li>
                    <li>
                        <strong>テスター、QA</strong> – ソフトウェアテスト
                    </li>
                </ul>

                {/* SUCCESS BOX */}
                <div className="flex gap-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-md p-5 my-8">
                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-green-900 dark:text-green-100 m-0">
                        <strong>上位資格への足がかり:</strong> ITパスポート取得後、引き続き
                        <strong>FE（基本情報技術者）</strong>に挑戦し、さらに<strong>AP（応用情報技術者）</strong>、
                        <strong>PM（プロジェクトマネージャ）</strong>
                        へとステップアップすることができます。知識は積み重なるため、学習の努力は決して無駄になりません。
                    </p>
                </div>

                {/* SECTION 5 */}
                <h2
                    id="dang-ky"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    5. 受験申込方法
                </h2>
                <div className="overflow-x-auto mb-8">
                    <p className="mb-4">
                        受験する場所によって、手順が少し異なります。以下は両方のケースの総合情報です。
                    </p>
                    <table className="w-full border border-slate-200 dark:border-slate-700 text-sm text-left">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                            <tr>
                                <th className="px-4 py-3 font-semibold">項目</th>
                                <th className="px-4 py-3 font-semibold">🇻🇳 ベトナムの場合</th>
                                <th className="px-4 py-3 font-semibold">🇯🇵 日本の場合</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700 dark:text-slate-300">
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium">主催機関</td>
                                <td className="px-4 py-3">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://www.vitec.org.vn/hitcweb2024/index.php/sat-hach/dang-ky-sat-hach"
                                        className="text-primary underline"
                                    >
                                        VITEC (IPAと連携)
                                    </a>
                                </td>
                                <td className="px-4 py-3">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="https://www3.jitec.ipa.go.jp/JitesCbt/html/examination/apply.html"
                                        className="text-primary underline"
                                    >
                                        IPA – 情報処理推進機構
                                    </a>
                                </td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium">試験日程</td>
                                <td className="px-4 py-3">年2回 (4月と10月)</td>
                                <td className="px-4 py-3">毎月随時開催</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-[#121212]">
                                <td className="px-4 py-3 font-medium">試験形式</td>
                                <td className="px-4 py-3">ペーパーテスト</td>
                                <td className="px-4 py-3">CBT（コンピュータテスト）</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium">言語</td>
                                <td className="px-4 py-3">ベトナム語 (翻訳版あり)</td>
                                <td className="px-4 py-3">日本語 (N3程度必要)</td>
                            </tr>
                            <tr className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                                <td className="px-4 py-3 font-medium">受験地</td>
                                <td className="px-4 py-3">ハノイ、ホーチミン、ダナン、ビンズオン</td>
                                <td className="px-4 py-3">日本全国47都道府県</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* SECTION 6 */}
                <h2
                    id="lo-trinh-on-luyen"
                    className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800"
                >
                    6. 効果的な学習ロードマップ
                </h2>
                <p className="mb-6">
                    「ITパスポートの勉強にはどのくらい時間がかかりますか？」とよく聞かれます。答えはあなたの基礎知識に依存しますが、一般的に、完全な初心者の場合は
                    <strong>3ヶ月が妥当な期間</strong>です。段階別の推奨ロードマップは次のとおりです：
                </p>

                {/* STEPS */}
                <div className="flex flex-col gap-4 my-8">
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            1
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                1ヶ月目 – 基礎知識の習得（インプット）
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                「いちばんやさしいITパスポート」などの標準的なテキストを読みます。すぐにすべてを暗記しようとせず、概念に慣れるために通読してください。1日10〜15ページ進めれば十分です。
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            2
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                2ヶ月目 – 過去問をたくさん解く（アウトプット）
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                インプットとアウトプットの比率を3：7にします。過去問をたくさん解き、正解した問題であっても解説を注意深く読んでください。Q&A形式でキーワードをメモします。
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            3
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                3ヶ月目 – 実戦的な模擬試験
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                苦手な分野に集中し、きっちり120分間でシミュレーション模擬試験を受けます。スピードを意識して練習します。1問あたり平均72秒で解き、簡単な問題から始め、難しい問題は後回しにします。
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-md p-5 items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                            4
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">
                                最終週 – 全体の復習とメンタルの維持
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 m-0">
                                新しい知識は学ばないでください。忘れやすいポイントだけを復習し、健康を保ち、リラックスした気持ちを維持して、最高の状態で試験会場に入りましょう。
                            </p>
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">
                    資格取得後のキャリアパスは？
                </h3>
                <p className="mb-4">
                    かなり多くの選択肢がありますが、コミュニティから高く評価されている道は以下の通りです：
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>
                        <strong>ブリッジSE（BSE）</strong> – ベトナムの開発チームと日本の顧客との架け橋
                    </li>
                    <li>
                        <strong>ITコムター</strong> – 日越IT専門の通訳・翻訳者
                    </li>
                    <li>
                        <strong>ビジネスアナリスト、コンサルタント</strong> – 顧客要件の分析
                    </li>
                    <li>
                        <strong>セールスエンジニアリング</strong> – 技術ソリューションの販売
                    </li>
                    <li>
                        <strong>テスター、QA</strong> – ソフトウェアテスト
                    </li>
                </ul>
                {/* INTERNAL LINK 2 */}
                <Link
                    href="/ja/materials"
                    className="flex items-center gap-4  dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/50 rounded-md p-4 my-8 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 group"
                >
                    <div>
                        <div className="text-xs text-primary dark:text-blue-400 font-bold mb-1 uppercase tracking-wider">
                            IT Shiken – 学習資料
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                            継続的に更新されるITパスポート試験対策の学習資料リポジトリを見る
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
                            ITパスポートはFE資格とどう違いますか？
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            ITパスポートはレベル1であり、非ITを含むすべての対象者に向けた最も基本的なレベルで、一般的な知識に焦点を当てています。
                            <br />
                            <Link className="font-bold underline text-primary mr-1" href={'/ja/blogs/ky-thi-fe'}>
                                FE（基本情報技術者）
                            </Link>
                            はレベル2で、より難しく、開発者やIT学生に適した専門的な技術スキルを対象としています。多くの人が、FEを制覇する前の足がかりとしてITパスポートを選んでいます。
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-400 font-extrabold">Q</span>
                            ITパスポート資格の有効期間はどのくらいですか？
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            永久です。更新が必要な他の多くの資格とは異なり、ITパスポートは一度合格すれば永遠に有効です。これが、多くの人がこの資格に投資することを選ぶ理由の1つです。
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-400 font-extrabold">Q</span>
                            日本語が分からなくても受験できますか？
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            全く問題ありません。ベトナムでは、試験にはベトナム語の翻訳が付属しているため、日本語は必須ではありません。
                        </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                        <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 font-bold text-slate-900 dark:text-white">
                            <span className="text-primary dark:text-blue-400 font-extrabold">Q</span>
                            ITパスポート試験の合格率はどのくらいですか？
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm md:text-base bg-white dark:bg-[#121212]">
                            IPAのデータによると、日本でのITパスポート試験の合格率は約52％です。つまり、受験者の2人に1人が合格しています。十分に準備していれば、これは決して低い数字ではありません。
                        </div>
                    </div>
                </div>

                {/* CONCLUSION */}
                <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 rounded-md p-6 sm:p-8 my-10">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">まとめ</h2>
                    <p className="mb-4 text-slate-700 dark:text-slate-300">
                        ITパスポートは技術者だけの資格ではありません。これは、特に日本企業でITの職場環境に足を踏み入れたいすべての人にとってのチケットです。知識の範囲は広いですが難しすぎることはなく、明確な学習ロードマップがあり、資格は一生有効です。これは、あなたが自分自身に投資できる最も価値のあるものの1つです。
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium mb-4">
                        あなたが学生であれ、会社員であれ、ITコムターであれ、テクノロジー業界への転職を考えている人であれ、ITパスポートを制覇する旅は完全にあなたの手の届くところにあります。重要なのは、正しく始め、ロードマップに固執することです。
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                        効果的に学習し、近いうちにあなたの手にITパスポートを掴み取ることを祈っています！
                    </p>
                </div>

                {/* CTA BOX */}
                <div className="bg-gradient-to-br from-secondary/60 to-secondary dark:to-blue-800 rounded-md p-8 sm:p-10 text-center my-12 shadow-lg">
                    <h3 className="text-2xl font-bold text-white mb-4">
                        ITパスポートの練習を始める準備はできましたか？
                    </h3>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        IT
                        Shikenは、本番に近い無料の模擬試験を、自動採点と詳細な結果分析付きで提供しています。今日から始めましょう。登録は不要です！
                    </p>

                    <Button asChild className="text-lg !py-6">
                        <Link href="/ja/exams">今すぐ模擬試験を受ける – 無料</Link>
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
