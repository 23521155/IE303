import Image from 'next/image';
import React from 'react';

interface BubLightIconProps {
    className?: string;
}

export function BubLightIcon({ className }: BubLightIconProps) {
    return <Image src="/svg/bulb-light-icon.svg" alt="Bub Light" width={30} height={30} className={className} />;
}
