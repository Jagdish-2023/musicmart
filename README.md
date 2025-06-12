# MusicMart

An full-stack e-commerce app where user can see some listed products, add or remove to Cart & Wishlist, place order and see those products in Orders section. Built with React, Boostrap, Redux, Express, Node, MongoDB with JWT based authentication.

## Live demo
[Run](https://musicmart.vercel.app)

---

## Login
> **Guest** <br>
> phone number: 7992729155 <br>
> password: Jagdish@123

## Quick Start
```
git clone https://github.com/Jagdish-2023/musicmart.git
cd <your-repo>
npm install
npm run dev
```

## Technologies
- React, react-router, reduxjs/toolkit
- Bootstrap
- MongoDB,Mongoose
- Node.js, Express.js
- JWT (JSON Web Token)

## Features
**Products**
- A filter section to apply all the filters for easy access to the products.
- Products listing section showing all the products inside Bootstrap's Card.
- User can add products to Wishlist & Cart or can see the details of product.

**Wishlist**
- It shows all the wishlist items that to buy later.
- Can remove the item from wishlist or move the item to Cart.

**Cart**
- Two sections having all the cart items and total cart summary.
- User can increase or decrease the quantiy of the item.
- Can move the item to wishlist or remove from Cart list.

**Checkout**
- Verify that the Delivery address exist before placing the order.
- User can add a new address or choose a different address to place the order.

**Orders**
- It shows all the placed orders made by the user.
- User can see the details about that particular Order.

**Authentication**
- JWT based authentication.
- SignUp and SignIn feature to easily access to the account.

## API Reference
**Products**
- GET/products - Fetch all Products.
- GET/products/:productId - Specific product details.
- GET/products/category/:categoryName - Products list filtered by category.

**Wishlist**
- GET/favouriteItems - All Wishlist items.
- POST/products/favourite/:productId - Add/Remove an from the Wishlist.

**Cart**
- GET/cartItems - List of all Cart items.
- POST/product/cart_quantity - Update the quantity of an item in Cart.
- POST/product/cart/:productId - Add/Remove an item from the Cart.
- POST/move_cart_to_order - Move and add the cart items to Orders.

**Address**
- GET/shipping_addresses - Delivery addresses belongs to User.
- POST/add_ship_address - Add a new shipping address.
- POST/update_address_deliver - Select delivery address to place the Order.
- POST/update_address_details - Update the details of an address.
- DELETE/delete_address/:addressId - Delete a shipping address.

**User**
- GET/user_profile_info - User information details.
- POST/update_user_profile - Update user details (fullName, dateOfBirth, email, phoneNumber etc).

**Orders**
- GET/order_items - All ordered items placed by user.
- GET/orders/:orderId - Order details of a particular order.

**Authentication**
- POST/register - Register a new user account.
- POST/login - Sign in an existing user with credentials.

---
## Contact
For bugs or feature requests, please reach out to jagdishjpradhan@gmail.com 
