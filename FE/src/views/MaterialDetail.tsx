import Link from 'next/link';
import { Download, FileText, Video, ChevronRight } from 'lucide-react';

type Material = {
    id: number;
    title: string;
    category: string;
    imageUrl: string;
    description: string;
    fileUrl: string;
    type: string;
    createdAt: string;
};

export function MaterialDetail({ material, t, lang }: { material: Material; t: any; lang: string }) {
    const fileUrl = `/api/materials/${material.id}/file`;
    const downloadUrl = `/api/materials/${material.id}/file?download=true`;

    return (
        <div className="bg-background min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* ─── Breadcrumb / file path ─── */}
                <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
                    <Link
                        href={`/${lang}/materials`}
                        className="hover:text-foreground transition-colors duration-150"
                    >
                        {t.studyMaterials}
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5 opacity-40 flex-shrink-0" />
                    <span className="font-mono text-xs text-foreground/60">{material.category}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-40 flex-shrink-0" />
                    <span className="font-mono text-xs text-foreground/70 truncate max-w-[260px] sm:max-w-none">
                        {material.title}
                    </span>
                </nav>

                {/* ─── File header ─── */}
                <div className="mb-6 pb-6 border-b border-border/50">

                    {/* Category badge */}
                    <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded px-2.5 py-1 mb-4">
                        {material.category}
                    </span>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-secondary dark:text-foreground mb-3">
                        {material.title}
                    </h1>

                    {/* Description */}
                    {material.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                            {material.description}
                        </p>
                    )}

                    {/* Action toolbar */}
                    <div className="flex items-center gap-4 flex-wrap">
                        <a
                            href={downloadUrl}
                            className="inline-flex items-center gap-2 h-8 px-3.5 text-sm font-medium bg-primary text-white hover:bg-primary/90 rounded-md transition-colors"
                        >
                            <Download className="w-3.5 h-3.5" />
                            {t.downloads || 'Tải xuống'}
                        </a>
                        <div className="w-px h-4 bg-border flex-shrink-0" />
                        <span className="font-mono text-xs text-muted-foreground/60 tabular-nums">
                            {new Date(material.createdAt).toLocaleDateString()}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground/50 uppercase">
                            {material.type}
                        </span>
                    </div>
                </div>

                {/* ─── Viewer ─── */}
                {material.type === 'pdf' ? (
                    <div className="rounded-xl border border-border/60 overflow-hidden bg-muted/[0.15]">
                        <iframe
                            src={fileUrl}
                            title={material.title}
                            className="w-full block"
                            style={{ height: '85vh' }}
                        />
                    </div>
                ) : (
                    <div className="relative rounded-xl border border-border/60 overflow-hidden">
                        {/* Dot-pattern texture */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.06]"
                            style={{
                                backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                                backgroundSize: '24px 24px',
                            }}
                        />
                        <div className="relative flex flex-col items-center justify-center py-24 px-8 text-center bg-muted/[0.15]">
                            <div className="w-14 h-14 rounded-xl border border-border/60 bg-background flex items-center justify-center mb-6">
                                <Video className="w-7 h-7 text-primary/70" />
                            </div>
                            <p className="text-sm font-medium text-foreground/70 mb-2 max-w-md">
                                {material.title}
                            </p>
                            {material.description && (
                                <p className="text-xs text-muted-foreground/60 mb-8 max-w-sm leading-relaxed">
                                    {material.description}
                                </p>
                            )}
                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 h-9 px-4 text-sm font-medium bg-primary text-white hover:bg-primary/90 rounded-md transition-colors"
                            >
                                <FileText className="w-3.5 h-3.5" />
                                {t.views || 'Xem video'}
                            </a>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
