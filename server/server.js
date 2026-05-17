import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import applicationRoutes from './routes/applicationRoutes.js';
import internshipRoutes from './routes/internshipRoutes.js';
import adminSettingsRoutes from './routes/adminSettingsRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();
mongoose.set('debug', process.env.NODE_ENV !== 'production');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => res.send('TEYZIX CORE API is running!'));
app.get('/ping', (req, res) => res.send('pong'));
app.use('/api/applications', applicationRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/admin-settings', adminSettingsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5050;

const startServer = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log(`MongoDB readyState: ${mongoose.connection.readyState}`);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
