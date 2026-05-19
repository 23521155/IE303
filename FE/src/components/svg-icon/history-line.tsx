import Image from 'next/image';
import React from 'react';

interface HistoryLineIconProps {
    className?: string;
}

export function HistoryLineIcon({ className }: HistoryLineIconProps) {
    return <Image src="/svg/history-line-icon.svg" alt="History Line" width={18} height={18} className={className} />;
}
