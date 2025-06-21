import React, { useState } from 'react';
import { Link, Github, Linkedin, Twitter, Globe, Loader } from 'lucide-react';
import { SocialLinks, GitHubRepo } from '../types/portfolio';
import { fetchGitHubRepos, extractGitHubUsername } from '../utils/github';

interface SocialLinksFormProps {
  data: SocialLinks;
  onChange: (data: SocialLinks) => void;
  onGitHubRepos: (repos: GitHubRepo[]) => void;
}

export const SocialLinksForm: React.FC<SocialLinksFormProps> = ({ data, onChange, onGitHubRepos }) => {
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [repoCount, setRepoCount] = useState(0);

  const handleChange = (field: keyof SocialLinks, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleGitHubChange = async (value: string) => {
    handleChange('github', value);
    
    if (value) {
      setIsLoadingRepos(true);
      try {
        const username = extractGitHubUsername(value);
        const repos = await fetchGitHubRepos(username);
        onGitHubRepos(repos);
        setRepoCount(repos.length);
      } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        onGitHubRepos([]);
        setRepoCount(0);
      } finally {
        setIsLoadingRepos(false);
      }
    } else {
      onGitHubRepos([]);
      setRepoCount(0);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 backdrop-blur-sm bg-opacity-95">
      <div className="flex items-center mb-6">
        <Link className="w-6 h-6 text-blue-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Social Links</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Github className="w-4 h-4 inline mr-1" />
            GitHub Profile *
          </label>
          <input
            type="url"
            value={data.github}
            onChange={(e) => handleGitHubChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="https://github.com/yourusername"
            required
          />
          {isLoadingRepos && (
            <div className="flex items-center mt-2 text-blue-500">
              <Loader className="w-4 h-4 animate-spin mr-2" />
              <p className="text-sm">Fetching your repositories...</p>
            </div>
          )}
          {!isLoadingRepos && repoCount > 0 && (
            <p className="text-sm text-green-600 mt-2">
              ✓ Found {repoCount} public repositories
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Linkedin className="w-4 h-4 inline mr-1" />
            LinkedIn Profile *
          </label>
          <input
            type="url"
            value={data.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="https://linkedin.com/in/yourprofile"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Twitter className="w-4 h-4 inline mr-1" />
            Twitter/X Profile
          </label>
          <input
            type="url"
            value={data.twitter}
            onChange={(e) => handleChange('twitter', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="https://twitter.com/yourusername"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Globe className="w-4 h-4 inline mr-1" />
            Personal Website
          </label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => handleChange('website', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Link className="w-4 h-4 inline mr-1" />
            Other Link
          </label>
          <input
            type="url"
            value={data.other}
            onChange={(e) => handleChange('other', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Portfolio, Blog, or other professional link"
          />
        </div>
      </div>
    </div>
  );
};