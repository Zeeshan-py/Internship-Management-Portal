import express from 'express';
import { createApplication, getApplications } from '../controllers/applicationController.js';

const router = express.Router();

// Define routes and map them to controller functions
router.post('/', createApplication); // POST /api/applications
router.get('/all', getApplications); // GET /api/applications/all

export default router;
