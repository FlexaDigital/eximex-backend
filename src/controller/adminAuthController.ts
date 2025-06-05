import prisma from '../config/db.config';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { log } from 'console';

export const loginAdmin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.SECRET_KEY as string,{ expiresIn: '1d' })
      res.cookie('admin_token', token, {
      httpOnly: true,            // Prevents client-side JS from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      sameSite: 'strict',        // Helps prevent CSRF
      maxAge: 24 * 60 * 60 * 1000 // 1 day in ms
    });
    return res.status(200).json({
      message: 'Login successful',
      user,token
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
export const adminLogout = async (req: Request, res: Response): Promise<any> => {
  try {
    res.clearCookie('admin_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

