const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const metaRoutes = require('./routes/meta');


const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/meta', metaRoutes);

require('dotenv').config();
const PORT = 2400;

// MongoDB Connection (new style)
mongoose.connect(process.env.MONGO_URI)  
.then(() => {
  console.log('Connected to MongoDB ✅');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB ❌', err);
});




  app.get('/', (req, res) => {
    res.send('Backend server is running ✅');
  });
  

// Start Server
// app.listen(2400, () => console.log('Server running on port 2400'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

