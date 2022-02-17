import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    // Getting the list of products
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();

      console.log('Getting the list of products: ');

      return result.rows;
    } catch (err) {
      throw new Error(
        `Fail to get the list of products. Error: ${(err as Error).message}`
      );
    }
  }

  async show(id: string): Promise<Product> {
    // Getting a specific product using its id
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      console.log(`Getting data of the product who has id: ${id}`);

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Fail to find product who has id: ${id}. Error: ${
          (err as Error).message
        }`
      );
    }
  }

  async create(p: Product): Promise<Product> {
    // Create new product
    try {
      const sql =
        'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [p.name, p.price]);

      const product = result.rows[0];

      conn.release();

      console.log(`Creating new product with name: ${p.name}`);

      return product;
    } catch (err) {
      throw new Error(
        `Fail to add new product ${p.name} . Error: ${(err as Error).message}`
      );
    }
  }
}
