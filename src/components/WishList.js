import "../css/wishList.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../css/shoppingCart.css";

import Header from "./Header";
import {
  updateFavouriteItem,
  updateCartList,
} from "../features/products/productsSlice";

const WishList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favouriteItems, status, error } = useSelector(
    (state) => state.products
  );

  const handleTrashIcon = (productId, isFavourite) => {
    dispatch(updateFavouriteItem({ productId, isFavourite }));
  };

  const handleMoveToCartBtn = (productId, isInCart) => {
    dispatch(updateCartList({ productId, isInCart }));
  };

  const handleListItem = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <>
      <Header />
      <main className="container mt-5">
        <div>
          <h4>My Wishlist ({favouriteItems.length})</h4>

          {error && <p>Failed to fetch Wishlist.</p>}
          {status === "loading" && favouriteItems.length < 1 && (
            <p>Loading...</p>
          )}

          {favouriteItems.length >= 1 && (
            <div>
              {favouriteItems.map((item) => (
                <div key={item._id} className="mt-5">
                  <div className="d-flex ustify-content-start align-items-center">
                    <div
                      className="col-lg-1 col-md-2 col-sm-2 col-2 d-flex justify-content-center align-items-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleListItem(item.item._id)}
                    >
                      <img
                        src={item.item.imagesUrl.mainImage}
                        alt={item.item.title}
                        className="img-fluid"
                      />
                    </div>

                    <div className="d-flex w-100 ms-4 item-details-flex">
                      <div className="col-md-9 col-sm-9">
                        <Link
                          className="item-link-navigate"
                          to={`/products/${item.item._id}`}
                        >
                          {item.item.title}
                        </Link>
                        <div>
                          {item.item.rating}{" "}
                          <i className="bi bi-star-fill text-warning"></i>
                        </div>
                        <div className="py-2">
                          <div className="d-flex justify-content-start align-items-center">
                            <div>
                              <strong style={{ fontSize: "1.2rem" }}>
                                &#8377;{item.item.sellPrice}
                              </strong>
                            </div>
                            <div>
                              <s
                                className="mx-3 fw-lighter"
                                style={{ textDecorationThickness: "1px" }}
                              >
                                &#8377;{item.item.mrpPrice}
                              </s>
                            </div>
                            <div className="text-danger">
                              {(
                                ((item.item.mrpPrice - item.item.sellPrice) /
                                  item.item.mrpPrice) *
                                100
                              ).toFixed()}
                              % off
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center action-btns">
                        <div className="d-flex action-btns-flex">
                          <div>
                            <i
                              className="bi bi-trash trash-icon"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                handleTrashIcon(item.item._id, false);
                              }}
                            ></i>
                            <button className="remove-item-btn btn btn-sm btn-danger ms-3">
                              Delete
                            </button>
                          </div>

                          <div className="text-center">
                            {!item.item.isInCart && (
                              <div className="">
                                <button
                                  className="btn btn-warning move-cart-btn"
                                  style={{
                                    fontSize: "10px",
                                  }}
                                  onClick={(e) => {
                                    handleMoveToCartBtn(item.item._id, true);
                                  }}
                                >
                                  Move to cart
                                </button>
                              </div>
                            )}

                            {item.item.isInCart && (
                              <div className="">
                                <div>
                                  <i className="bi bi-check-circle-fill text-success"></i>
                                  <small className="text-success ms-1">
                                    Added to cart
                                  </small>
                                </div>

                                <div>
                                  <Link
                                    to="/view-cart"
                                    className="mt-1"
                                    style={{ textDecoration: "none" }}
                                  >
                                    Edit quantity
                                  </Link>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default WishList;
