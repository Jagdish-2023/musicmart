import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AddNewAddressForm from "./AddNewAddressForm";
import {
  fetchShippingAddresses,
  updateDeliveryAddress,
  addCartItemsToOrders,
  fetchCartItems,
} from "../features/products/productsSlice";
import CartTotalSummary from "./CartTotalSummary";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, shipAddresses, status, error } = useSelector(
    (state) => state.products
  );

  const [isAddAddress, setIsAddAddress] = useState(false);
  const [placeOrder, setPlaceOrder] = useState(false);
  const [isRenderAddresses, setIsRenderAddresses] = useState(true);

  const resetRendering = () => {
    setIsRenderAddresses(true);
    setIsAddAddress(false);
  };

  const handleAddAddress = () => {
    setIsRenderAddresses(false);
    setIsAddAddress(true);
  };

  const handleSelectedAddress = (addressId) => {
    const previousSelectedAddress = shipAddresses.find(
      (address) => address.isDeliver === true
    );

    dispatch(
      updateDeliveryAddress({
        deliverAddressId: addressId,
        notDeliverAddressId: previousSelectedAddress._id,
      })
    );
  };

  const handlePlaceOrder = () => {
    const findDeliverAddress = shipAddresses.find(
      (address) => address.isDeliver === true
    );
    if (findDeliverAddress) {
      const {
        userFullName,
        mobileNumber,
        pincode,
        locality,
        address,
        district,
        state,
        addressType,
      } = findDeliverAddress;

      const deliveryAddress = {
        userFullName,
        mobileNumber,
        pincode,
        locality,
        address,
        district,
        state,
        addressType,
      };
      const orderedItems = cartItems.map((item) => ({
        itemId: item.item._id,
        quantity: item.cartQuantity,
        itemName: item.item.title,
        price: item.item.sellPrice,
        imageUrl: item.item.imagesUrl.mainImage,
      }));
      dispatch(
        addCartItemsToOrders({
          orderedItems,
          deliveryAddress: deliveryAddress,
        })
      );

      setPlaceOrder(true);
    }
  };

  useEffect(() => {
    dispatch(fetchShippingAddresses());
    dispatch(fetchCartItems());
  }, [dispatch]);
  return (
    <>
      <header className="bg-light">
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <NavLink className="navbar-brand" to="/">
              MusicMart
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container py-5">
        <div>
          {error && <p>An error occured</p>}
          {status === "loading" &&
            cartItems.length < 1 &&
            shipAddresses.length < 1 && <p>Loading...</p>}
          {!placeOrder && cartItems.length >= 1 ? (
            <div className="row">
              <div className="col-md-8">
                <section>
                  <div>
                    <h3>Select a delivery address</h3>
                    <hr />
                    {isRenderAddresses && (
                      <h4>Delivery Addresses ({shipAddresses.length})</h4>
                    )}
                    <div className="py-3">
                      {isRenderAddresses &&
                        shipAddresses.map((shipAddress) => (
                          <div
                            key={shipAddress._id}
                            className="d-flex align-items-center mb-3"
                          >
                            <div>
                              <label
                                htmlFor={shipAddress._id}
                                className="d-flex align-items-center"
                                style={{ cursor: "pointer" }}
                              >
                                <input
                                  id={shipAddress._id}
                                  type="radio"
                                  name="deliveryAddresses"
                                  checked={shipAddress.isDeliver}
                                  style={{ cursor: "pointer" }}
                                  onChange={() =>
                                    handleSelectedAddress(shipAddress._id)
                                  }
                                />
                                <div className="ms-2">
                                  <p className="m-0">
                                    <strong>{shipAddress.userFullName}</strong>
                                    <span className="fw-lighter ms-3">
                                      {shipAddress.addressType}
                                    </span>
                                    {shipAddress.isDefault && (
                                      <span className="fw-lighter ms-3">
                                        Default
                                      </span>
                                    )}
                                  </p>
                                  <p className="m-0">{`${shipAddress.address}, ${shipAddress.locality}, ${shipAddress.district}, ${shipAddress.state}, ${shipAddress.pincode}`}</p>
                                  <p className="m-0">
                                    Phone number: {shipAddress.mobileNumber}
                                  </p>
                                </div>
                              </label>
                            </div>
                          </div>
                        ))}

                      {!isAddAddress && (
                        <div>
                          <span
                            className="text-primary"
                            onClick={handleAddAddress}
                            style={{ cursor: "pointer" }}
                          >
                            Add a New Address
                          </span>
                        </div>
                      )}
                    </div>

                    {isAddAddress && (
                      <div>
                        <AddNewAddressForm resetRendering={resetRendering} />
                      </div>
                    )}
                  </div>
                </section>
              </div>

              <div className="col-md-4">
                <section>
                  {<CartTotalSummary />}
                  <button
                    className="btn btn-warning col-md-12 col-sm-12 col-12"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>
                </section>
              </div>
            </div>
          ) : (
            !setPlaceOrder && <p>Please add an item to cart first.</p>
          )}

          {placeOrder && (
            <div className="bg-light py-5">
              <div className="text-center d-flex flex-column py-5">
                <div className="">
                  <i className="bi bi-check-circle-fill text-success fs-1"></i>
                  <h1>Your order has been placed.</h1>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => navigate("/my-orders")}
                  >
                    Go to My Orders
                  </button>
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => navigate("/")}
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Checkout;
