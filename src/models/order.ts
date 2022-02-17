import client from '../database';

export type Order = {
  id?: number;
  status?: string;
  user_id?: number;
};

export type OrderProduct = {
  id?: number;
  quantity: number;
  order_id: number;
  product_id: number;
};

export type OrderUser = {
  user_id?: number;
  name: string;
  price: number;
  quantity: number;
  order_id: number;
  status: string;
  product_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    // Getting the list of orders
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();

      console.log('Getting the list of ordres: ');

      return result.rows;
    } catch (err) {
      throw new Error(`Fail to get the list of orders. Error: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    // Create new order
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [o.status, o.user_id]);

      const order = result.rows[0];

      conn.release();

      console.log(`Creating new order who has id: ${o.id}`);

      return order;
    } catch (err) {
      throw new Error(`Fail to add new order ${o.id}. Error: ${err}`);
    }
  }

  // Adding products to a specific order
  async addProduct(
    quantity: number,
    order_id: number,
    product_id: number
  ): Promise<OrderProduct> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      //@ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [quantity, order_id, product_id]);

      const order = result.rows[0];

      conn.release();

      console.log(`Adding products to the order who has id : ${order_id}`);

      return order;
    } catch (err) {
      throw new Error(
        `fail toadd product ${product_id} to order ${order_id}: ${err}`
      );
    }
  }
}
