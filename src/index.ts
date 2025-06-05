// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import prisma from './config/db.config';
import userRoute from './routes/userRoute';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use("/api", userRoute);
// Start Server
app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('❌ Error connecting to database:', error);
  }
});
