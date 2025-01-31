import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../css/shoppingCart.css";
import Header from "./Header";
import {
  updateFavouriteItem,
  updateCartList,
  updateCartQuantity,
} from "../features/products/productsSlice";

import CartTotalSummary from "./CartTotalSummary";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, favouriteItems, status, error } = useSelector(
    (state) => state.products
  );

  const handleMoveToWishlist = (productId) => {
    const isInCart = false;
    const isFavourite = true;
    dispatch(updateCartList({ productId, isInCart }));

    const isItemInWishlist = favouriteItems.find(
      (product) => product.item._id === productId
    );
    if (!isItemInWishlist) {
      dispatch(updateFavouriteItem({ productId, isFavourite }));
    }
  };

  const handleItemRemoveFromCart = (productId) => {
    const isInCart = false;
    dispatch(updateCartList({ productId, isInCart }));
  };

  const handleCartItemQuantity = (productId, operation) => {
    const itemIndex = cartItems.findIndex(
      (item) => item.item._id === productId
    );

    let quantity = 0;
    if (itemIndex !== -1) {
      if (operation === "increase") {
        quantity = cartItems[itemIndex].cartQuantity + 1;
      } else {
        quantity = cartItems[itemIndex].cartQuantity - 1;
      }
      dispatch(updateCartQuantity({ productId, cartQuantity: quantity }));
    }
  };

  const handleCartCheckout = () => {
    navigate("/cart-checkout");
  };

  return (
    <>
      <Header />
      <main className="container py-5">
        <div>
          <h4 className="mb-4">Shopping Cart</h4>
          {error && <p>Failed to get Cart items</p>}
          {status === "loading" && cartItems.length < 1 && <p>Loading...</p>}
          {cartItems.length >= 1 && (
            <div className="row">
              <div className="col-md-8">
                <div className="row">
                  {cartItems &&
                    cartItems.map((item) => (
                      <div
                        key={item.item._id}
                        className="col-md-12 col-sm-12 col-12"
                      >
                        <div className="row">
                          <div className="col-lg-2 col-md-3 col-sm-3 col-3 align-self-center">
                            <div>
                              <img
                                src={item.item.imagesUrl.mainImage}
                                alt={item.item.title}
                                className="img-fluid"
                              />
                            </div>
                          </div>
                          <div className="col-md-8 col-sm-8 col-8">
                            <div>
                              <Link
                                className="item-link-navigate"
                                to={`/products/${item.item._id}`}
                              >
                                {item.item.title}
                              </Link>
                              <div className="d-flex justify-content-start align-items-center">
                                <div>
                                  <strong className="fs-5">
                                    &#8377;{item.item.sellPrice}
                                  </strong>
                                </div>
                                <div>
                                  <s
                                    className="mx-3 fw-lighter"
                                    style={{
                                      textDecorationThickness: "1px",
                                    }}
                                  >
                                    &#8377;{item.item.mrpPrice}
                                  </s>
                                </div>
                              </div>
                              <div className="fw-lighter text-danger">
                                {(
                                  ((item.item.mrpPrice - item.item.sellPrice) /
                                    item.item.mrpPrice) *
                                  100
                                ).toFixed()}
                                % off
                              </div>
                              <div style={{ marginTop: "0.5rem" }}>
                                <label>
                                  Quantity:{" "}
                                  <span
                                    className="rounded-pill border border-dark px-1"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      if (item.cartQuantity > 1) {
                                        handleCartItemQuantity(
                                          item.item._id,
                                          "decrease"
                                        );
                                      } else {
                                        return;
                                      }
                                    }}
                                  >
                                    <i className="bi bi-dash"></i>
                                  </span>{" "}
                                  <span
                                    className="rounded-pill text-center border border-dark"
                                    style={{ padding: "0.15rem 1.2rem" }}
                                  >
                                    {item.cartQuantity}
                                  </span>{" "}
                                  <span
                                    className="rounded-pill border border-dark px-1"
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      handleCartItemQuantity(
                                        item.item._id,
                                        "increase"
                                      )
                                    }
                                  >
                                    <i className="bi bi-plus"></i>
                                  </span>
                                </label>
                              </div>
                              <div className="mt-3">
                                <button
                                  className="btn btn-sm btn-outline-secondary me-2"
                                  onClick={(e) => {
                                    handleMoveToWishlist(item.item._id);
                                  }}
                                >
                                  Save for later
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => {
                                    handleItemRemoveFromCart(item.item._id);
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </div>
                    ))}
                </div>
              </div>
              <div className="col-md-4 col-sm-4 mt-2">
                {<CartTotalSummary />}

                <button
                  className="btn btn-warning col-md-12 col-sm-12 col-12"
                  onClick={handleCartCheckout}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          )}
        </div>
        {status === "success" && cartItems.length < 1 && (
          <p>Shopping Cart is empty.</p>
        )}
      </main>
    </>
  );
};

export default ShoppingCart;
