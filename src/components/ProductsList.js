import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  updateFavouriteItem,
  updateCartList,
} from "../features/products/productsSlice";

const ProductsList = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [renderProducts, setRenderProducts] = useState(products);

  const { filteredCategory, filteredPrice, filteredRating, filteredSortBy } =
    useSelector((state) => state.filters);
  const { searchInputText } = useSelector((state) => state.products);

  const handleHeartIcon = (productId, isFavourite) => {
    dispatch(updateFavouriteItem({ productId, isFavourite }));
  };

  const handleAddCartBtn = (productId, isInCart) => {
    dispatch(updateCartList({ productId, isInCart }));
  };

  const handleProductNavigate = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAfterAddCart = () => {
    navigate("/view-cart");
  };

  useEffect(() => {
    let filteredProducts = [...products];

    if (searchInputText) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchInputText)
      );
    }

    if (filteredPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.sellPrice <= filteredPrice
      );
    }

    if (filteredCategory.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filteredCategory.includes(product.category)
      );
    }

    if (filteredRating) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating >= filteredRating
      );
    }

    if (filteredSortBy) {
      filteredProducts = filteredProducts.sort((a, b) =>
        filteredSortBy === "lowToHigh"
          ? a.sellPrice - b.sellPrice
          : b.sellPrice - a.sellPrice
      );
    }

    setRenderProducts(filteredProducts);
  }, [
    products,
    filteredPrice,
    filteredCategory,
    filteredRating,
    filteredSortBy,
    searchInputText,
  ]);

  return (
    <>
      <div className="col-md-10">
        <h2 className="text-center">Products List</h2>

        {renderProducts.length > 0 && (
          <div>
            Showing results for{" "}
            <span className="fw-bold">{renderProducts.length}</span> items.
          </div>
        )}

        <div className="row mt-3">
          {renderProducts.map((item) => (
            <div key={item._id} className="col-md-3 mb-4">
              <div
                style={{ cursor: "pointer" }}
                className="card"
                onClick={() => handleProductNavigate(item._id)}
              >
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <img
                    src={item.imagesUrl.mainImage}
                    alt={item.title}
                    className="card-img img-fluid"
                  />

                  <div
                    className="card-img-overlay d-flex"
                    style={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <i
                      className={
                        item.isFavourite
                          ? "bi bi-heart-fill fs-5 ms-auto"
                          : "bi bi-heart fs-5 ms-auto"
                      }
                      style={{
                        cursor: "pointer",
                        color: item.isFavourite ? "red" : "black",
                        marginBottom: "12rem",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHeartIcon(
                          item._id,
                          item.isFavourite ? false : true
                        );
                      }}
                    ></i>
                  </div>
                </div>

                <div className="card-body">
                  <h6>{item.title}</h6>

                  <div>
                    <span className="fw-bold fs-5">
                      &#8377;{item.sellPrice}
                    </span>
                    <span className="mx-2">
                      <s
                        className="fw-lighter"
                        style={{ textDecorationThickness: "1px" }}
                      >
                        &#8377;{item.mrpPrice}
                      </s>
                    </span>
                    <span className="float-end">
                      {item.rating}{" "}
                      <i className="bi bi-star-fill text-warning"></i>
                    </span>
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    {item.isInCart && (
                      <button
                        className="btn btn-secondary text-light"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAfterAddCart();
                        }}
                      >
                        Go to cart
                      </button>
                    )}
                    {!item.isInCart && (
                      <button
                        className="btn btn-warning"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddCartBtn(item._id, true);
                        }}
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {renderProducts.length < 1 && (
            <div className="mt-5">
              <p className="text-center">Products not found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsList;
