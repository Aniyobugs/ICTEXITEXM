const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { connectDB } = require('./connection');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

app.use(express.json());

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({ origin: CLIENT_URL, credentials: true }));

const sessionSecret = process.env.SESSION_SECRET || 'devsecret';
const mongoUrl = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/exitexam';

app.use(
  session({
    name: 'sid',
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    store: MongoStore.create({ mongoUrl }),
  }),
);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

app.get('/', (req, res) => res.json({ message: 'API is running' }));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
