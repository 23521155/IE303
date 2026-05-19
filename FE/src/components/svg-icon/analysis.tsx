import Image from 'next/image';
import React from 'react';

interface AnalysisIconProps {
    className?: string;
}

export function AnalysisIcon({ className }: AnalysisIconProps) {
    return <Image src="/svg/analysis-icon.svg" alt="Analysis icon" width={30} height={30} className={className} />;
}
