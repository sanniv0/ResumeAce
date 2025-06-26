'use client';
import { type ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface TemplateProps {
    data: ResumeData;
}

export default function CreativeTemplate({ data }: TemplateProps) {
    const { personalDetails, experience, education, skills, theme } = data;
    const themeColor = theme.color || '#3F51B5';

    return (
        <div className={cn("p-8 bg-card text-foreground font-body leading-relaxed", theme.font === 'Inter' ? 'font-body' : 'font-body')}>
            <style jsx global>{`
                .resume-preview-creative .theme-text { color: ${themeColor}; }
                .resume-preview-creative .theme-bg { background-color: ${themeColor}; }
                .resume-preview-creative h1, .resume-preview-creative h2, .resume-preview-creative h3, .resume-preview-creative h4, .resume-preview-creative h5, .resume-preview-creative h6 {
                    font-family: '${theme.font}', sans-serif;
                }
            `}</style>
            <div className="resume-preview-creative">
                <header className="relative text-center mb-8 p-8 flex flex-col items-center justify-center rounded-lg" style={{backgroundColor: `${themeColor}1A`}}>
                     <div className="absolute top-4 left-4 h-16 w-1 border-l-4" style={{borderColor: themeColor}}></div>
                     <div className="absolute bottom-4 right-4 h-16 w-1 border-r-4" style={{borderColor: themeColor}}></div>
                    <h1 className="text-5xl font-bold tracking-tight theme-text">
                        {personalDetails.fullName || 'Your Name'}
                    </h1>
                     <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-muted-foreground">
                      {personalDetails.email && <a href={`mailto:${personalDetails.email}`} className="flex items-center gap-1.5 hover:text-primary"><Mail className="w-4 h-4" /> {personalDetails.email}</a>}
                      {personalDetails.phoneNumber && <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {personalDetails.phoneNumber}</span>}
                      {personalDetails.address && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {personalDetails.address}</span>}
                      {personalDetails.website && <a href={personalDetails.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary"><Globe className="w-4 h-4" /> {personalDetails.website}</a>}
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {experience.length > 0 && (
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 theme-text border-b-2 pb-2" style={{borderColor: themeColor}}>Work Experience</h2>
                                <div className="space-y-6 mt-4">
                                    {experience.map((exp, index) => (
                                        <div key={index}>
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
                    </div>
                    <div className="md:col-span-1 space-y-8">
                         {education.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold mb-4 theme-text border-b-2 pb-2" style={{borderColor: themeColor}}>Education</h2>
                                 <div className="space-y-4 mt-4">
                                    {education.map((edu, index) => (
                                         <div key={index}>
                                            <h3 className="text-lg font-semibold text-foreground">{edu.degree || 'Degree'}</h3>
                                            <div className="text-md text-muted-foreground font-medium">{edu.institution || 'Institution'}</div>
                                             <div className="text-sm text-muted-foreground">{edu.startDate} - {edu.endDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {skills.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold mb-4 theme-text border-b-2 pb-2" style={{borderColor: themeColor}}>Skills</h2>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {skills.map((skill, index) => (
                                       <Badge key={index} style={{ backgroundColor: themeColor, color: '#ffffff' }} className="text-sm px-3 py-1">
                                           {skill}
                                       </Badge>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
