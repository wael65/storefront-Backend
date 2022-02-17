# API Endpoints
## Products
- Index (/products) GET 
- Show (/products/:id) GET 
- Create (/products) POST [token required]
 parameters:{name, price} 

## Users
- Create N(/users) POST [token required]
  parameters: {user_name,first_name, last_name, password}
- Show (/users/:id) GET 
- Index (/users) GET 

## Orders
- Create (/orders) POST [token required]
  parameters: {user_id,status}
- Index (/orders/) GET [token required]
- Add products to order (/orders/:id/products) POST [token required]

## DashRouts
- Get all data of order for specific user
 (/user-orders/:id) GET [token required].    

# Tables schema
## Product
  id : SERIAL PRIMARY KEY,
  name : VARCHAR(50) UNIQUE NOT NULL,
  price : INTEGER NOT NULL

## User
 id  : SERIAL PRIMARY KEY,
  first_Name : VARCHAR(50) NOT NULL,
  last_Name : VARCHAR(50) NOT NULL,
  user_name : VARCHAR(50) UNIQUE Not NULL,
  password : VARCHAR(100) NOT NULL

## Orders
id  : SERIAL PRIMARY KEY,
status : VARCHAR(20) NOT NULL,
user_id  : INTEGER REFERENCES users(id) NOT NULL


## Order-Products
id : SERIAL PRIMARY KEY,
quantity : INTEGER NOT NULL,
order_id  : INTEGER REFERENCES orders(id) NOT NULL,
product_id : INTEGER REFERENCES products(id) NOT NULL


