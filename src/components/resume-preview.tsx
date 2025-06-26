'use client';
import type { ResumeData } from '@/lib/types';
import ClassicTemplate from '@/components/resume-templates/classic';
import ModernTemplate from '@/components/resume-templates/modern';
import CreativeTemplate from '@/components/resume-templates/creative';
import MinimalistTemplate from '@/components/resume-templates/minimalist';

interface ResumePreviewProps {
    data: ResumeData;
    template: string;
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
    switch (template) {
        case 'modern':
            return <ModernTemplate data={data} />;
        case 'creative':
            return <CreativeTemplate data={data} />;
        case 'minimalist':
            return <MinimalistTemplate data={data} />;
        case 'classic':
        default:
            return <ClassicTemplate data={data} />;
    }
}
