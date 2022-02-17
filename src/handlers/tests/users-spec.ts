import app from '../../../src/server';
import jwt from 'jsonwebtoken';
import {User, UserStore} from '../../../src/models/user'
import supertest from'supertest';

const request = supertest(app);

const store = new UserStore()

let user: User;
let token: string

describe('Testing user endpoints response', () => {
    beforeAll(async () => {
        user = await store.create({
          first_name: 'testFirstName',
          last_name: 'testLastName',
          user_name: 'testNewUser',
          password: 'testPassword'
        });
        if (process.env.TOKEN_SECRET) {
            token = jwt.sign({user: user}, process.env.TOKEN_SECRET)
        }
    });

    it('Testing the /users endpoint with get method ', async done => {
        const response = await request.get('/users')
        .auth(token,{type:"bearer"});
        expect(response.status).toBe(200);
        done();
    });

    it('Testing the /users endpoint with post method', async done => {
        const user: User = {
            first_name: 'SecondFirstName',
            last_name: 'ASecondLastName',
            user_name: 'ASecondUserName',
            password: 'testPassword2'
        }
        const response = await request.post('/users')   
        .send(user)
        expect(response.status).toBe(200);
        done();
    });

    it('Testing the /users/1 endpoint with show method', async done => {
        const response = await request.get('/users/2')
        .auth(token,{type:"bearer"});
        expect(response.status).toBe(200);
        done();
    });
});
