import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.routes.js';
import companyRoute from './routes/company.route.js';

connectDB();
dotenv.config({});
const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
//routes

//api's
app.use('/api/user',userRoute);
app.use('/api/company',companyRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});