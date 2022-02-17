import app from '../../../src/server';
import supertest from'supertest';
import { Order, OrderProduct, OrderStore} from '../../../src/models/order';
import {UserStore, User} from '../../../src/models/user';
import {ProductStore, Product} from '../../../src/models/product';
import jwt from 'jsonwebtoken';

const request = supertest(app);

const orderStore = new OrderStore()
const userStore = new UserStore()
const productStore = new ProductStore()

let user: User;
let product: Product;
let token: string

describe('Testing order endpoints response', () => {
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
    });

    it('Testing the /orders endpoint with post method', async done => {
        const order = await orderStore.create({
            status: 'Active',
            user_id: 1,
        });
        const response = await request.post('/orders')
        .auth(token, {type: "bearer"}).send(order)
        expect(response.status).toBe(200);
        done();
    });
    
    it('Testing the /orders endpoint with get method', async done => {
        const response = await request.get('/orders')
        .auth(token, {type: "bearer"})
        expect(response.status).toBe(200);
        done();
    });
    
    it('Testing the /orders/:id/products endpoint When adding products to an order', async done => {
        const product  = {
            product_id: 1,
            quantity:25
        }
        const response = await request.post('/orders/1/products')
        .auth(token, {type: "bearer"}).send(product);
        expect(response.status).toBe(200);
        done();
    });
    
});
