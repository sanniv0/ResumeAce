'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { templates } from '@/lib/templates';

interface TemplateSelectorProps {
    onSelectTemplate: (templateId: string) => void;
    onBack: () => void;
}

export default function TemplateSelector({ onSelectTemplate, onBack }: TemplateSelectorProps) {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <header className="py-8 bg-background">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold font-headline tracking-tight">Choose Your Template</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Select a professionally designed template to start with. You can customize colors and fonts later.
                    </p>
                </div>
            </header>
            
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {templates.map((template) => (
                        <Card 
                            key={template.id} 
                            className="overflow-hidden cursor-pointer group hover:border-primary transition-all"
                            onClick={() => onSelectTemplate(template.id)}
                        >
                            <CardContent className="p-2">
                                <div className="aspect-[4/5] overflow-hidden rounded-md border">
                                    <Image 
                                        src={template.imageUrl}
                                        alt={template.name}
                                        width={400}
                                        height={500}
                                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                        data-ai-hint={template.aiHint}
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="font-headline text-lg font-semibold">{template.name}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
            
            <footer className="container mx-auto px-4 py-8 flex justify-center">
                <Button variant="outline" onClick={onBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Button>
            </footer>
        </div>
    )
}
