import Image from 'next/image';
import React from 'react';

interface PathIconProps {
    className?: string;
}

export function PathLearnIcon({ className }: PathIconProps) {
    return <Image src="/svg/path.svg" alt="Path" width={30} height={30} className={className} />;
}
