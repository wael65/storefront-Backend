import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  user_name: string;
  password: string;
};

export class UserStore {
  async create(u: User): Promise<User> {
    // Create new user
    try {
      const sql =
        'INSERT INTO users (first_name, last_name, user_name, password) VALUES($1, $2, $3, $4) RETURNING *';
      const conn = await Client.connect();
      const hash: string = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [
        u.first_name,
        u.last_name,
        u.user_name,
        hash
      ]);

      const user = result.rows[0];

      conn.release();

      console.log(`Creating new user with user-name: ${u.user_name}`);

      return user;
    } catch (err) {
      throw new Error(
        `Fail to add new user ${u.user_name} . Error: ${(err as Error).message}`
      );
    }
  }

  async index(): Promise<User[]> {
    // Getting the list of users
    try {
      const sql = 'SELECT * FROM users ';

      const conn = await Client.connect();

      const result = await conn.query(sql);
      conn.release();

      console.log('Getting the list of users: ');

      return result.rows;
    } catch (err) {
      throw new Error(
        `Fail to get the list of users. Error: ${(err as Error).message}`
      );
    }
  }

  async show(id: string): Promise<User> {
    // Getting a specific user using his id
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      console.log(`Getting data of the user who has id: ${id}`);

      return result.rows[0];
    } catch (err) {
      throw new Error(`Fail to find user who has id: ${id}. Error: ${err}`);
    }
  }
}




