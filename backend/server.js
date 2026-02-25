import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config(); // Load environment variables from .env file
await connectDB(); // Connect to the database before starting the server

const app = express();
const PORT = process.env.PORT || 3000;  

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});