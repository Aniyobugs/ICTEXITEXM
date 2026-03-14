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

// In production the app is behind Render's proxy/load‑balancer.  Enable
// trust proxy so that `req.secure` is correctly set and secure cookies work.
app.set('trust proxy', 1);

// Connect to DB
connectDB();

app.use(express.json());

// CORS: support single or multiple allowed origins via env
// Set CLIENT_URLS to a comma-separated list (e.g. http://localhost:5173,https://yourapp.vercel.app)
const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // allow server-to-server or tools like curl (no origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: Origin not allowed'), false);
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use((req, res, next) => {
  // quick guard to expose allowed origin dynamically (if cors middleware sets it)
  res.header('Vary', 'Origin');
  next();
});

app.use(cors(corsOptions));

const sessionSecret = process.env.SESSION_SECRET;
const mongoUrl = process.env.MONGO_URI;

// the backend uses a session cookie for auth. since the frontend and backend
// are on different origins in both development (localhost:5173 <> 5000) and
// production (vercel <> render), the cookie must be allowed cross-site. the
// only reliable way to do that is `SameSite=None` (which also requires `secure`
// when running over HTTPS – fine on both dev and prod since Vite/HMR run over
// https://localhost by default).
const cookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === 'production', // secure flag can be false on local http
  sameSite: NODE_ENV === 'production' ? 'none' : 'lax', // lax for dev, none for prod
  maxAge: 1000 * 60 * 60 * 24, // 1 day
};

app.use(
  session({
    name: 'sid',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: cookieOptions,
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
