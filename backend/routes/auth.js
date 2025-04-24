const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const {
    fullName, username, email, password,
    preferredCategories, theme,
    reminderTime, defaultSort
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      username,
      email,
      password: hash,
      preferredCategories,
      theme,
      reminderTime,
      defaultSort
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;