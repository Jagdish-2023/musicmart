import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  updateAddressDetails,
} from "../features/products/productsSlice";

const AddNewAddressForm = ({ editAddress, resetRendering }) => {
  const dispatch = useDispatch();
  const { shipAddresses } = useSelector((state) => state.products);

  const [newAddress, setNewAddress] = useState({
    userFullName: "",
    mobileNumber: "",
    pincode: "",
    locality: "",
    address: "",
    district: "",
    state: "",
    addressType: "",
    isDeliver: false,
  });

  useEffect(() => {
    if (editAddress) {
      setNewAddress({
        userFullName: editAddress.userFullName || "",
        mobileNumber: editAddress.mobileNumber || "",
        pincode: editAddress.pincode || "",
        locality: editAddress.locality || "",
        address: editAddress.address || "",
        district: editAddress.district || "",
        state: editAddress.state || "",
        addressType: editAddress.addressType || "",
        isDeliver: editAddress.isDeliver || false,
      });
    } else {
      resetForm();
    }
  }, [editAddress]);

  const handleFormInputs = (event) => {
    const { name, value } = event.target;
    setNewAddress((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (newAddress.mobileNumber.toString().length !== 10) {
      alert("Mobile number must be 10 digits");
      return;
    }

    if (newAddress.pincode.toString().length !== 6) {
      alert("Pincode must be 6 digits");
      return;
    }

    if (
      newAddress.mobileNumber.toString().length === 10 &&
      newAddress.pincode.toString().length === 6
    ) {
      const previousSelectedAddress = shipAddresses.find(
        (address) => address.isDeliver === true
      );

      if (editAddress) {
        dispatch(
          updateAddressDetails({
            addressId: editAddress._id,
            dataToUpdate: newAddress,
          })
        );
      } else {
        dispatch(
          addNewAddress({
            data: { ...newAddress, isDeliver: true },
            previousSelectedAddress,
          })
        );
      }

      resetRendering();
      resetForm();
    }
  };

  const handleCancelBtn = () => {
    resetForm();
    resetRendering();
  };

  const resetForm = () => {
    setNewAddress({
      userFullName: "",
      mobileNumber: "",
      pincode: "",
      locality: "",
      address: "",
      district: "",
      state: "",
      addressType: "",
      isDeliver: false,
    });
  };

  return (
    <>
      <div className="card">
        <h5 className="card-header">
          {!editAddress ? "Add new address" : "Update address"}
        </h5>
        <div className="card-body">
          <form onSubmit={formSubmitHandler}>
            <div className="row mb-4">
              <div className="col-md-6">
                <input
                  name="userFullName"
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  onChange={handleFormInputs}
                  value={newAddress.userFullName}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  name="mobileNumber"
                  type="text"
                  placeholder="10-digit mobile number"
                  className="form-control"
                  onChange={handleFormInputs}
                  maxLength="10"
                  value={newAddress.mobileNumber}
                  required
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-6">
                <input
                  name="pincode"
                  type="text"
                  placeholder="Pincode"
                  className="form-control"
                  onChange={handleFormInputs}
                  maxLength="6"
                  value={newAddress.pincode}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  name="locality"
                  type="text"
                  placeholder="Locality"
                  className="form-control"
                  onChange={handleFormInputs}
                  value={newAddress.locality}
                  required
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-12">
                <input
                  name="address"
                  type="text"
                  placeholder="Address"
                  className="form-control pb-5"
                  onChange={handleFormInputs}
                  value={newAddress.address}
                  required
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-6">
                <input
                  name="district"
                  type="text"
                  placeholder="District"
                  className="form-control"
                  onChange={handleFormInputs}
                  value={newAddress.district}
                  required
                />
              </div>
              <div className="col-md-6">
                <select
                  className="form-control"
                  name="state"
                  onChange={handleFormInputs}
                  value={newAddress.state}
                  required
                >
                  <option value="" disabled>
                    Select a State
                  </option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">
                    Dadra and Nagar Haveli and Daman and Diu
                  </option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                </select>
              </div>
            </div>
            <div>
              <label>Address Type</label>
              <div className="d-flex justify-content-start">
                <div>
                  <label>
                    <input
                      type="radio"
                      name="addressType"
                      onChange={handleFormInputs}
                      value="Home"
                      required
                      checked={newAddress.addressType === "Home"}
                    />{" "}
                    Home (All day delivery)
                  </label>
                </div>

                <div className="ms-3">
                  <label>
                    <input
                      type="radio"
                      name="addressType"
                      onChange={handleFormInputs}
                      value="Work"
                      checked={newAddress.addressType === "Work"}
                    />{" "}
                    Work (Delivery between 10 AM - 5 PM)
                  </label>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-start mt-4">
              <div>
                <button
                  className="btn btn-warning btn-sm"
                  type="submit"
                  style={{
                    backgroundColor: "darkorange",
                    color: "white",
                  }}
                >
                  {editAddress ? "Update address" : "Save address"}
                </button>
              </div>
              <div className="ms-2">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={handleCancelBtn}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewAddressForm;
