const express = require('express');
const child_process = require('child_process');

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

// Intentionally insecure example for the SAST assignment.
// User input is included in a shell command.
app.get('/greet', (req, res) => {
  const name = req.query.name || 'visitor';

  child_process.exec('echo Hello ' + name, (error, stdout) => {
    if (error) {
      return res.status(500).json({ error: 'Greeting failed' });
    }

    res.type('text/plain').send(stdout);
  });
});

// Start the server when this file is run directly.
if (require.main === module) {
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

// Allow tests to load the application.
module.exports = app;