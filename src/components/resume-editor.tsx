'use client';

import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { User, Briefcase, GraduationCap, Star, Trash2, PlusCircle, Palette, Type, X } from 'lucide-react';
import type { ResumeData } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { useState, KeyboardEvent } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const fonts = ['Inter', 'Space Grotesk', 'Georgia', 'Verdana'];
const colors = [
    { name: 'Deep Blue', value: '#3F51B5' },
    { name: 'Teal', value: '#009688' },
    { name: 'Graphite', value: '#616161' },
    { name: 'Crimson', value: '#DC143C' },
];

export default function ResumeEditor() {
    const { control, getValues, setValue } = useFormContext<ResumeData>();

    const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({ control, name: "experience" });
    const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({ control, name: "education" });
    
    const [skillInput, setSkillInput] = useState('');
    const skills = getValues('skills') || [];

    const handleAddSkill = () => {
        if (skillInput.trim() !== '' && !skills.includes(skillInput.trim())) {
            setValue('skills', [...skills, skillInput.trim()]);
            setSkillInput('');
        }
    };
    
    const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSkill();
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setValue('skills', skills.filter(skill => skill !== skillToRemove));
    };

    return (
        <Card className="w-full">
            <CardContent className="p-0">
                <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="px-6">
                            <div className="flex items-center gap-3">
                                <Palette className="h-5 w-5 text-accent" />
                                <span className="font-headline text-lg">Appearance</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 space-y-4">
                            <FormField
                                control={control}
                                name="theme.color"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Theme Color</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a color" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {colors.map(color => (
                                                    <SelectItem key={color.value} value={color.value}>
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color.value }} />
                                                            {color.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={control}
                                name="theme.font"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Headline Font</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a font" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {fonts.map(font => (
                                                    <SelectItem key={font} value={font} style={{fontFamily: font}}>
                                                        {font}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="px-6">
                            <div className="flex items-center gap-3">
                                <User className="h-5 w-5 text-accent" />
                                <span className="font-headline text-lg">Personal Details</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 space-y-4">
                            <FormField control={control} name="personalDetails.fullName" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="personalDetails.email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="personalDetails.phoneNumber" render={({ field }) => (<FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="personalDetails.address" render={({ field }) => (<FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={control} name="personalDetails.website" render={({ field }) => (<FormItem><FormLabel>Website / Portfolio</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger className="px-6">
                            <div className="flex items-center gap-3">
                                <Briefcase className="h-5 w-5 text-accent" />
                                <span className="font-headline text-lg">Work Experience</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 space-y-4">
                            {experienceFields.map((field, index) => (
                                <Card key={field.id}>
                                    <CardContent className="p-4 space-y-4 relative">
                                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeExperience(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                        <FormField control={control} name={`experience.${index}.jobTitle`} render={({ field }) => (<FormItem><FormLabel>Job Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={control} name={`experience.${index}.company`} render={({ field }) => (<FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                          <FormField control={control} name={`experience.${index}.startDate`} render={({ field }) => (<FormItem><FormLabel>Start Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                          <FormField control={control} name={`experience.${index}.endDate`} render={({ field }) => (<FormItem><FormLabel>End Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        </div>
                                        <FormField control={control} name={`experience.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} rows={5} /></FormControl><FormMessage /></FormItem>)} />
                                    </CardContent>
                                </Card>
                            ))}
                            <Button variant="outline" onClick={() => appendExperience({ jobTitle: '', company: '', startDate: '', endDate: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
                        </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="px-6">
                             <div className="flex items-center gap-3">
                                <GraduationCap className="h-5 w-5 text-accent" />
                                <span className="font-headline text-lg">Education</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 space-y-4">
                            {educationFields.map((field, index) => (
                                <Card key={field.id}>
                                    <CardContent className="p-4 space-y-4 relative">
                                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => removeEducation(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                        <FormField control={control} name={`education.${index}.degree`} render={({ field }) => (<FormItem><FormLabel>Degree / Certificate</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={control} name={`education.${index}.institution`} render={({ field }) => (<FormItem><FormLabel>Institution</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <FormField control={control} name={`education.${index}.startDate`} render={({ field }) => (<FormItem><FormLabel>Start Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                            <FormField control={control} name={`education.${index}.endDate`} render={({ field }) => (<FormItem><FormLabel>End Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                             <Button variant="outline" onClick={() => appendEducation({ degree: '', institution: '', startDate: '', endDate: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
                        </AccordionContent>
                    </AccordionItem>

                     <AccordionItem value="item-5">
                        <AccordionTrigger className="px-6">
                             <div className="flex items-center gap-3">
                                <Star className="h-5 w-5 text-accent" />
                                <span className="font-headline text-lg">Skills</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={handleSkillKeyDown}
                                    placeholder="Add a skill"
                                />
                                <Button type="button" onClick={handleAddSkill}>Add</Button>
                            </div>
                            <Controller
                                control={control}
                                name="skills"
                                render={({ field }) => (
                                    <div className="flex flex-wrap gap-2">
                                        {field.value.map((skill, index) => (
                                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                                {skill}
                                                <button type="button" onClick={() => handleRemoveSkill(skill)} className="rounded-full hover:bg-muted-foreground/20">
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
