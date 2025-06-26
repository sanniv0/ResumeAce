'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Palette } from 'lucide-react';
import { Navbar } from '@/components/navbar';

interface LandingPageProps {
  onStartBuilding: () => void;
}

export default function LandingPage({ onStartBuilding }: LandingPageProps) {
  const [year, setYear] = useState<number | string>('');

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

    const features = [
      {
          icon: <FileText className="h-8 w-8 text-accent" />,
          title: "Multiple Templates",
          description: "Choose from a variety of professional templates to match your style."
      },
      {
          icon: <Palette className="h-8 w-8 text-accent" />,
          title: "Easy Customization",
          description: "Tailor fonts, colors, and sections to create a resume that is uniquely yours."
      }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar onStartBuilding={onStartBuilding} />

      <main className="flex-grow">
        <section className="container mx-auto px-4 py-16 sm:py-24 md:py-32 text-center flex flex-col items-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline tracking-tight text-foreground">
            Craft Your Perfect Resume, Effortlessly.
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Our intuitive builder makes it simple to create a standout resume that gets you noticed. Choose a template and build your future today.
          </p>
          <div className="mt-10">
            <Button size="lg" onClick={onStartBuilding} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <section id="features" className="bg-card/50 py-16 sm:py-20 scroll-mt-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold font-headline text-center mb-12">
              Features to Help You Succeed
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {features.map((feature, index) => (
                  <div key={index} className="text-center p-6 bg-card rounded-lg shadow-md border">
                      <div className="flex justify-center mb-4">{feature.icon}</div>
                      <h4 className="font-headline text-xl font-semibold mb-2">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.description}</p>
                  </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-background py-16 sm:py-20 scroll-mt-20">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold font-headline text-center mb-12">
              Simple, Transparent Pricing
            </h3>
            <div className="max-w-md mx-auto bg-card border rounded-lg p-8 shadow-md">
                <h4 className="text-2xl font-bold font-headline text-primary">Free Tier</h4>
                <p className="text-4xl font-bold my-4">$0 <span className="text-lg font-normal text-muted-foreground">/ forever</span></p>
                <ul className="text-left space-y-2 text-muted-foreground list-inside">
                    <li className="flex items-center gap-2">✓ All templates included</li>
                    <li className="flex items-center gap-2">✓ PDF download</li>
                </ul>
                 <Button size="lg" onClick={onStartBuilding} className="mt-8 w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Start for Free
                </Button>
            </div>
          </div>
        </section>

        <section id="help" className="bg-card/50 py-16 sm:py-20 scroll-mt-20">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h3 className="text-3xl font-bold font-headline text-center mb-4">
              Need Help?
            </h3>
            <p className="text-lg text-muted-foreground">
                Have questions or need support? Our team is here to help. Reach out to us anytime and we'll get back to you as soon as possible.
            </p>
             <p className="mt-6">
                <a href="mailto:support@resumeace.com" className="font-semibold text-primary hover:underline">
                    support@resumeace.com
                </a>
             </p>
          </div>
        </section>

      </main>

      <footer className="text-center p-6 text-sm text-muted-foreground border-t">
        <p>&copy; {year} ResumeAce. All rights reserved.</p>
      </footer>
    </div>
  );
}
