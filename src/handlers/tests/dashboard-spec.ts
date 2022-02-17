import app from '../../server';
import supertest from 'supertest';
import { Order, OrderProduct, OrderUser, OrderStore} from '../../../src/models/order'
import {UserStore, User} from '../../../src/models/user';
import {ProductStore, Product} from '../../../src/models/product';
import jwt from 'jsonwebtoken';

const request = supertest(app);

const orderStore = new OrderStore()
const userStore = new UserStore()
const productStore = new ProductStore()

let order: Order;
let orderProduct: OrderProduct;
let user: User;
let product: Product;
let token: string

describe('Testing the main route and the service route', () => {
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
        product = await productStore.create({
            name: 'testProduct',
            price: 100,
        });

        order = await orderStore.create({
            status: 'Active',
            user_id: 1,
        });
       orderProduct = await orderStore.addProduct(20, 1, 1);
    });

    it('Testing the main endpoint', async (done) => {
      const response = await request.get('/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('Main Endpoint');
      done();
    });

    it('Testing the /user-orders/:id  endpoint where getting order details for a specific user', async (done) => {
        const response = await request.get('/user-orders/1')   
        .auth(token, {type: "bearer"});
        expect(response.status).toBe(200);
        done();
    });
});


  