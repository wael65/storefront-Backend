import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyToken from '../utilities/authorization';

const store = new ProductStore();

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price
    };

    const newProduct = await store.create(product);

    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

const index = async (_req: Request, res: Response) => {
 try{
  const products = await store.index();
  res.json(products);

} catch (err) {
  res.status(400).json((err as Error).message);
}
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json('product not found');
  }
};

const productRoutes = (app: express.Application): void => {
  app.post('/products', verifyToken, create);
  app.get('/products', index);
  app.get('/products/:id', show);
};

export default productRoutes;
