import Image from 'next/image';
import React from 'react';

interface GraphIconProps {
    className?: string;
}

export function GraphIcon({ className }: GraphIconProps) {
    return <Image src="/svg/knowledge-graph.svg" alt="Knowledge Graph" width={30} height={30} className={className} />;
}
