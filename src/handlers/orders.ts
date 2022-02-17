import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import verifyToken from '../utilities/authorization';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
  const orders = await store.index();
  res.json(orders);

  }catch (err) {
  res.status(400);
  res.json((err as Error).message);
}
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const order_id: number = parseInt(_req.params.id);
  const product_id: number = parseInt(_req.body.product_id);
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, order_id, product_id);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};
const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyToken, index);
  app.post('/orders', verifyToken, create);
  app.post('/orders/:id/products', verifyToken, addProduct);
};

export default orderRoutes;
