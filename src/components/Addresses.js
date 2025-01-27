import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchShippingAddresses,
  deleteAddress,
} from "../features/products/productsSlice";
import { useEffect, useState } from "react";
import AddNewAddressForm from "./AddNewAddressForm";

const Addresses = () => {
  const dispatch = useDispatch();
  const { status, error, shipAddresses } = useSelector(
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
    dispatch(fetchShippingAddresses());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="container py-5">
        <div>
          {error && <p>Failed to fetch Addresses</p>}
          {status === "loading" && <p>Loading...</p>}
          {shipAddresses.length > 0 && status === "success" && (
            <div>
              <div className="mb-4">
                <h4>All Addresses</h4>
                <hr />
              </div>

              {isRenderAddresses && (
                <div>
                  {shipAddresses.map((shipAddress) => (
                    <div
                      key={shipAddress._id}
                      className="d-flex align-items-center mb-3"
                    >
                      <div>
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
                      </div>

                      <div className="ms-5">
                        <div className="d-flex justify-content-between">
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
