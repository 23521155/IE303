'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, BrainCircuit, Globe, Code, BookOpen, Clock } from 'lucide-react';
import { exams } from '../data/mockData';
import { Button } from '@/src/components/ui/button';

import Image from 'next/image';
import ParallaxScroll from '@/src/animation/parallaxScroll';
import ScrollReveal from '@/src/animation/scrollReveal';
import SmoothScroll from '@/src/animation/smoothScroll';
import AnimateInView from '@/src/animation/AnimateInView';
import { useLenisScroll } from '@/src/animation/useLenisScroll';
import { motion } from 'framer-motion';
import { Exam } from '../services/examService';
export default function Home({ t, lang, popularExams }: { t: any; lang: string; popularExams: Exam[] }) {
    const featuredExams = popularExams || [];
    const { scrollTo } = useLenisScroll();

    return (
        <main className="w-full">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-background min-h-[calc(100vh-64px)] flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 z-10 flex-2">
                    <div className="text-center max-w-3xl mx-auto">
                        <AnimateInView>
                            <h1 className="text-5xl md:text-6xl font-extrabold text-secondary dark:text-white tracking-tight leading-tight mb-6">
                                {t.heroTitle1} <br className="hidden sm:block" />
                                <span className="text-primary">{t.heroTitle2}</span>
                            </h1>
                        </AnimateInView>

                        <AnimateInView delay={0.2}>
                            <p className="text-xl text-secondary dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                                {t.heroDesc}
                            </p>
                        </AnimateInView>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {/* Primary Button */}

                            <AnimateInView delay={0.4}>
                                <Button asChild className="text-lg py-6.5 px-5">
                                    <Link href={`/${lang}/exams`}>{t.startExam}</Link>
                                </Button>
                            </AnimateInView>

                            <AnimateInView delay={0.6}>
                                <Button
                                    variant="outline"
                                    className="py-6.5 px-5 text-lg"
                                    onClick={() => scrollTo('#features')}
                                >
                                    {t.learnMore}
                                </Button>
                            </AnimateInView>

                            {/* Secondary Button */}
                        </div>

                        <div className="mt-12 flex items-center justify-center gap-6 text-md text-slate-500 dark:text-slate-400 font-medium">
                            <AnimateInView delay={0.5}>
                                <div className="flex items-center gap-2 text-green-500">
                                    <CheckCircle2 className="h-5 w-5" />

                                    <p>{t.freeToUse}</p>
                                </div>
                            </AnimateInView>

                            <AnimateInView delay={0.7}>
                                <div className="flex items-center gap-2 text-green-500">
                                    <CheckCircle2 className="h-5 w-5" />

                                    <p>{t.updatedExams}</p>
                                </div>
                            </AnimateInView>
                            <AnimateInView delay={0.9}>
                                <div className="flex items-center gap-2 text-green-500">
                                    <CheckCircle2 className="h-5 w-5" />

                                    <p>{t.realisticExam}</p>
                                </div>
                            </AnimateInView>
                        </div>
                    </div>
                </div>

                <div className="h-full flex-1 relative">
                    <AnimateInView delay={0.2}>
                        <Image
                            src={'/hoc 1.jpg'}
                            alt={'học1'}
                            height={550}
                            width={550}
                            className="absolute -right-20 -bottom-25 rounded-full border-10 border-secondary"
                        />
                    </AnimateInView>
                    <AnimateInView delay={0.6}>
                        {' '}
                        <Image
                            src={'/it passport.jpg'}
                            alt={'học1'}
                            height={250}
                            width={250}
                            className="absolute -right-10 top-8 z-5 rounded-full border-10 border-secondary shadow-xl"
                        />
                    </AnimateInView>

                    <AnimateInView delay={0.8}>
                        <Image
                            src={'/chứng chỉ.jpg'}
                            alt={'chứng chỉ'}
                            height={250}
                            width={250}
                            className="absolute right-42 -top-14 z-20 w-[300px] h-[300px] rounded-full border-10 border-primary shadow-xl object-cover"
                        />
                    </AnimateInView>
                </div>
            </section>

            {/* Featured Exams Section */}
            <section className=" py-20 bg-white dark:bg-[#121212]   dark:border-slate-800 transition-colors duration-300 min-h-[calc(100vh-64px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-secondary dark:text-white mb-4">
                                {t.featuredExams}
                            </h2>
                            <p className="text-secondary dark:text-slate-400 max-w-2xl text-lg">{t.featuredDesc}</p>
                        </div>

                        <Button asChild variant={'link'} className="group">
                            <Link href={`/${lang}/exams`}>
                                {t.viewAllExams}
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
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
                                    alt={
                                        typeof exam.title === 'string'
                                            ? exam.title
                                            : exam.title[lang as keyof typeof exam.title]
                                    }
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

                                    <div className="flex flex-wrap items-center gap-2 mb-5 text-xs">
                                        <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-sm flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" /> {exam.duration} {t.minutes}
                                        </span>
                                        <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-sm flex items-center gap-1">
                                            <BookOpen className="w-3.5 h-3.5" /> {exam.questionCount} {t.questions}
                                        </span>
                                    </div>
                                    <Button asChild variant={'outline'} className={'hover:bg-accent'}>
                                        <Link href={`/exams/${exam.id}`}>{t.viewDetails}</Link>
                                    </Button>
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
                        <h2 className="text-3xl font-bold text-foreground mb-4">{t.whyChooseUs}</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.whyDesc}</p>
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
                                    <h3 className="relative z-10 text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="relative z-10 text-muted-foreground text-sm leading-relaxed">{item.desc}</p>

                                    {/* Bottom line hover */}
                                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 overflow-hidden border-t border-border bg-background">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-secondary/30 opacity-60" />

                {/* Glow effects */}
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">{t.readyForExam}</h2>

                    {/* Description */}
                    <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">{t.readyDesc}</p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {/* Primary CTA */}

                        <Button
                            asChild
                            className="py-6.5 px-8 font-semibold text-lg border-transparent shadow-md hover:scale-105 transition-all"
                        >
                            <Link href={`/${lang}/register`}>{t.createAccount}</Link>
                        </Button>

                        {/* Secondary CTA */}

                        <Button
                            asChild
                            variant="outline"
                            className="py-6.5 px-8 font-semibold text-lg border-slate-300 dark:border-white/20 bg-transparent hover:bg-slate-100 dark:hover:bg-white/5"
                        >
                            <Link href={`/${lang}/exams`}>{t.exploreExams}</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
