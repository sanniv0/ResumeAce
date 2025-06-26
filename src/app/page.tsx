'use client';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResumeSchema, type ResumeData } from '@/lib/types';
import { initialData } from '@/lib/initial-data';
import ResumeEditor from '@/components/resume-editor';
import ResumePreview from '@/components/resume-preview';
import LandingPage from '@/components/landing-page';
import TemplateSelector from '@/components/template-selector';
import { Navbar } from '@/components/navbar';

type View = 'landing' | 'templates' | 'building';

export default function Home() {
  const [view, setView] = useState<View>('landing');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('classic');
  const methods = useForm<ResumeData>({
    resolver: zodResolver(ResumeSchema),
    defaultValues: initialData,
  });

  const resumeData = methods.watch();

  const handlePrint = () => {
    window.print();
  };
  
  const handleGoHome = () => {
    setView('landing');
  };

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setView('building');
  };

  if (view === 'landing') {
    return <LandingPage onStartBuilding={() => setView('templates')} />;
  }

  if (view === 'templates') {
    return <TemplateSelector onSelectTemplate={handleSelectTemplate} onBack={handleGoHome} />;
  }

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar 
            showBuilderActions={true}
            onPrint={handlePrint}
            onGoHome={handleGoHome}
        />
        <main className="container mx-auto p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-8 items-start">
          <div className="print:hidden lg:col-span-1 xl:col-span-2">
            <ResumeEditor />
          </div>
          <div className="lg:col-span-1 xl:col-span-3 lg:sticky lg:top-24">
            <div className="rounded-lg shadow-lg overflow-hidden border">
              <div id="resume-preview" className="bg-card">
                  <ResumePreview data={resumeData} template={selectedTemplate} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </FormProvider>
  );
}
