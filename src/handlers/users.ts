import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import verifyToken from '../utilities/authorization';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET;

const store = new UserStore();

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_name: req.body.user_name,
      password: req.body.password
    };

    const newUser = await store.create(user);
    const token = jwt.sign(
      {
        user: {
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          user_name: newUser.user_name,
          id: newUser.id
        }
      },
      tokenSecret as string
    );
    res.json(token);
  } catch (err) {
    res.status(400).json((err as Error).message);
  }
};

const index = async (_req: Request, res: Response) => {
  try{
  const users = await store.index();
  res.json(users);

} catch (err) {
  res.status(400).json((err as Error).message);
}
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json('user not found');
  }
};

const userRoutes = (app: express.Application): void => {
  app.post('/users', create);
  app.get('/users', verifyToken, index);
  app.get('/users/:id', verifyToken, show);
};

export default userRoutes;
