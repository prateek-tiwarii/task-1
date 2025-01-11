import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import UserRoutes from './routes/userRoute.js';
import AdminRoutes from './routes/adminRoute.js';
import connectToDb from './utils/db.js';
import AuthRouter from './routes/Auth.js';

const app = express();
dotenv.config();

// Updated CORS configuration
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            'https://task-1-sa6j.vercel.app',
            'http://localhost:5173',
            'https://task-1-usernew.vercel.app'
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());

connectToDb();

app.get('/', (req, res) => {
    res.json({
        message: "Hello Hello",
        healthy: true
    })
})

app.use('/api/user', UserRoutes);
app.use('/api/admin', AdminRoutes);
app.use("/api/auth", AuthRouter);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});