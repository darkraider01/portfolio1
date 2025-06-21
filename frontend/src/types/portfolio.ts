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
  githubUrl?: string | null;
  liveUrl?: string | null;
  imageUrl?: string | null;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  organization?: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  other: string;
}

export interface GitHubRepo {
  readonly id: number;
  readonly name: string;
  readonly description: string | null;
  readonly html_url: string;
  readonly homepage: string | null;
  readonly language: string | null;
  readonly topics: string[];
  readonly stargazers_count: number;
  readonly fork: boolean;
  readonly private: boolean;
  readonly created_at: string;
  readonly updated_at: string;
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
