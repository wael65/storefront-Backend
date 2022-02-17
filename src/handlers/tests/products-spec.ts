import app from '../../../src/server';
import supertest from'supertest';
import { User,UserStore } from '../../../src/models/user';
import {ProductStore, Product} from '../../../src/models/product'
import jwt from 'jsonwebtoken';

const request = supertest(app);

const store = new ProductStore()
const userStore = new UserStore()

let user: User;
let token: string

describe('Testing products endpoints response', () => {
    beforeAll(async () => {
        user = await userStore.create({
          first_name: 'testFirstName',
          last_name: 'testLastName',
          user_name: 'testNewUser',
          password: 'testPassword'
        });
        if (process.env.TOKEN_SECRET) {
            token = jwt.sign({user: user}, process.env.TOKEN_SECRET)
        }
    });

    it('Testing the /products endpoint  with get method', async done => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
        done();
    });
    
    it('Testing the /products endpoint with post method ', async done => {
        const product: Product = {
            name: 'testProduct',
            price: 100,
        }
        const response = await request.post('/products')
        .auth(token,{type:"bearer"}).send(product)
        expect(response.status).toBe(200);
        done();
    });

    it('Testing the /products/1 endpoint with show method ', async done => {
      const response = await request.get('/products/1');
      expect(response.status).toBe(200);
      done();
  });
});