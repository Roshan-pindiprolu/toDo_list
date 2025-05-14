const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/:type', (req, res) => {
  const { type } = req.params;
  const filePath = path.join(__dirname, `../data/signup/${type}.json`);

  // Step 1: Check if file exists
  fs.access(filePath, fs.constants.F_OK, (accessErr) => {
    if (accessErr) {
      return res.status(404).json({ error: `${type}.json not found` });
    }

    // Step 2: Read file if it exists
    fs.readFile(filePath, 'utf-8', (readErr, data) => {
      if (readErr) {
        return res.status(500).json({ error: `Failed to read ${type}.json` });
      }

      try {
        const parsed = JSON.parse(data);
        res.json(parsed);
      } catch (parseErr) {
        res.status(500).json({ error: `Invalid JSON in ${type}.json` });
      }
    });
  });
});

module.exports = router;
