import Header from "./Header";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../features/products/productsSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, profileInfo, storageToken } = useSelector(
    (state) => state.products
  );

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const editButtonHandler = () => {
    setFullName(profileInfo?.fullName);
    setGender(profileInfo?.gender);
    setDateOfBirth(profileInfo?.dateOfBirth);
    setEmail(profileInfo?.email);
    setPhoneNumber(profileInfo?.phoneNumber);
    setIsEditProfile(true);
  };

  const formUpdateHandler = (e) => {
    e.preventDefault();
    setIsEditProfile(false);

    const dataToUpdate = { fullName, dateOfBirth, gender, email, phoneNumber };
    const profileId = profileInfo._id;
    dispatch(updateUserProfile({ profileId, dataToUpdate }));
  };

  useEffect(() => {
    if (!storageToken) {
      navigate("/login");
    } else {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, navigate, storageToken]);
  return (
    <>
      <Header />
      <main className="container py-5">
        {error && <p>{error}</p>}
        {status === "loading" && <p>Loading...</p>}
        {!isEditProfile && status === "success" && profileInfo && (
          <div>
            <h4>Personal Information</h4>
            <hr />
            <div className="d-flex flex-column gap-3">
              <div>
                <h5>Full name</h5>
                <p>{profileInfo.fullName}</p>
              </div>
              <div>
                <h5>Gender</h5>
                <p>{profileInfo.gender}</p>
              </div>
              <div>
                <h5>Date Of Birth</h5>
                <p>{profileInfo.dateOfBirth}</p>
              </div>
              <div>
                <h5>Email</h5>
                <p>{profileInfo.email}</p>
              </div>
              <div>
                <h5>Mobile Number</h5>
                <p>{profileInfo.phoneNumber}</p>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={editButtonHandler}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}

        {isEditProfile && (
          <div className="mt-5">
            <h4>Edit Profile</h4>
            <form onSubmit={formUpdateHandler}>
              <div className="col-md-4 mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  className="form-control"
                  type="date"
                  placeholder="Date of birth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <input
                  className="form-control"
                  type="number"
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <select
                  className="form-control"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-4 mt-3">
                <button className="btn btn-sm btn-warning" type="submit">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger ms-2"
                  onClick={() => setIsEditProfile(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </>
  );
};

export default Profile;
