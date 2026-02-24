const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { connectDB } = require('./connection');

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'SESSION_SECRET', 'CLIENT_URL'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
  console.error(`ERROR: Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to DB
connectDB();

app.use(express.json());

const CLIENT_URL = process.env.CLIENT_URL;
app.use(cors({ origin: CLIENT_URL, credentials: true }));

const sessionSecret = process.env.SESSION_SECRET;
const mongoUrl = process.env.MONGO_URI;

app.use(
  session({
    name: 'sid',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    store: MongoStore.create({ mongoUrl }),
  }),
);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

app.get('/', (req, res) => res.json({ message: 'API is running' }));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const statusCode = err.status || 500;
  const message = NODE_ENV === 'production' ? 'Internal Server Error' : err.message;
  res.status(statusCode).json({ message });
});

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} [${NODE_ENV}]`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
