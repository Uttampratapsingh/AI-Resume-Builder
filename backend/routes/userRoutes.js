import express from 'express';
import { getUserById, loginUser, registerUser } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';
import { getUserResumes } from '../controllers/resumeController.js';

const userRouter = express.Router();


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', protect, getUserById);
userRouter.get('/resumes', protect,getUserResumes);

export default userRouter;