'use client';

import { motion } from 'framer-motion';

export default function AnimateInView({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}
