'use client';
import { type ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface TemplateProps {
    data: ResumeData;
}

export default function ClassicTemplate({ data }: TemplateProps) {
    const { personalDetails, experience, education, skills, theme } = data;
    const themeColor = theme.color || '#3F51B5';

    return (
        <div className={cn("p-8 bg-card text-foreground font-body leading-relaxed", theme.font === 'Inter' ? 'font-body' : 'font-body')}>
            <style jsx global>{`
                .resume-preview-classic h1, .resume-preview-classic h2, .resume-preview-classic h3, .resume-preview-classic h4, .resume-preview-classic h5, .resume-preview-classic h6 {
                    font-family: '${theme.font}', sans-serif;
                    color: ${themeColor};
                }
            `}</style>
            <div className="resume-preview-classic">
              {/* Header */}
              <header className="text-center mb-8">
                  <h1 className="text-5xl font-bold tracking-tight">
                      {personalDetails.fullName || 'Your Name'}
                  </h1>
                  <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-muted-foreground">
                      {personalDetails.email && <a href={`mailto:${personalDetails.email}`} className="flex items-center gap-1.5 hover:text-primary"><Mail className="w-4 h-4" /> {personalDetails.email}</a>}
                      {personalDetails.phoneNumber && <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {personalDetails.phoneNumber}</span>}
                      {personalDetails.address && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {personalDetails.address}</span>}
                      {personalDetails.website && <a href={personalDetails.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary"><Globe className="w-4 h-4" /> {personalDetails.website}</a>}
                  </div>
              </header>

              <Separator style={{ backgroundColor: themeColor, opacity: 0.2 }} className="my-6" />

              {/* Experience Section */}
              {experience.length > 0 && (
                  <section className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
                      <div className="space-y-6">
                          {experience.map((exp, index) => (
                              <div key={index}>
                                  <div className="flex justify-between items-baseline">
                                      <h3 className="text-lg font-semibold text-foreground">{exp.jobTitle || 'Job Title'}</h3>
                                      <div className="text-sm text-muted-foreground">{exp.startDate || 'Start Date'} - {exp.endDate || 'End Date'}</div>
                                  </div>
                                  <div className="text-md text-muted-foreground font-medium">{exp.company || 'Company Name'}</div>
                                  <div className="mt-2 text-sm text-foreground/80 whitespace-pre-wrap">{exp.description || 'Job description...'}</div>
                              </div>
                          ))}
                      </div>
                  </section>
              )}

              {/* Education Section */}
              {education.length > 0 && (
                  <section className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">Education</h2>
                       <div className="space-y-6">
                          {education.map((edu, index) => (
                               <div key={index}>
                                  <div className="flex justify-between items-baseline">
                                      <h3 className="text-lg font-semibold text-foreground">{edu.degree || 'Degree / Certificate'}</h3>
                                      <div className="text-sm text-muted-foreground">{edu.startDate || 'Start Date'} - {edu.endDate || 'End Date'}</div>
                                  </div>
                                  <div className="text-md text-muted-foreground font-medium">{edu.institution || 'Institution Name'}</div>
                              </div>
                          ))}
                      </div>
                  </section>
              )}

              {/* Skills Section */}
              {skills.length > 0 && (
                  <section>
                      <h2 className="text-2xl font-bold mb-4">Skills</h2>
                      <div className="flex flex-wrap gap-2">
                          {skills.map((skill, index) => (
                             <Badge key={index} variant="outline" style={{ borderColor: themeColor, color: themeColor }} className="text-sm px-3 py-1">
                                 {skill}
                             </Badge>
                          ))}
                      </div>
                  </section>
              )}
            </div>
        </div>
    );
}
