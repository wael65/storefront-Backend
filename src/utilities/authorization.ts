import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Create token Validator middleware

const verifyToken = (req: Request, res: Response, next: () => void) => {
  try {
    if (process.env.TOKEN_SECRET) {
      const authorizationHeader = req.headers
        .authorization as unknown as string;
      const token = authorizationHeader.split(' ')[1];
      jwt.verify(token, process.env.TOKEN_SECRET);
      next();
    }
  } catch (error) {
    res.status(401);
    res.json('Access denied, invalid token');
  }
};

export default verifyToken;
