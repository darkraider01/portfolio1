import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { PortfolioSchema } from '../types/portfolio';

const router = express.Router();

const DATA_DIR = path.join(__dirname, '..', 'data');

// ✅ POST: Save portfolio JSON
router.post('/', async (req: Request, res: Response) => {
  try {
    const parsed = PortfolioSchema.parse(req.body);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${parsed.personalInfo.name}_${timestamp}.json`;
    const filepath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filepath, JSON.stringify(parsed, null, 2));
    res.status(201).json({ message: 'Saved', filename });
  } catch (err) {
    res.status(400).json({ error: 'Validation failed', details: err });
  }
});

// ✅ GET: List all JSON files
router.get('/', async (_req: Request, res: Response) => {
  try {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
    res.json({ files });
  } catch (err) {
    res.status(500).json({ error: 'Could not list files', details: err });
  }
});

// ✅ GET: Fetch specific JSON file by filename
router.get('/:name', async (req: Request, res: Response) => {
  try {
    const filename = req.params.name;
    const filepath = path.join(DATA_DIR, filename);

    if (!fs.existsSync(filepath)) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    const content = fs.readFileSync(filepath, 'utf-8');
    res.json(JSON.parse(content));
  } catch (err) {
    res.status(500).json({ error: 'Internal error', details: err });
  }
});

export default router;
