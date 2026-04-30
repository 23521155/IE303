// src/components/animation/ScrollReveal.tsx
'use client';
import { motion } from 'framer-motion';

export default function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay: number }) {
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
        {children}
    </motion.div>;
}
