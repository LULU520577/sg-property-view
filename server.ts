/**
 * server.ts - Express server with dual Vite dev middleware & production serving
 * Integrates standalone API handlers for AI Studio preview & local development
 */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

// Standalone API handler imports (matching Vercel serverless functions)
import hdbHandler from './api/hdb.js';
import uraHandler from './api/ura.js';
import oneMapHandler from './api/onemap.js';
import geminiHandler from './api/gemini.js';
import healthHandler from './api/health.js';
import insightsHandler from './api/insights.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const isProduction = process.env.NODE_ENV === 'production';

  // Parse JSON payloads
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Register identical serverless API handlers
  app.all('/api/hdb', hdbHandler);
  app.all('/api/ura', uraHandler);
  app.all('/api/onemap', oneMapHandler);
  app.all('/api/gemini', geminiHandler);
  app.all('/api/health', healthHandler);
  app.all('/api/insights', insightsHandler);

  if (!isProduction) {
    // Vite middleware for dev mode
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true'
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Serve static build in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SG Property Intelligence] Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
