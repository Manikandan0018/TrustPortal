import express from 'express';
import dotenv from 'dotenv';
import connectDB from './connectDB.js';
import textRoute from './routes/text.route.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Show backend URL in console
console.log(`Backend running at: ${process.env.VITE_BACKEND_URL}`);

// CORS setup
const allowedOrigins = [
  process.env.APPLICATION_URL,  // Frontend on Vercel
  'http://localhost:5173'       // Local React dev
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow server-to-server requests

    const allowedOrigins = [
      'http://localhost:5173',
      /\.vercel\.app$/
    ];

    if (allowedOrigins.some(o => typeof o === 'string' ? o === origin : o.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send(`Backend server is running at ${process.env.BACKEND_URL}`);
});

app.use('/api/auth', textRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  connectDB();
});
