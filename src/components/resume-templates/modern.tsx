'use client';
import { type ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface TemplateProps {
    data: ResumeData;
}

export default function ModernTemplate({ data }: TemplateProps) {
    const { personalDetails, experience, education, skills, theme } = data;
    const themeColor = theme.color || '#3F51B5';

    return (
        <div className={cn("bg-card text-foreground font-body leading-relaxed", theme.font === 'Inter' ? 'font-body' : 'font-body')}>
            <style jsx global>{`
                .resume-preview-modern h1, .resume-preview-modern h2, .resume-preview-modern h3, .resume-preview-modern h4, .resume-preview-modern h5, .resume-preview-modern h6 {
                    font-family: '${theme.font}', sans-serif;
                    color: ${themeColor};
                }
            `}</style>
            <div className="resume-preview-modern flex flex-col md:flex-row min-h-[1123px]">
                {/* Left Sidebar */}
                <aside className="w-full md:w-1/3 bg-muted/30 p-8 space-y-8 flex flex-col">
                    <header className="text-left">
                        <h1 className="text-4xl font-bold tracking-tight">
                            {personalDetails.fullName || 'Your Name'}
                        </h1>
                    </header>
                    
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold mb-4">Contact</h2>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                 {personalDetails.email && <a href={`mailto:${personalDetails.email}`} className="flex items-start gap-2 hover:text-primary"><Mail className="w-4 h-4 mt-0.5 shrink-0" /> <span className="break-all">{personalDetails.email}</span></a>}
                                 {personalDetails.phoneNumber && <div className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0" /> <span>{personalDetails.phoneNumber}</span></div>}
                                 {personalDetails.address && <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> <span>{personalDetails.address}</span></div>}
                                 {personalDetails.website && <a href={personalDetails.website} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:text-primary"><Globe className="w-4 h-4 mt-0.5 shrink-0" /> <span className="break-all">{personalDetails.website}</span></a>}
                            </div>
                        </div>

                        {skills.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold mb-4">Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => (
                                       <Badge key={index} variant="secondary" className="text-sm font-normal">
                                           {skill}
                                       </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {education.length > 0 && (
                             <div>
                                <h2 className="text-xl font-bold mb-4">Education</h2>
                                 <div className="space-y-4">
                                    {education.map((edu, index) => (
                                         <div key={index}>
                                            <h3 className="text-md font-semibold text-foreground">{edu.degree || 'Degree'}</h3>
                                            <div className="text-sm text-muted-foreground">{edu.institution || 'Institution'}</div>
                                            <div className="text-xs text-muted-foreground/80 mt-1">{edu.startDate} - {edu.endDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Main Content */}
                <main className="w-full md:w-2/3 p-8">
                     {experience.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6 tracking-tight">Work Experience</h2>
                            <div className="space-y-6">
                                {experience.map((exp, index) => (
                                    <div key={index} className="relative pl-6">
                                        <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full" style={{backgroundColor: themeColor}}></div>
                                        <div className={`absolute left-[5.5px] top-1.5 h-full w-px bg-border ${index === experience.length - 1 ? 'h-[calc(100%-1rem)]' : 'h-full'}`}></div>
                                        
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-lg font-semibold text-foreground">{exp.jobTitle || 'Job Title'}</h3>
                                            <div className="text-sm text-muted-foreground">{exp.startDate} - {exp.endDate}</div>
                                        </div>
                                        <div className="text-md text-muted-foreground font-medium">{exp.company || 'Company Name'}</div>
                                        <div className="mt-2 text-sm text-foreground/80 whitespace-pre-wrap">{exp.description || 'Job description...'}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}
