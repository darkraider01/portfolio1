import { GitHubRepo } from '../types/portfolio';

/**
 * Extract a GitHub username from full URLs or plain input.
 */
export const extractGitHubUsername = (input: string): string => {
  if (!input || typeof input !== 'string') return '';

  let normalized = input.trim().replace(/^https?:\/\//, '').replace(/^www\./, '');

  // Remove query string or hash fragments
  normalized = normalized.split(/[?#]/)[0].replace(/\/+$/, '');

  const parts = normalized.split('/');

  const githubIndex = parts.findIndex((p) => p === 'github.com');
  if (githubIndex !== -1 && parts.length > githubIndex + 1) {
    return parts[githubIndex + 1];
  }

  // If it's a plain username
  if (/^[a-zA-Z0-9-]{1,39}$/.test(normalized)) {
    return normalized;
  }

  return '';
};

/**
 * Fetch GitHub repos via backend proxy with filtering.
 */
export const fetchGitHubRepos = async (usernameInput: string): Promise<GitHubRepo[]> => {
  const username = extractGitHubUsername(usernameInput);
  if (!username) {
    console.warn('No valid GitHub username provided');
    return [];
  }

  try {
    const response = await fetch(`/api/github/repos?username=${encodeURIComponent(username)}`);

    if (!response.ok) {
      if (import.meta.env.DEV) {
        console.error('GitHub API Error:', response.status, response.statusText);
      }
      return [];
    }

    const repos: GitHubRepo[] = await response.json();

    return repos
      .filter((repo) => !repo.fork && !repo.private) // removed .name.startsWith('.') to allow .dotfiles
      .sort((a, b) => {
        const scoreA = a.stargazers_count * 2 + new Date(a.updated_at).getTime() / 1e9;
        const scoreB = b.stargazers_count * 2 + new Date(b.updated_at).getTime() / 1e9;
        return scoreB - scoreA;
      })
      .slice(0, 20);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Error fetching GitHub repos:', error);
    }
    return [];
  }
};
