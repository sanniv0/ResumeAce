import { type ResumeData } from './types';

export const initialData: ResumeData = {
  personalDetails: {
    fullName: 'Amelia Warner',
    email: 'amelia.warner@example.com',
    phoneNumber: '(123) 456-7890',
    address: '123 Innovation Drive, Techville, TX 75001',
    website: 'https://ameliawarner.dev',
  },
  experience: [
    {
      jobTitle: 'Senior Software Engineer',
      company: 'Innovatech Solutions',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: '• Led the development of scalable web applications using React and Node.js.\n• Mentored junior engineers and improved code quality through CI/CD pipelines.\n• Collaborated with product managers to define feature requirements.',
    },
    {
      jobTitle: 'Software Engineer',
      company: 'Digital Creations Inc.',
      startDate: 'Jun 2017',
      endDate: 'Dec 2019',
      description: '• Developed and maintained client-side features for a high-traffic e-commerce platform using Next.js.\n• Collaborated with UX/UI designers to implement responsive and accessible designs.\n• Optimized application performance, reducing page load times by 20%.',
    },
  ],
  education: [
    {
      degree: 'B.S. in Computer Science',
      institution: 'State University of Technology',
      startDate: 'Aug 2013',
      endDate: 'May 2017',
    },
  ],
  skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'JavaScript', 'HTML5', 'CSS3', 'Agile Methodologies'],
  theme: {
    color: '#3F51B5', // Deep Blue
    font: 'Space Grotesk',
  },
};
