import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Application from './models/Application.js';

dotenv.config();

const test = async () => {
  try {
    console.log('Connecting...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');
    
    console.log('Creating application...');
    const app = await Application.create({
      name: 'Test',
      email: 'test@test.com',
      phone: '1234567890',
      domain: 'Web Development',
      message: 'Test message'
    });
    console.log('Success!', app);
    process.exit(0);
  } catch (err) {
    console.error('Failed!', err);
    process.exit(1);
  }
};

test();
