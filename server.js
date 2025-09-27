import express from 'express';
import path from 'path';
import jsonServer from 'json-server';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
/* global process */
const PORT = process.env.PORT || 3001;

// Servir frontend
app.use(express.static(path.join(__dirname, 'dist')));

// Servir JSON Server en /api
const apiRouter = jsonServer.router('db.json');
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
