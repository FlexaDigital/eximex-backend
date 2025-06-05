import prisma from '../config/db.config';
import { Request, Response } from 'express';

const userController = {
  registerUser: async (req: Request, res: Response): Promise<any> => {
    const { name, email, password, phone } = req.body;
    console.log(req.body);
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password, // 🚨 Make sure to hash this in production!
          phone,
        },
      });

  return res.status(201).json({
  message: 'User registered successfully',
  user,
});
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default userController;
