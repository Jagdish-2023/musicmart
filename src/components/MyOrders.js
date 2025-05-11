import "../css/myOrders.css";
import Header from "./Header";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllOrders } from "../features/products/productsSlice";

const MyOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, allOrders, storageToken } = useSelector(
    (state) => state.products
  );

  const calculateTotalOrderValue = (items) => {
    const totalValue = items?.reduce(
      (acc, cur) => acc + cur.quantity * cur.price,
      0
    );

    return totalValue.toLocaleString("en-IN");
  };

  const concatenateOrdersName = (items) => {
    const concatStr = items.map((item) => item.itemName).join(", ");
    if (items.length === 1) {
      return `${concatStr}`;
    } else {
      return `${concatStr.slice(0, 50) + "..."}`;
    }
  };

  const handleOrderCardClick = (orderId) => {
    navigate(`/my-orders/${orderId}`);
  };
  useEffect(() => {
    if (storageToken) {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, navigate, storageToken]);
  return (
    <>
      <Header />
      <main className="container py-5">
        <div>
          <h4>All orders</h4>
          <hr />

          <div>
            {error && <p>Failed to get the Orders.</p>}
            {status === "loading" && allOrders.length < 1 && <p>Loading...</p>}
            {allOrders.length > 0 &&
              allOrders
                .map((data) => (
                  <div key={data._id} className="mb-4">
                    <div className="card cursor-pointer">
                      <div className="card-header d-flex justify-content-between">
                        <span>
                          {new Date(data.createdAt).toLocaleDateString()}
                        </span>

                        <span className="header-price-div">
                          {data.orderedItems &&
                            ` ₹ ${calculateTotalOrderValue(data.orderedItems)}`}
                        </span>
                      </div>
                      <div
                        className="card-body d-flex align-items-center"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOrderCardClick(data._id)}
                      >
                        <div className="col-lg-1 col-md-2 col-sm-2 col-2">
                          <img
                            src={data.orderedItems[0].imageUrl}
                            alt="ordered items poster"
                            className="img-fluid"
                          />
                          {data.orderedItems.length > 1 && (
                            <div className="text-center">
                              <small className="fw-light">
                                {data.orderedItems.length - 1 + " more items"}
                              </small>
                            </div>
                          )}
                        </div>

                        <div className="d-flex order-name-price-flex ps-3">
                          <p className="m-0">
                            {concatenateOrdersName(data.orderedItems)}
                          </p>

                          <div className="body-price-div">
                            <p className="m-0">
                              {data.orderedItems &&
                                ` ₹ ${calculateTotalOrderValue(
                                  data.orderedItems
                                )}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                .reverse()}
          </div>
        </div>
      </main>
    </>
  );
};

export default MyOrders;
