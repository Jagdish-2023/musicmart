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
                  <div className="d-flex flex-wrap justify-content-start">
                    <div
                      className="col-md-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleListItem(item.item._id)}
                    >
                      <img
                        src={item.item.imagesUrl.mainImage}
                        alt={item.item.title}
                        className="img-fluid"
                      />
                    </div>

                    <div className="col-md-9 mx-4">
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

                    <div className="col-md-1">
                      <div className="d-flex flex-column justify-content-between align-items-center">
                        <div>
                          <i
                            className="bi bi-trash"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              handleTrashIcon(item.item._id, false);
                            }}
                          ></i>
                        </div>

                        <div>
                          {!item.item.isInCart && (
                            <button
                              className="btn btn-warning"
                              style={{
                                borderRadius: "0",
                                fontSize: "10px",
                                marginTop: "32px",
                              }}
                              onClick={(e) => {
                                handleMoveToCartBtn(item.item._id, true);
                              }}
                            >
                              Move to cart
                            </button>
                          )}

                          {item.item.isInCart && (
                            <div className="pb-2">
                              <div>
                                <i className="bi bi-check-circle-fill text-success"></i>
                                <small className="text-success ms-1">
                                  Added to cart
                                </small>
                              </div>

                              <Link
                                to="/view-cart"
                                className="mt-1"
                                style={{ textDecoration: "none" }}
                              >
                                Edit quantity
                              </Link>
                            </div>
                          )}
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
