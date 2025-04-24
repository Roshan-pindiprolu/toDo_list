const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  preferredCategories: [String],
  theme: { type: String, default: 'light' },
  reminderTime: String,
  defaultSort: {
    type: String,
    enum: ['dueDate', 'category', 'createdAt'],
    default: 'dueDate',
  },
});

module.exports = mongoose.model('User', userSchema);