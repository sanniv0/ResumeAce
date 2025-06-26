'use client';
import { type ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateProps {
    data: ResumeData;
}

export default function MinimalistTemplate({ data }: TemplateProps) {
    const { personalDetails, experience, education, skills, theme } = data;
    const themeColor = '#333333'; // Minimalist color

    return (
        <div className={cn("p-12 bg-card text-foreground font-sans leading-relaxed", theme.font === 'Inter' ? 'font-body' : 'font-body')}>
            <style jsx global>{`
                .resume-preview-minimalist h1, .resume-preview-minimalist h2, .resume-preview-minimalist h3 {
                    font-family: '${theme.font}', sans-serif;
                }
            `}</style>
            <div className="resume-preview-minimalist">
                <header className="text-center border-b pb-6 mb-6">
                    <h1 className="text-4xl font-light tracking-widest uppercase" style={{ color: themeColor }}>
                        {personalDetails.fullName || 'Your Name'}
                    </h1>
                </header>

                <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 mb-8 text-xs text-muted-foreground">
                    {personalDetails.email && <a href={`mailto:${personalDetails.email}`} className="flex items-center gap-1.5 hover:text-primary"><Mail className="w-3 h-3" /> {personalDetails.email}</a>}
                    {personalDetails.phoneNumber && <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {personalDetails.phoneNumber}</span>}
                    {personalDetails.address && <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {personalDetails.address}</span>}
                    {personalDetails.website && <a href={personalDetails.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary"><Globe className="w-3 h-3" /> {personalDetails.website}</a>}
                </div>

                {experience.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: themeColor }}>Experience</h2>
                        <div className="space-y-6">
                            {experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-lg font-medium text-foreground">{exp.jobTitle || 'Job Title'} at {exp.company || 'Company'}</h3>
                                        <div className="text-sm text-muted-foreground">{exp.startDate} - {exp.endDate}</div>
                                    </div>
                                    <div className="mt-2 text-sm text-foreground/80 whitespace-pre-wrap font-light">{exp.description || 'Job description...'}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                     {education.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: themeColor }}>Education</h2>
                             <div className="space-y-4">
                                {education.map((edu, index) => (
                                     <div key={index}>
                                        <h3 className="text-lg font-medium text-foreground">{edu.degree || 'Degree'}</h3>
                                        <div className="text-md text-muted-foreground">{edu.institution || 'Institution'}</div>
                                        <div className="text-sm text-muted-foreground">{edu.startDate} - {edu.endDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills.length > 0 && (
                        <section>
                            <h2 className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: themeColor }}>Skills</h2>
                            <ul className="columns-2 space-y-1">
                                {skills.map((skill, index) => (
                                   <li key={index} className="text-sm font-light">{skill}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
