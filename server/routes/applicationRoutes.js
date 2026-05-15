import express from 'express';
import { createApplication, getApplications, adminLogin, updateApplicationStatus } from '../controllers/applicationController.js';

const router = express.Router();

// Define routes and map them to controller functions
router.post('/', createApplication); // POST /api/applications
router.get('/all', getApplications); // GET /api/applications/all
router.post('/login', adminLogin); // POST /api/applications/login
router.put('/:id/status', updateApplicationStatus); // PUT /api/applications/:id/status

export default router;
