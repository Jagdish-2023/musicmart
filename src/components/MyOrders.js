import Header from "./Header";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllOrders } from "../features/products/productsSlice";

const MyOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, allOrders } = useSelector((state) => state.products);

  const calculateTotalOrderValue = (items) => {
    const totalValue = items?.reduce(
      (acc, cur) => acc + cur.quantity * cur.price,
      0
    );

    return totalValue.toLocaleString("en-IN");
  };

  const handleOrderCardClick = (orderId) => {
    navigate(`/my-orders/${orderId}`);
  };
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);
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
                      <div className="card-header">
                        {new Date(data.createdAt).toLocaleDateString()}
                      </div>
                      <div
                        className="card-body d-flex align-items-center"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOrderCardClick(data._id)}
                      >
                        <div style={{ width: "10%" }}>
                          <img
                            src={data.orderedItems[0].imageUrl}
                            alt="ordered items poster"
                            className="img-fluid"
                          />
                          {data.orderedItems.length > 1 && (
                            <div className="text-center">
                              <span className="fw-light">
                                {data.orderedItems.length - 1 + " more items"}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ps-5 w-75">
                          <p className="w-75 m-0 fs-5">
                            {data.orderedItems
                              .map((item) => item.itemName)
                              .join(", ")
                              .slice(0, 50) + "..."}
                          </p>
                        </div>
                        <div>
                          <div className="fs-5">
                            {data.orderedItems &&
                              ` ₹ ${calculateTotalOrderValue(
                                data.orderedItems
                              )}`}
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
