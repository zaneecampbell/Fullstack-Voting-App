const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Defined Route/s
app.use('/api', require('./routes/api/poll'));

// Server statis assets in production
if (process.env.NODE_ENV === 'production') {
  // Set statis folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Began trying to launch to heroku
