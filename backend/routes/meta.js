const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// GET: /api/meta/categories
router.get('/categories', (req, res) => {
  const filePath = path.join(__dirname, '../data/signup/categories.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load categories' });
    }
    res.json(JSON.parse(data)); // Send parsed JSON to client
  });
});

module.exports = router;
