import { z } from 'zod';

export const PersonalDetailsSchema = z.object({
  fullName: z.string(),
  email: z.string().email({ message: "Invalid email address" }).or(z.literal('')),
  phoneNumber: z.string(),
  address: z.string(),
  website: z.string().url({ message: "Invalid URL" }).optional().or(z.literal('')),
});

export const ExperienceSchema = z.object({
  jobTitle: z.string(),
  company: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
});

export const EducationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const ResumeSchema = z.object({
  personalDetails: PersonalDetailsSchema,
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.array(z.string()),
  theme: z.object({
    color: z.string(),
    font: z.string(),
  }),
});

export type ResumeData = z.infer<typeof ResumeSchema>;
