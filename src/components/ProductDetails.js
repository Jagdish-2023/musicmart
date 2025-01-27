import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import {
  fetchProductDetails,
  updateCartList,
  updateFavouriteItem,
} from "../features/products/productsSlice";

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productDetails, status, error } = useSelector(
    (state) => state.products
  );

  const { productId } = useParams();

  const handleGoToCart = () => {
    navigate("/view-cart");
  };

  const handleAddToCart = () => {
    dispatch(
      updateCartList({ productId: productDetails?._id, isInCart: true })
    );
  };

  const handleAddToFavourite = (task) => {
    dispatch(
      updateFavouriteItem({
        productId: productDetails?._id,
        isFavourite: task === "add" ? true : false,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  return (
    <>
      <Header />
      <main className="container mt-5">
        <div>
          {error && <p>Failed to get Product Details</p>}
          {status === "loading" && !productDetails && <p>Loading...</p>}
          {productDetails && (
            <div>
              <div className="row">
                <div className="col-md-4">
                  <div>
                    <img
                      src={productDetails.imagesUrl.mainImage}
                      alt={productDetails.title}
                      className="img-fluid"
                    />
                  </div>
                  <div className="py-3">
                    <div className="d-flex justify-content-center gap-2 px-4">
                      <div className="col-md-6">
                        {!productDetails.isFavourite && (
                          <button
                            className="btn mx-1 w-100"
                            style={{
                              borderRadius: "0",
                              backgroundColor: "darkorange",
                            }}
                            onClick={() => handleAddToFavourite("add")}
                          >
                            Add to Wishlist
                          </button>
                        )}
                        {productDetails.isFavourite && (
                          <button
                            className="btn mx-1 w-100 btn-secondary"
                            style={{
                              borderRadius: "0",
                            }}
                            onClick={() => handleAddToFavourite("remove")}
                          >
                            Remove from wishlist
                          </button>
                        )}
                      </div>
                      <div className="col-md-6">
                        {!productDetails.isInCart && (
                          <button
                            className="btn btn-warning mx-1 w-100"
                            style={{ borderRadius: "0" }}
                            onClick={handleAddToCart}
                          >
                            Add to cart
                          </button>
                        )}
                        {productDetails.isInCart && (
                          <button
                            className="btn btn-secondary mx-1 w-100"
                            style={{ borderRadius: "0" }}
                            onClick={handleGoToCart}
                          >
                            Go to cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <h3>{productDetails.title}</h3>
                  <div>
                    {productDetails.rating}{" "}
                    <i className="bi bi-star-fill text-warning"></i>
                  </div>
                  {/* price div */}
                  <div className="py-3">
                    <div className="d-flex justify-content-start align-items-center">
                      <div>
                        <strong className="fs-4">
                          &#8377;{productDetails.sellPrice}
                        </strong>
                      </div>
                      <div>
                        <s
                          className="mx-3 fw-lighter"
                          style={{ textDecorationThickness: "1px" }}
                        >
                          &#8377;{productDetails.mrpPrice}
                        </s>
                      </div>
                    </div>
                    <div className="text-danger">
                      {(
                        ((productDetails.mrpPrice - productDetails.sellPrice) /
                          productDetails.mrpPrice) *
                        100
                      ).toFixed()}
                      % off
                    </div>
                  </div>

                  {/* policy */}
                  <div className="py-2">
                    <hr />
                    <div className="d-flex justify-content-start gap-5">
                      <div>
                        <p className="text-center m-0">
                          <i className="bi bi-calendar-check fs-4"></i>
                        </p>
                        <p>{productDetails.replacePolicy} days replacement</p>
                      </div>
                      {productDetails.isCOD && (
                        <div>
                          <p className="text-center m-0">
                            <i className="bi bi-cash-coin fs-4"></i>
                          </p>
                          <p>Pay on Delivery</p>
                        </div>
                      )}
                      {productDetails.isFreeDelivery && (
                        <div>
                          <p className="text-center m-0">
                            <i className="bi bi-truck fs-4"></i>
                          </p>
                          <p>Free Delivery</p>
                        </div>
                      )}
                      <div className="">
                        <p className="text-center m-0">
                          <i className="bi bi-credit-card fs-4"></i>
                        </p>
                        <p>Secure Payment</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                  {/* description */}
                  <div>
                    <p>
                      <strong>Description:</strong>
                    </p>
                    <ul>
                      {productDetails.description.map(
                        (specification, index) => (
                          <li key={index}>{specification}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ProductDetails;
