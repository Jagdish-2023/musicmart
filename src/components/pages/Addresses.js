import "../../css/addresses.css";
import Header from "../Header";
import Spinner from "../Spinner";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchShippingAddresses,
  deleteAddress,
} from "../../features/products/productsSlice";
import { useEffect, useState } from "react";
import AddNewAddressForm from "../AddNewAddressForm";
import { useNavigate } from "react-router-dom";

const Addresses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, shipAddresses, storageToken } = useSelector(
    (state) => state.products
  );

  const [isAddAddress, setIsAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [isRenderAddresses, setIsRenderAddresses] = useState(true);

  const handleAddAddress = () => {
    setIsRenderAddresses(false);
    setIsAddAddress(true);
  };

  const handleEditAddress = (addressData) => {
    setIsAddAddress(false);
    setEditAddress(addressData);
    setIsRenderAddresses(false);
  };

  const resetRendering = () => {
    setIsRenderAddresses(true);
    setIsAddAddress(false);
    setEditAddress(null);
  };

  const handleDeleteAddress = (addressId) => {
    dispatch(deleteAddress(addressId));
  };

  useEffect(() => {
    if (storageToken) {
      dispatch(fetchShippingAddresses());
    } else {
      navigate("/login");
    }
  }, [dispatch, storageToken, navigate]);

  return (
    <>
      <Header />

      <main className="container py-5">
        <div>
          <div className="mb-4">
            <h4>Your Addresses</h4>
            <hr />
          </div>
          {error && <p>{error}</p>}
          {status === "loading" && <Spinner />}
          {shipAddresses.length > 0 && status === "success" && (
            <div>
              {isRenderAddresses && (
                <div>
                  {shipAddresses.map((shipAddress) => (
                    <div
                      key={shipAddress._id}
                      className="d-flex justify-content-start mb-3 addresses-flex"
                    >
                      <div className="ms-2">
                        <p className="m-0">
                          <strong>{shipAddress.userFullName}</strong>
                          <span className="fw-lighter ms-3">
                            {shipAddress.addressType}
                          </span>
                          {shipAddress.isDefault && (
                            <span className="fw-lighter ms-3">Default</span>
                          )}
                        </p>
                        <p className="m-0">{`${shipAddress.address}, ${shipAddress.locality}, ${shipAddress.district}, ${shipAddress.state}, ${shipAddress.pincode}`}</p>
                        <p className="m-0">
                          Phone number: {shipAddress.mobileNumber}
                        </p>
                      </div>

                      <div className="action-btns-container">
                        <div className="d-flex">
                          {!shipAddress.isDefault && (
                            <button
                              className="btn btn-sm btn-warning"
                              onClick={() => handleEditAddress(shipAddress)}
                            >
                              Edit
                            </button>
                          )}
                          {!shipAddress.isDefault && (
                            <button
                              className="btn btn-sm btn-danger ms-1"
                              onClick={() =>
                                handleDeleteAddress(shipAddress._id)
                              }
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!isAddAddress && isRenderAddresses && (
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

          <div className="col-md-8">
            {isAddAddress && (
              <AddNewAddressForm resetRendering={resetRendering} />
            )}
            {editAddress && (
              <AddNewAddressForm
                editAddress={editAddress}
                resetRendering={resetRendering}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Addresses;
