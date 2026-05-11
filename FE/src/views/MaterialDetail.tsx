import Link from 'next/link';
import { ArrowLeft, Download, FileText, Video } from 'lucide-react';

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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
            {/* Breadcrumb */}
            <Link
                href={`/${lang}/materials`}
                className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t.studyMaterials}
            </Link>

            {/* Header */}
            <div className="mb-6">
                <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-md mb-3">
                    {material.category}
                </span>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{material.title}</h1>
                {material.description && (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{material.description}</p>
                )}
                <div className="mt-4 flex items-center gap-3 flex-wrap">
                    <a
                        href={downloadUrl}
                        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        {t.downloads || 'Tải xuống'}
                    </a>
                    <span className="text-sm text-gray-400 dark:text-gray-500">
                        {new Date(material.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>

            {/* Viewer */}
            {material.type === 'pdf' ? (
                <div className="w-full rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
                    <iframe src={fileUrl} title={material.title} className="w-full" style={{ height: '90vh' }} />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-md border border-gray-200 dark:border-gray-800">
                    <Video className="w-16 h-16 text-primary mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">{material.title}</p>
                    <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                        <FileText className="w-4 h-4 mr-2" />
                        {t.views || 'Xem video'}
                    </a>
                </div>
            )}
        </div>
    );
}
