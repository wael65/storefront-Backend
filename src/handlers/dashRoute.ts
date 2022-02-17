import express, { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';
import verifyToken from '../utilities/authorization';

const dashboard = new DashboardQueries();

const ordersProdUser = async (req: Request, res: Response) => {
  try{
  const result = await dashboard.ordersProdUser(req.params.id);
  res.json(result);
  
}catch (err) {
  res.status(400);
  res.json((err as Error).message);
}
};

const dashboardRoutes = (app: express.Application) => {
  app.get('/user-orders/:id', verifyToken, ordersProdUser);
};

export default dashboardRoutes;
