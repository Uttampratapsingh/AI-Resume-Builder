import express from 'express';
import { getUserById, loginUser, registerUser } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';
import { getUserResumes } from '../controllers/resumeController.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/data', protect, getUserById);
router.get('/resumes', protect,getUserResumes);

export default router;