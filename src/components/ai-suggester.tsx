'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { suggestKeywordsAction } from '@/lib/actions';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ResumeData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from './ui/scroll-area';

interface AISuggesterProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function AISuggester({ open, setOpen }: AISuggesterProps) {
    const [jobDescription, setJobDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const { getValues, setValue } = useFormContext<ResumeData>();
    const { toast } = useToast();

    const handleGetSuggestions = async () => {
        setIsLoading(true);
        setSuggestions([]);
        const result = await suggestKeywordsAction(jobDescription);
        setIsLoading(false);

        if (result.error) {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            });
        } else if (result.keywords) {
            setSuggestions(result.keywords);
        }
    };

    const handleAddSkill = (skill: string) => {
        const currentSkills = getValues('skills') || [];
        if (!currentSkills.includes(skill)) {
            setValue('skills', [...currentSkills, skill]);
            toast({
              title: 'Skill Added',
              description: `"${skill}" has been added to your skills.`,
            })
        } else {
             toast({
              title: 'Skill Exists',
              description: `You already have "${skill}" in your skills.`,
              variant: 'default',
            })
        }
    };
    
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="w-full sm:max-w-lg flex flex-col">
                <SheetHeader>
                    <SheetTitle>
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-accent" />
                            <span className="font-headline text-2xl">AI Keyword Suggestions</span>
                        </div>
                    </SheetTitle>
                    <SheetDescription>
                        Paste a job description below to get AI-powered suggestions for keywords and skills to include in your resume.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4 flex-grow flex flex-col gap-4">
                    <Textarea
                        placeholder="Paste job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="h-48 resize-none"
                    />
                    <Button onClick={handleGetSuggestions} disabled={isLoading || !jobDescription}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Wand2 className="mr-2 h-4 w-4" />
                                Get Suggestions
                            </>
                        )}
                    </Button>
                    <div className="flex-grow">
                        {suggestions.length > 0 && (
                            <ScrollArea className="h-full pr-4">
                               <p className="text-sm font-medium mb-2 text-muted-foreground">Click a keyword to add it to your skills:</p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestions.map((keyword, index) => (
                                        <button key={index} onClick={() => handleAddSkill(keyword)}>
                                            <Badge variant="secondary" className="cursor-pointer hover:bg-primary/20">{keyword}</Badge>
                                        </button>
                                    ))}
                                </div>
                            </ScrollArea>
                        )}
                    </div>
                </div>
                <SheetFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
