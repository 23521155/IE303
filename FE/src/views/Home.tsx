'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, BrainCircuit, Globe, Code, BookOpen, Clock } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import Image from 'next/image';
import AnimateInView from '@/src/animation/AnimateInView';
import { useLenisScroll } from '@/src/animation/useLenisScroll';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Exam } from '../services/examService';

const examGridVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
};

const examCardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] as const },
    },
};

const statsGridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const featureDirections = ['left', 'up', 'right'] as const;

const featureAccents = [
    {
        icon: 'text-primary bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground',
        glow: 'from-primary/10 via-transparent to-orange-400/10',
        line: 'bg-primary',
        title: 'group-hover:text-primary',
    },
    {
        icon: 'text-secondary bg-secondary/10 group-hover:bg-secondary group-hover:text-white',
        glow: 'from-secondary/10 via-transparent to-cyan-400/10',
        line: 'bg-secondary',
        title: 'group-hover:text-secondary',
    },
    {
        icon: 'text-primary bg-primary/10 group-hover:bg-primary group-hover:text-white',
        glow: 'from-primary/10 via-transparent to-purple-400/10',
        line: 'bg-primary',
        title: 'group-hover:text-primary',
    },
];

const STATS = [
    { value: '10,000+', labelKey: 'statLearnersLabel' },
    { value: '500+', labelKey: 'statExamSetsLabel' },
    { value: '3', labelKey: 'statCertsLabel' },
    { value: '95%', labelKey: 'statPassRateLabel' },
] as const;

export default function Home({ t, lang, popularExams }: { t: any; lang: string; popularExams: Exam[] }) {
    const featuredExams = popularExams || [];
    const { scrollTo } = useLenisScroll();

    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const img1Y = useTransform(heroProgress, [0, 1], [0, -60]);
    const img2Y = useTransform(heroProgress, [0, 1], [0, -100]);
    const img3Y = useTransform(heroProgress, [0, 1], [0, -80]);

    return (
        <main className="w-full">
            {/* ─── Hero Section ─────────────────────────────────────────────────── */}
            <section
                ref={heroRef}
                className="relative overflow-hidden bg-background min-h-[calc(100vh-64px)] flex items-center"
            >
                {/* Radial glow from top */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(232, 121, 33, 0.12), transparent)',
                    }}
                />
                {/* Dot grid texture */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.055]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, var(--color-secondary) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 z-10 flex-2">
                    <div className="text-center max-w-3xl mx-auto">
                        {/* Pill badge */}
                        <AnimateInView delay={0}>
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                                </span>
                                {t.heroBadge}
                            </div>
                        </AnimateInView>

                        {/* Title */}
                        <AnimateInView delay={0.15}>
                            <h1 className="text-5xl md:text-6xl font-extrabold text-secondary dark:text-white tracking-tight leading-tight mb-6">
                                {t.heroTitle1} <br className="hidden sm:block" />
                                <span className="bg-gradient-to-r from-primary via-orange-400 to-amber-300 bg-clip-text text-transparent">
                                    {t.heroTitle2}
                                </span>
                            </h1>
                        </AnimateInView>

                        {/* Description */}
                        <AnimateInView delay={0.3}>
                            <p className="text-xl text-secondary dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                                {t.heroDesc}
                            </p>
                        </AnimateInView>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <AnimateInView delay={0.42}>
                                <Button
                                    asChild
                                    className="text-lg py-6.5 px-5 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
                                >
                                    <Link href={`/${lang}/exams`}>{t.startExam}</Link>
                                </Button>
                            </AnimateInView>
                            <AnimateInView delay={0.54}>
                                <Button
                                    variant="outline"
                                    className="py-6.5 px-5 text-lg"
                                    onClick={() => scrollTo('#features')}
                                >
                                    {t.learnMore}
                                </Button>
                            </AnimateInView>
                        </div>

                        {/* Trust badges */}
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                            {[
                                { delay: 0.55, label: t.freeToUse },
                                { delay: 0.68, label: t.updatedExams },
                                { delay: 0.81, label: t.realisticExam },
                            ].map(({ delay, label }) => (
                                <AnimateInView key={String(label)} delay={delay}>
                                    <div className="flex items-center gap-1.5 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 rounded-full px-3 py-1 text-sm font-medium">
                                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                                        {label}
                                    </div>
                                </AnimateInView>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Hero Images — outer motion.div owns parallax y, inner owns entrance */}
                <div className="h-full hidden xl:block flex-1 relative">
                    {/* Large bottom image */}
                    <motion.div className="absolute -right-20 -bottom-25" style={{ y: img1Y }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                            <Image
                                src={'/hoc 1.jpg'}
                                alt={'học1'}
                                height={550}
                                width={550}
                                className="rounded-full border-10 border-secondary"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Small top-right image */}
                    <motion.div className="absolute -right-10 top-8 z-5" style={{ y: img2Y }}>
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                            <Image
                                src={'/it passport.jpg'}
                                alt={'học1'}
                                height={250}
                                width={250}
                                className="rounded-full border-10 border-secondary shadow-xl"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Medium top-center image */}
                    <motion.div className="absolute right-42 -top-14 z-20" style={{ y: img3Y }}>
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                            <Image
                                src={'/chứng chỉ.jpg'}
                                alt={'chứng chỉ'}
                                height={250}
                                width={250}
                                className="w-[300px] h-[300px] rounded-full border-10 border-primary shadow-xl object-cover"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Stats Bar ────────────────────────────────────────────────────── */}
            <section className="py-12 border-y border-border/50 bg-muted/20 dark:bg-secondary/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        variants={statsGridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {STATS.map((stat, idx) => (
                            <AnimateInView key={stat.labelKey} delay={idx * 0.08}>
                                <div className="text-center space-y-1">
                                    <div className="text-4xl font-black text-primary tabular-nums">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground font-medium">{t[stat.labelKey]}</div>
                                </div>
                            </AnimateInView>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── Featured Exams ───────────────────────────────────────────────── */}
            <section className="py-20 bg-white dark:bg-[#121212] dark:border-slate-800 transition-colors duration-300 min-h-[calc(100vh-64px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimateInView>
                        <div className="flex flex-col md:flex-row justify-between mb-12 gap-4">
                            <div>
                                <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide mb-3">
                                    🔥 {t.popularBadge}
                                </div>
                                <h2 className="text-3xl font-bold text-secondary dark:text-white mb-4">
                                    {t.featuredExams}
                                </h2>
                                <p className="text-secondary dark:text-slate-400 max-w-2xl text-lg">{t.featuredDesc}</p>
                            </div>
                            <div className="flex items-end">
                                <Button asChild variant={'link'} className="group !p-0">
                                    <Link href={`/${lang}/exams`}>
                                        {t.viewAllExams}
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </AnimateInView>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={examGridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                    >
                        {featuredExams.map((exam) => (
                            <motion.div
                                key={exam.id}
                                variants={examCardVariants}
                                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                                className="relative h-[420px] rounded-md overflow-hidden group shadow-md hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
                            >
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
                                {/* Gradient overlay — stronger at bottom */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5" />

                                {/* Content */}
                                <div className="absolute bottom-0 p-6 w-full text-white">
                                    <h3 className="text-2xl font-bold mb-2 leading-snug">
                                        {typeof exam.title === 'string'
                                            ? exam.title
                                            : exam.title[lang as keyof typeof exam.title]}
                                    </h3>
                                    <p className="text-sm text-white/75 mb-4 line-clamp-2 leading-relaxed">
                                        {typeof exam.description === 'string'
                                            ? exam.description
                                            : exam.description[lang as keyof typeof exam.description]}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 mb-5 text-xs">
                                        <span className="bg-white/15 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {exam.duration} {t.minutes}
                                        </span>
                                        <span className="bg-white/15 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                                            <BookOpen className="w-3.5 h-3.5" />
                                            {exam.questionCount} {t.questions}
                                        </span>
                                    </div>
                                    <Button
                                        asChild
                                        variant={'outline'}
                                        className="hover:bg-white hover:text-secondary transition-colors"
                                    >
                                        <Link href={`/${lang}/exams/${exam.id}`}>{t.viewDetails}</Link>
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── Features Section ─────────────────────────────────────────────── */}
            <section id="features" className="py-24 bg-secondary/2 dark:bg-[#0f0f0f] transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimateInView>
                        <div className="text-center mb-16">
                            {/* Section eyebrow */}
                            <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-5">
                                <div className="w-8 h-px bg-primary/50" />
                                PLATFORM
                                <div className="w-8 h-px bg-primary/50" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.whyChooseUs}</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t.whyDesc}</p>
                        </div>
                    </AnimateInView>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: BrainCircuit, title: t.feat1Title, desc: t.feat1Desc },
                            { icon: Globe, title: t.feat2Title, desc: t.feat2Desc },
                            { icon: Code, title: t.feat3Title, desc: t.feat3Desc },
                        ].map((item, idx) => {
                            const Icon = item.icon;
                            const accent = featureAccents[idx];
                            return (
                                <AnimateInView
                                    key={String(item.title)}
                                    direction={featureDirections[idx]}
                                    delay={idx * 0.1}
                                    className="h-full"
                                >
                                    <div className="h-full group relative p-8 rounded-md border border-border bg-background/70 backdrop-blur-md shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                                        {/* Gradient glow on hover */}
                                        <div
                                            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br ${accent.glow}`}
                                        />

                                        {/* Icon */}
                                        <div
                                            className={`relative z-10 w-14 h-14 mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${accent.icon}`}
                                        >
                                            <Icon className="w-7 h-7" />
                                        </div>

                                        {/* Title */}
                                        <h3
                                            className={`relative z-10 text-xl font-semibold text-foreground mb-3 transition-colors ${accent.title}`}
                                        >
                                            {item.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="relative z-10 text-muted-foreground text-sm leading-relaxed">
                                            {item.desc}
                                        </p>

                                        {/* Bottom accent line */}
                                        <div
                                            className={`absolute bottom-0 left-0 w-0 h-[2px] ${accent.line} group-hover:w-full transition-all duration-500`}
                                        />
                                    </div>
                                </AnimateInView>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── CTA Section ──────────────────────────────────────────────────── */}
            <section className="relative py-28 overflow-hidden border-t border-border bg-background">
                {/* Breathing glow orbs */}
                <motion.div
                    className="absolute -top-20 -left-20 w-96 h-96 bg-primary/6 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/8 rounded-full blur-3xl"
                    animate={{ scale: [1.4, 1, 1.4], opacity: [0.9, 0.4, 0.9] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/3 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.6, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-background to-secondary/20 opacity-60" />

                <AnimateInView>
                    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                        {/* Eyebrow */}
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
                            ✦ {t.freeToUse}
                        </div>

                        <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
                            {t.readyForExam}
                        </h2>
                        <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                            {t.readyDesc}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                asChild
                                className="py-6.5 px-8 font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all"
                            >
                                <Link href={`/${lang}/register`}>{t.createAccount}</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="py-6.5 px-8 font-semibold text-lg border-slate-300 dark:border-white/20 bg-transparent hover:bg-slate-100 dark:hover:bg-white/5"
                            >
                                <Link href={`/${lang}/exams`}>{t.exploreExams}</Link>
                            </Button>
                        </div>
                    </div>
                </AnimateInView>
            </section>
        </main>
    );
}
