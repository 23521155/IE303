import Image from 'next/image';
import React from 'react';

interface AiIconProps {
    className?: string;
}

export function AiIcon({ className }: AiIconProps) {
    return (
        <Image
            src="/svg/artificial-intelligence-ai-icon.svg"
            alt="Artificial Intelligence"
            width={30}
            height={30}
            className={className}
        />
    );
}
