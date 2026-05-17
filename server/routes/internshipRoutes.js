import express from 'express';
import { getInternships, createInternship, updateInternship, deleteInternship } from '../controllers/internshipController.js';

const router = express.Router();

router.get('/', getInternships);
router.post('/', createInternship);
router.put('/:id', updateInternship);
router.delete('/:id', deleteInternship);

export default router;
