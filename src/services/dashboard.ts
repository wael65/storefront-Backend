import Client from '../database';
import { OrderUser } from '../models/order';
import { User } from '../models/user';

// Getting the order Details for specific user
export class DashboardQueries {
  async ordersProdUser(user_id: string): Promise<OrderUser> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT order_products.order_id, orders.user_id , orders.status,  order_products.quantity, products.name, products.price FROM orders INNER JOIN order_products ON order_products.order_id = orders.id INNER JOIN products ON order_products.product_id = products.id WHERE user_id = ($1)';

      const result = await conn.query(sql, [user_id]);

      conn.release();

      console.log(`Getting orders details for the user who has id: ${user_id}`);

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Fail to getting orders details for user who has id:${user_id} . Error: ${err}`
      );
    }
  }

}
