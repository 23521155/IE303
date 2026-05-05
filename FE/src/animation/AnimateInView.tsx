'use client';

import { motion } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right';

interface Props {
    children: React.ReactNode;
    delay?: number;
    direction?: Direction;
    duration?: number;
    className?: string;
}

const offsets: Record<Direction, { x: number; y: number }> = {
    up: { x: 0, y: 40 },
    down: { x: 0, y: -40 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
};

export default function AnimateInView({ children, delay = 0, direction = 'up', duration = 0.65, className }: Props) {
    const { x, y } = offsets[direction];
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, x, y }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration, ease: [0.21, 0.47, 0.32, 0.98], delay }}
        >
            {children}
        </motion.div>
    );
}
