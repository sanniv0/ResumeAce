'use server';
import { suggestKeywords } from '@/ai/flows/suggest-keywords';
import { z } from 'zod';

const jobDescriptionSchema = z.string().min(1, 'Job description cannot be empty.');

export async function suggestKeywordsAction(jobDescription: string) {
    const validation = jobDescriptionSchema.safeParse(jobDescription);
    if (!validation.success) {
        return { error: 'Job description cannot be empty.' };
    }
    try {
        const keywords = await suggestKeywords(validation.data);
        return { keywords };
    } catch (e) {
        console.error(e);
        return { error: 'Failed to get suggestions. Please try again later.' };
    }
}
