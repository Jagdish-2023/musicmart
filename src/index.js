import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import App from "./App";
import Products from "./features/products/Products";
import ProductDetails from "./components/ProductDetails";
import WishList from "./components/WishList";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./components/Checkout";
import Profile from "./components/Profile";
import MyOrders from "./components/MyOrders";
import OrderDetails from "./components/OrderDetails";
import Addresses from "./components/Addresses";
import LoginForm from "./components/LoginForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:productId",
    element: <ProductDetails />,
  },
  {
    path: "/wishlist",
    element: <WishList />,
  },
  {
    path: "/view-cart",
    element: <ShoppingCart />,
  },
  {
    path: "/cart-checkout",
    element: <Checkout />,
  },
  {
    path: "/my-profile",
    element: <Profile />,
  },
  {
    path: "/my-orders",
    element: <MyOrders />,
  },
  {
    path: "/my-orders/:orderId",
    element: <OrderDetails />,
  },
  {
    path: "/my-addresses",
    element: <Addresses />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
