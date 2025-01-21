const express = require('express');
const app = express();
const port = 3000;

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Optional: 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});