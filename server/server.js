import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import applicationRoutes from './routes/applicationRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables (.env)
dotenv.config();
mongoose.set('debug', true);

const app = express();

// Global Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('dev')); // Log requests to the console
app.use(express.json()); // Body parser to read JSON data from requests

// API Routes
app.get('/', (req, res) => res.send('🚀 TEYZIX CORE API is running!'));
app.get('/ping', (req, res) => res.send('pong'));
app.use('/api/applications', applicationRoutes);

// Centralized Error Handling Middleware (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5050;

// Start Server only after DB connection
const startServer = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await connectDB();
    console.log(`📡 MongoDB readyState: ${mongoose.connection.readyState}`);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
