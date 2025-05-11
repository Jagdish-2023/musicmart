import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchOrderDetails } from "../features/products/productsSlice";
import { Link, useNavigate, useParams } from "react-router-dom";

const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, orderDetails, storageToken } = useSelector(
    (state) => state.products
  );
  const { orderId } = useParams();

  const {
    userFullName = "",
    mobileNumber = "",
    pincode = "",
    locality = "",
    address = "",

    district = "",
    state = "",
  } = orderDetails?.deliveryAddress || {};

  useEffect(() => {
    if (storageToken) {
      dispatch(fetchOrderDetails(orderId));
    }
  }, [dispatch, navigate, orderId, storageToken]);
  return (
    <>
      <Header />
      <main className="container py-5">
        <div>
          {error && <p>Error occured while fetching the Order details.</p>}
          {status === "loading" && !orderDetails && <p>Loading...</p>}
          {orderDetails && (
            <div>
              <div className="card">
                <h5 className="card-header">Delivery Address</h5>
                <div className="card-body">
                  <p className="fw-bold">{userFullName}</p>
                  <p>{`${address}, ${locality}, ${district}, ${pincode}, ${state}`}</p>
                  <p>{mobileNumber}</p>
                </div>
              </div>

              <div className="mt-5">
                {orderDetails.orderedItems.map((item) => (
                  <div className="card mb-3" key={item.itemId}>
                    <div className="card-body d-flex align-items-center">
                      <div style={{ width: "10%" }}>
                        <img
                          src={item.imageUrl}
                          alt={item.itemName}
                          className="img-fluid w-75"
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/products/${item.itemId}`)}
                        />
                      </div>
                      <div className="w-75">
                        <Link
                          className="w-75 m-0 text-decoration-none"
                          to={`/products/${item.itemId}`}
                        >
                          {item.itemName}
                        </Link>
                      </div>
                      <div className="me-5">
                        <p className="m-0 ">{item.quantity} Nos</p>
                      </div>
                      <div>
                        <div>{` ₹ ${item.price * item.quantity}`}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default OrderDetails;
