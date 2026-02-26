import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from '../controllers/resumeController.js';
import upload from '../config/multer.js';



const resumeRouter = express.Router();


resumeRouter.post('/create',protect,createResume);
resumeRouter.put('/update',upload.single('image'),protect,updateResume); // Update route with multer middleware to handle image upload. it will look for an 'image' field in the request body and process the file upload before calling the updateResume controller.
resumeRouter.delete('/delete/:resumeId',protect,deleteResume);
resumeRouter.get('/get/:resumeId',protect,getResumeById);
resumeRouter.get('/public/:resumeId',getPublicResumeById);


export default resumeRouter;