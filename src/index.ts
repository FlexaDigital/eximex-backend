// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import prisma from './config/db.config';
import userRoute from './routes/adminRoute';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/api", userRoute);
// Start Server
app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`✅ Database connected successfully.`);
    console.log(`🚀 Server is running at:${PORT}`);
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error);
  }
});
