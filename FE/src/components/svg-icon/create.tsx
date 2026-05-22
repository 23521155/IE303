import Image from 'next/image';
import React from 'react';

interface CreateIconProps {
    className?: string;
}

export function CreateIcon({ className }: CreateIconProps) {
    return <Image src="/svg/create-icon.svg" alt="create Line" width={18} height={18} className={className} />;
}
