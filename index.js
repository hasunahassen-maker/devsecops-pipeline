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

// Start the server when this file is run directly.
// Tests can import the app without starting this server.
if (require.main === module) {
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

module.exports = app;