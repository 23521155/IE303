import Link from 'next/link';
import { ArrowRight, CheckCircle2, BrainCircuit, Globe, Code } from 'lucide-react';
import { exams } from '../data/mockData';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import Image from 'next/image';
export default function Home({ t, lang }: { t: any; lang: string }) {
    const featuredExams = exams.slice(0, 3);

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-background transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-secondary dark:text-white tracking-tight leading-tight mb-6">
                            {t.heroTitle1} <br className="hidden sm:block" />
                            <span className="text-primary">{t.heroTitle2}</span>
                        </h1>
                        <p className="text-xl text-secondary dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            {t.heroDesc}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {/* Primary Button */}
                            <Link href="/exams">
                                <Button className="text-lg py-6.5 px-5 rounded-full">{t.startExam}</Button>
                            </Link>

                            {/* Secondary Button */}
                            <a href="#features">
                                <Button variant="outline" className="rounded-full py-6.5 px-5 text-lg">
                                    {t.learnMore}
                                </Button>
                            </a>
                        </div>

                        <div className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 font-medium">
                            <div className="flex items-center gap-2 text-primary">
                                <CheckCircle2 className="h-5 w-5" />

                                <p>{t.freeToUse}</p>
                            </div>
                            <div className="flex items-center gap-2 text-primary">
                                <CheckCircle2 className="h-5 w-5" />
                                <p> {t.updatedExams}</p>
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
                            <h2 className="text-3xl font-bold text-secondary dark:text-white mb-4">
                                {t.featuredExams}
                            </h2>
                            <p className="text-secondary dark:text-slate-400 max-w-2xl text-lg">{t.featuredDesc}</p>
                        </div>
                        <Link href="/exams">
                            <Button variant={'link'} className="group">
                                {t.viewAllExams}
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredExams.map((exam) => (
                            <div
                                key={exam.id}
                                className="relative h-[420px] rounded-md overflow-hidden group shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                            >
                                {/* Image */}
                                <Image
                                    src={exam.image}
                                    alt="Kỳ thi"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    priority={false}
                                />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                                {/* Content */}
                                <div className="absolute bottom-0 p-6 w-full text-white">
                                    <h3 className="text-2xl font-bold mb-2">
                                        {typeof exam.title === 'string'
                                            ? exam.title
                                            : exam.title[lang as keyof typeof exam.title]}
                                    </h3>

                                    <p className="text-sm text-white/80 mb-4 line-clamp-2">
                                        {typeof exam.description === 'string'
                                            ? exam.description
                                            : exam.description[lang as keyof typeof exam.description]}
                                    </p>

                                    <div className="flex items-center gap-2 mb-6 text-xs">
                                        <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full flex">
                                            ⭐{exam.rating}
                                        </span>
                                        <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full">
                                            {exam.duration} {t.minutes}
                                        </span>
                                    </div>

                                    <Link href={`/exams/${exam.id}`}>
                                        <Button variant={'outline'} className={'hover:bg-accent'}>
                                            {t.viewDetails}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-secondary/2 dark:bg-[#0f0f0f] transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-secondary dark:text-white mb-4">{t.whyChooseUs}</h2>
                        <p className="text-secondary/90 dark:text-slate-400 max-w-2xl mx-auto text-lg">{t.whyDesc}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: BrainCircuit,
                                title: t.feat1Title,
                                desc: t.feat1Desc,
                            },
                            {
                                icon: Globe,
                                title: t.feat2Title,
                                desc: t.feat2Desc,
                            },
                            {
                                icon: Code,
                                title: t.feat3Title,
                                desc: t.feat3Desc,
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="group relative p-8 rounded-md border border-border bg-background/70 backdrop-blur-md shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                                >
                                    {/* Gradient glow */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

                                    {/* Icon */}
                                    <div
                                        className="relative z-10 w-14 h-14 mb-6 rounded-2xl flex items-center justify-center
                                bg-primary/10 text-primary
                                group-hover:bg-primary group-hover:text-primary-foreground
                                transition-all duration-300"
                                    >
                                        <Icon className="w-7 h-7" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="relative z-10 text-xl font-semibold text-secondary mb-3 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="relative z-10 text-secondary text-sm leading-relaxed">{item.desc}</p>

                                    {/* Bottom line hover */}
                                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary" />

                {/* Glow effects */}
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{t.readyForExam}</h2>

                    {/* Description */}
                    <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">{t.readyDesc}</p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/* Primary CTA */}
                        <Link href="/register">
                            <Button
                                variant={'outline'}
                                className="rounded-full py-6.5 px-5 font-semibold text-lg hover:bg-accent"
                            >
                                {t.createAccount}
                            </Button>
                        </Link>

                        {/* Secondary CTA */}
                        <Link href="/exams">
                            <Button
                                variant="outline"
                                className="rounded-full py-6.5 px-5 font-semibold text-lg hover:bg-accent"
                            >
                                {t.exploreExams}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
