import express from 'express';
import fetch from 'node-fetch';
import { z } from 'zod';
import { GitHubRepoSchema } from '../types/portfolio';

const router = express.Router();

router.get('/repos', async (req, res) => {
  const username = req.query.username;
  if (!username || typeof username !== 'string') {
    res.status(400).json({ error: 'Missing or invalid username' });
    return;
  }

  try {
    const apiResponse = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!apiResponse.ok) {
      res.status(apiResponse.status).json({ error: 'GitHub API error' });
      return;
    }

    const json = await apiResponse.json();
    const parsed = z.array(GitHubRepoSchema).safeParse(json);

    if (!parsed.success) {
      res.status(500).json({ error: 'GitHub API returned unexpected data' });
      return;
    }

    const repos = parsed.data.filter(repo => !repo.fork);
    res.json(repos);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: (error as Error).message });
  }
});

export default router;
