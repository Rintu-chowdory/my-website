import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API Routes need to be defined BEFORE the static file catch-all
app.get('/api/status', (req, res) => {
  res.json({ status: 'success', message: 'Backend connected established! ✨' });
});

// Serve frontend static files in production
const frontendDistPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDistPath));

// Catch-all route to serve the React app for any unmatched routes
app.use((req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
