const express = require('express');

const app = express();
const port = 3000;

// Return the API's health status.
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Return a fixed list of items.
app.get('/items', (_req, res) => {
  res.json([
    { id: 1, name: 'Notebook' },
    { id: 2, name: 'Pen' }
  ]);
});

// Create the greeting directly without executing a shell command.
app.get('/greet', (req, res) => {
  const name =
    typeof req.query.name === 'string' ? req.query.name : 'visitor';

  res.type('text/plain').send(`Hello ${name}`);
});

// Start the server when this file is run directly.
if (require.main === module) {
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

// Allow tests to load the application.
module.exports = app;