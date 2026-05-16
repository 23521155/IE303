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
import RegularExamCard from '@/src/components/ui/regular-exam-card';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const gridVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.07, delayChildren: 0.04 },
    },
};

export default function Home({ t, lang, popularExams }: { t: any; lang: string; popularExams: Exam[] }) {
    const featuredExams = popularExams || [];
    const { scrollTo } = useLenisScroll();

    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    // Hero content dissolves out as user scrolls — cinematic exit
    const heroContentOpacity = useTransform(heroProgress, [0, 0.45], [1, 0]);
    const heroContentY = useTransform(heroProgress, [0, 1], [0, 32]);

    // Three-layer parallax at distinct depths
    const img1Y = useTransform(heroProgress, [0, 1], [0, -50]);
    const img2Y = useTransform(heroProgress, [0, 1], [0, -120]);
    const img3Y = useTransform(heroProgress, [0, 1], [0, -80]);

    return (
        <main className="w-full">
            {/* ─── Hero ─────────────────────────────────────────────────────────── */}
            <section
                ref={heroRef}
                className="relative overflow-hidden bg-background min-h-[calc(100vh-64px)] flex items-center"
            >
                {/* Ambient warmth — amber glow from upper-center */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(232, 121, 33, 0.10) 0%, transparent 70%)',
                    }}
                />
                {/* Dot grid texture */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, var(--color-secondary) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />

                {/* Hero content — fades and drifts up on scroll */}
                <motion.div
                    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 z-10 flex-2"
                    style={{ opacity: heroContentOpacity, y: heroContentY }}
                >
                    <div className="text-center max-w-3xl mx-auto">
                        {/* Live badge */}
                        <AnimateInView delay={0}>
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                                </span>
                                {t.heroBadge}
                            </div>
                        </AnimateInView>

                        {/* Title */}
                        <AnimateInView delay={0.12}>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-secondary dark:text-foreground tracking-tight leading-[1.05] mb-7">
                                {t.heroTitle1}
                                <br className="hidden sm:block" />
                                <span className="text-primary">{t.heroTitle2}</span>
                            </h1>
                        </AnimateInView>

                        {/* Description */}
                        <AnimateInView delay={0.26}>
                            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
                                {t.heroDesc}
                            </p>
                        </AnimateInView>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <AnimateInView delay={0.38}>
                                <Button
                                    asChild
                                    className="text-base py-6 px-7 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 transition-shadow duration-300"
                                >
                                    <Link href={`/${lang}/exams`}>{t.startExam}</Link>
                                </Button>
                            </AnimateInView>
                            <AnimateInView delay={0.48}>
                                <Button
                                    variant="outline"
                                    className="py-6 px-7 text-base"
                                    onClick={() => scrollTo('#features')}
                                >
                                    {t.learnMore}
                                </Button>
                            </AnimateInView>
                        </div>

                        {/* Trust indicators — on-palette amber, not green */}
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
                            {[
                                { delay: 0.52, label: t.freeToUse },
                                { delay: 0.62, label: t.updatedExams },
                                { delay: 0.72, label: t.realisticExam },
                            ].map(({ delay, label }) => (
                                <AnimateInView key={String(label)} delay={delay}>
                                    <div className="flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-sm font-medium">
                                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                                        {label}
                                    </div>
                                </AnimateInView>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Hero images — three-layer parallax at distinct depths */}
                <div className="h-full hidden xl:block flex-1 relative">
                    <motion.div className="absolute -right-20 -bottom-25" style={{ y: img1Y, willChange: 'transform' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.88 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.1, delay: 0.15, ease: EASE_OUT_EXPO }}
                        >
                            <Image
                                src="/hoc 1.jpg"
                                alt="Student studying for Japanese IT certification"
                                height={550}
                                width={550}
                                className="rounded-full border-10 border-secondary"
                            />
                        </motion.div>
                    </motion.div>

                    <motion.div className="absolute -right-10 top-8 z-5" style={{ y: img2Y, willChange: 'transform' }}>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.0, delay: 0.4, ease: EASE_OUT_EXPO }}
                        >
                            <Image
                                src="/it passport.jpg"
                                alt="IT Passport certification"
                                height={250}
                                width={250}
                                className="rounded-full border-10 border-secondary shadow-xl"
                            />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="absolute right-42 -top-14 z-20"
                        style={{ y: img3Y, willChange: 'transform' }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.0, delay: 0.65, ease: EASE_OUT_EXPO }}
                        >
                            <Image
                                src="/chứng chỉ.jpg"
                                alt="Japanese IT certification"
                                height={250}
                                width={250}
                                className="w-[300px] h-[300px] rounded-full border-10 border-primary shadow-xl object-cover"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Featured Exams ───────────────────────────────────────────────── */}
            <section className="py-24 relative overflow-hidden bg-background transition-colors duration-300">
                {/* Background Effects (Đồng bộ tuyệt đối) */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(232, 121, 33, 0.08) 0%, transparent 65%)',
                    }}
                />
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.04]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, var(--color-secondary) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <AnimateInView>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide mb-4">
                                    {t.popularBadge}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-foreground mb-4 tracking-tight">
                                    {t.featuredExams}
                                </h2>
                                <p className="text-muted-foreground text-base leading-relaxed">{t.featuredDesc}</p>
                            </div>

                            <Button
                                asChild
                                variant="link"
                                className="group p-0 h-auto text-primary font-bold hover:no-underline"
                            >
                                <Link href={`/${lang}/exams`} className="flex items-center gap-2">
                                    {t.viewAllExams}
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                    </AnimateInView>

                    {/* Grid hiển thị 3 thẻ Regular đều nhau */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={gridVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {featuredExams.slice(0, 3).map((exam, index) => (
                            <RegularExamCard key={exam.id} exam={exam} lang={lang} t={t} index={index} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── Features ─────────────────────────────────────────────────────── */}
            <section id="features" className="py-28 bg-muted/20 dark:bg-muted/10 transition-colors duration-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimateInView>
                        <div className="mb-20">
                            <div className="inline-flex items-center gap-2.5 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                                <div className="w-6 h-px bg-primary/40" />
                                {t.whyChooseUs}
                                <div className="w-6 h-px bg-primary/40" />
                            </div>
                            <p className="text-muted-foreground text-base leading-relaxed max-w-xl">{t.whyDesc}</p>
                        </div>
                    </AnimateInView>

                    <div className="divide-y divide-border/60">
                        {[
                            { icon: BrainCircuit, title: t.feat1Title, desc: t.feat1Desc },
                            { icon: Globe, title: t.feat2Title, desc: t.feat2Desc },
                            { icon: Code, title: t.feat3Title, desc: t.feat3Desc },
                        ].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <AnimateInView
                                    key={String(item.title)}
                                    direction={idx % 2 === 0 ? 'left' : 'right'}
                                    delay={idx * 0.08}
                                >
                                    <div className="flex items-start gap-6 md:gap-12 py-10 group">
                                        <div className="shrink-0 w-12 text-right hidden sm:block pt-1.5">
                                            <span className="text-4xl font-black text-primary/15 dark:text-primary/20 tabular-nums leading-none select-none">
                                                {String(idx + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                        <div className="shrink-0 mt-0.5">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                                                {item.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                </AnimateInView>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── CTA ──────────────────────────────────────────────────────────── */}
            <section className="relative py-32 border-t border-border overflow-hidden">
                {/* Navy ambient tint */}
                <div className="absolute inset-0 bg-secondary/3 dark:bg-secondary/5" />
                {/* Amber glow from bottom — narrative warmth, closure */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse 60% 45% at 50% 100%, rgba(232, 121, 33, 0.07) 0%, transparent 70%)',
                    }}
                />

                <AnimateInView>
                    <div className="relative max-w-3xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-8">
                            {t.freeToUse}
                        </div>

                        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
                            {t.readyForExam}
                        </h2>
                        <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-md mx-auto">
                            {t.readyDesc}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                            <Button
                                asChild
                                className="py-6 px-8 font-semibold text-base shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 transition-shadow duration-300"
                            >
                                <Link href={`/${lang}/register`}>{t.createAccount}</Link>
                            </Button>
                            <Button asChild variant="outline" className="py-6 px-8 font-semibold text-base">
                                <Link href={`/${lang}/exams`}>{t.exploreExams}</Link>
                            </Button>
                        </div>
                    </div>
                </AnimateInView>
            </section>
        </main>
    );
}
