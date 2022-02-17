# Storefront Backend Project

## Getting Started
- To get started, you should add the " .env " file to the project' root.
.env file contain:

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=my_store
POSTGRES_DB_TEST=my_store_test
POSTGRES_USER=my_user
POSTGRES_PASSWORD=mypassword
ENV=dev
BCRYPT_BASSWORD=secret_word
SALT_ROUNDS=10
TOKEN_SECRET=mytokenstring

- Install the required Dependencies.

- Create two databases for development and the other for testing, 
put the name of the development database as a value of POSTGRES_DB and the name of the testing database as a value of POSTGRES_DB_TEST
Create a new user with all privileges to these two databases.
I did this mission as following shown :

CREATE USER my_user WITH PASSWORD 'password';    
CREATE DATABASE my_store;  
GRANT ALL PRIVILEGES ON DATABASE my_store TO my_user;
CREATE DATABASE my_store_test;
GRANT ALL PRIVILEGES ON DATABASE my_store_test TO my_user;

- Migrate to the database
To migrate all the tables to the database, you should run in the terminal:
 db-migrate up     
  

## Database
- All tables schema of the database shown in the REQUIREMENTS file.


## API routes
- All endpoint routes are shown in the REQUIREMENTS file

- The app runs locally in localhost:3000,
you can use it by running on the terminal:

yarn start
Or
yarn watch 

to run it using the Docker on default Postgres port: 5432 and use it in localhost:3000

## Testing 
### Database Tests
- there are tests were created for every database action, for run these tests, run in the terminal:

yarn test

this command will migrate all tables to the test-database and run all tests, finally reset test-database to be ready for the repeat  the test 

### Endpoints tests
- there are tests were created for every endpoint, for run all tests, 
run in the terminal:

yarn test-routs

- For run the tests indivedualy, Follow this commends:

yarn test-d      > run main rout test and dashboard endpoint test

yarn test-p      > run products endpoint tests   

yarn test-u      >run products endpoint tests 

yarn test-o      >run products endpoint tests

# Contacts
Name   : Wael Ibarahim Abdlmeged
E mail : tatweir15@gmail.com
Phone  : +20 1000 47 8282
