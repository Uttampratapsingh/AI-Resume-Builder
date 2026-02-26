import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';

// dotenv.config() is handled by the import 'dotenv/config' at the top

await connectDB(); // Connect to the database before starting the server

const app = express();
const PORT = process.env.PORT || 3000;  

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.use('/api/users',userRouter);
app.use('/api/resumes',resumeRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});