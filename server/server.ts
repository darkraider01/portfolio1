// server.ts
import express from 'express';
import cors from 'cors';
import githubRoutes from './routes/github';
import portfolioRoutes from './routes/portfolio';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3001;

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json());

// ✅ Correctly mount route modules
app.use('/api/github', githubRoutes);
app.use('/api/portfolio', portfolioRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
