import { z } from 'zod';

// ---------- Interfaces (Frontend Types) ----------

export interface PersonalInfo {
  name: string;
  age: string;
  location: string;
  email: string;
  phone: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  gpa?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  organization?: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  other?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  fork: boolean;
  private: boolean;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  aboutMe: string;
  education: Education[];
  projects: Project[];
  achievements: Achievement[];
  socialLinks: SocialLinks;
  githubRepos: GitHubRepo[];
  generatedAt: string;
}

// ---------- Zod Schemas (Backend Validation) ----------

export const GitHubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.string(),
  homepage: z.string().nullable(),
  language: z.string().nullable(),
  topics: z.array(z.string()),
  stargazers_count: z.number(),
  forks_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  fork: z.boolean(), // ✅ ADD THIS LINE
  private: z.boolean(), // ✅ Optional but often included
});

export const PortfolioSchema = z.object({
  personalInfo: z.object({
    name: z.string(),
    age: z.string(),
    location: z.string(),
    email: z.string().email(),
    phone: z.string(),
  }),
  aboutMe: z.string(),
  education: z.array(
    z.object({
      id: z.string(),
      institution: z.string(),
      degree: z.string(),
      field: z.string(),
      startYear: z.string(),
      endYear: z.string(),
      gpa: z.string().optional(),
    })
  ),
  projects: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      technologies: z.array(z.string()),
      githubUrl: z.string().url().optional(),
      liveUrl: z.string().url().optional(),
      imageUrl: z.string().url().optional(),
    })
  ),
  achievements: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      date: z.string(),
      organization: z.string().optional(),
    })
  ),
  socialLinks: z.object({
    github: z.string(),
    linkedin: z.string(),
    twitter: z.string(),
    website: z.string(),
    other: z.string(),
  }),
  githubRepos: z.array(GitHubRepoSchema),
  generatedAt: z.string(),
});

// ---------- Type Inference from Zod ----------

export type Portfolio = z.infer<typeof PortfolioSchema>;
