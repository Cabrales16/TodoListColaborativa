import express from 'express';
import jsonServer from 'json-server';

const app = express();

/* global process */
const PORT = process.env.PORT || 3001;

// Servir JSON Server en /api
const apiRouter = jsonServer.router('db.json');
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
});
