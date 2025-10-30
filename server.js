const express = require('express');
const path = require('path');
const { connectDB, sequelize } = require('./config/database');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const routineRoutes = require('./routes/routines');

const app = express();
const port = 3000;

// Connect to database
connectDB();

// Sync database models
sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables created!');
});

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/routines', routineRoutes);

// Serve the landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the dashboard page
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Serve the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Serve the register page
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
