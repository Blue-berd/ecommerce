# To Run backend run 
```
yarn install
yarn run start
```

## or in dev env
```
yarn install
yarn run dev
```
# E-Commerce Platform with Advanced Features

## Task Description

Build a comprehensive e-commerce platform that includes user management, product listings, shopping cart functionality, order management, session tracking, and integration with an external payment gateway API. This application should use Node.js, Supabase, MongoDB, and include deployment on Render and Netlify.

## Requirements

### Setup

* Initialize a Node.js project.
* Install necessary dependencies (Express.js, Supabase client, Mongoose, etc.).

### Database

* Create a MongoDB database to store user information, products, orders, and session records.
* Define schemas and models for users, products, orders, and sessions.

### User Authentication and Authorization

* Implement user registration, login, and role-based access control using Supabase.
* Store user information securely in MongoDB.

### Product Management

* Allow admin users to create, read, update, and delete products.
* Each product should have a name, description, price, and stock quantity.

### Shopping Cart and Order Management

* Allow users to add products to their shopping cart, view the cart, and place orders.
* Implement order management for users to view their past orders.
* Integrate with an external payment gateway API to process payments.

### Session Management

* Generate and manage user sessions upon login.
* Record session instances (login time, logout time, IP address) in MongoDB.

### API Endpoints

* `POST /register`: Register a new user.
* `POST /login`: Log in an existing user and create a session.
* `POST /products`: Create a new product (admin only).
* `GET /products`: Retrieve all products.
* `PUT /products/:id`: Update a product by ID (admin only).
* `DELETE /products/:id`: Delete a product by ID (admin only).
* `POST /cart`: Add a product to the shopping cart.
* `GET /cart`: Retrieve the user's shopping cart.
* `POST /orders`: Place an order.
* `GET /orders`: Retrieve all orders for the logged-in user.
* `GET /sessions`: Retrieve all user sessions.
* `POST /payment`: Process a payment through the external payment gateway.

### Deployment

* Deploy the backend on Render.
* Create a front-end interface for managing products, shopping cart, and orders, and deploy it on Netlify.

### Documentation

* Provide comprehensive API documentation with example requests and responses.
* Document deployment steps and provide links to the deployed applications.
* Include details on role-based access control implementation and payment processing.
