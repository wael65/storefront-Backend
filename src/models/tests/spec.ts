import { User, UserStore } from '../user';
import { Order, OrderProduct, OrderUser, OrderStore } from '../order';
import { Product, ProductStore } from '../product';
import { DashboardQueries } from '../../services/dashboard';

const oStore = new OrderStore();
const pStore = new ProductStore();
const uStore = new UserStore();
const dQueries = new DashboardQueries();

describe('store_front_backend', () => {
  const newUser: User = {
    first_name: 'testFirstName',
    last_name: 'testLastName',
    user_name: 'testNewUser',
    password: 'testPassword'
  };
  const createdUser: User = { ...newUser, id: 1 };

  const newProduct: Product = {
    name: 'testProduct',
    price: 100
  };
  const createdProduct: Product = { ...newProduct, id: 1 };

  const newOrder: Order = {
    status: 'active',
    user_id: 1
  };
  const createdOrder: Order = { ...newOrder, id: 1 };

  const newOrderProduct: OrderProduct = {
    quantity: 20,
    order_id: 1,
    product_id: 1
  };
  const createOrderProducts: OrderProduct = { ...newOrderProduct, id: 1 };

  const newOrderUserProducts: OrderUser = {
    order_id: 1,
    user_id: 1,
    status: 'active',
    quantity: 20,
    product_id: 1,
    name: 'testProduct',
    price: 100
  };
  const createOrderUserProducts: OrderUser = { ...newOrderUserProducts };

  describe('User Model', () => {
    it('should have a create method', () => {
      expect(uStore.create).toBeDefined();
    });

    it('should have an index method', () => {
      expect(uStore.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(uStore.show).toBeDefined();
    });

    it('create method should add a user', async () => {
      const result = await uStore.create(newUser);
      expect(result.first_name).toEqual(createdUser.first_name);
      expect(result.last_name).toEqual(createdUser.last_name);
      expect(result.user_name).toEqual(createdUser.user_name);
      expect(result.id).toEqual(createdUser.id);
    });

    it('index method should return a list of users', async () => {
      const result = await uStore.index();
      expect(result.length).toBe(1);
      expect(result[0].first_name).toEqual(createdUser.first_name);
      expect(result[0].last_name).toEqual(createdUser.last_name);
      expect(result[0].user_name).toEqual(createdUser.user_name);
      expect(result[0].id).toEqual(createdUser.id);
    });

    it('show method should return the correct user', async () => {
      const result = await uStore.show('1');
      expect(result.first_name).toEqual(createdUser.first_name);
      expect(result.last_name).toEqual(createdUser.last_name);
      expect(result.user_name).toEqual(createdUser.user_name);
      expect(result.id).toEqual(createdUser.id);
    });
  });

  describe('Product Model', () => {
    it('should have a create method', () => {
      expect(pStore.create).toBeDefined();
    });

    it('should have an index method', () => {
      expect(pStore.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(pStore.show).toBeDefined();
    });

    it('create method should add a product', async () => {
      const result = await pStore.create(newProduct);
      expect(result.name).toEqual(createdProduct.name);
      expect(result.price).toEqual(createdProduct.price);
      expect(result.id).toEqual(createdProduct.id);
    });

    it('index method should return a list of products', async () => {
      const result = await pStore.index();
      expect(result.length).toBe(1);
      expect(result[0].name).toEqual(createdProduct.name);
      expect(result[0].price).toEqual(createdProduct.price);
      expect(result[0].id).toEqual(createdProduct.id);
    });

    it('show method should return the correct product', async () => {
      const result = await pStore.show('1');
      expect(result.name).toEqual(createdProduct.name);
      expect(result.price).toEqual(createdProduct.price);
      expect(result.id).toEqual(createdProduct.id);
    });
  });

  describe('Order Model', () => {
    it('should have a create method', () => {
      expect(oStore.create).toBeDefined();
    });

    it('create method should add an order', async () => {
      const result = await oStore.create(newOrder);
      expect(result.user_id).toEqual(createdOrder.user_id);
      expect(result.status).toEqual(createdOrder.status);
      expect(result.id).toEqual(createdOrder.id);
    });

    it('addProduct method should return the new order products item', async () => {
      const result = await oStore.addProduct(
        newOrderProduct.quantity,
        newOrderProduct.order_id,
        newOrderProduct.product_id
      );
      expect(result.id).toEqual(1);
      expect(result.quantity).toEqual(createOrderProducts.quantity);
      expect(result.order_id).toEqual(createOrderProducts.order_id);
      expect(result.product_id).toEqual(createOrderProducts.product_id);
    });
  });

  describe('dashboard Model', () => {
    it('addProduct method should return the orders details for a specific user', async () => {
      const result = await dQueries.ordersProdUser('1');

      expect(result.order_id).toEqual(createOrderUserProducts.order_id);
      expect(result.user_id).toEqual(createOrderUserProducts.order_id);
      expect(result.status).toEqual(createOrderUserProducts.status);
      expect(result.quantity).toEqual(createOrderUserProducts.quantity);
      expect(result.name).toEqual(createOrderUserProducts.name);
      expect(result.price).toEqual(createOrderUserProducts.price);
    });
  });
});
