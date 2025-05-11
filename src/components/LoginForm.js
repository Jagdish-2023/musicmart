import "../css/loginForm.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerNewUser,
  toggleSignup,
  loginUser,
} from "../features/products/productsSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isRegistered, storageToken, status, error } = useSelector(
    (state) => state.products
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("Male");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (isRegistered) {
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setDOB("");
      setGender("Male");
      setPassword("");
    }

    if (storageToken) {
      navigate("/");
    }
  }, [isRegistered, storageToken, navigate]);

  const handleActionToggle = () => {
    setIsSignUp(!isSignUp);
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setDOB("");
    setGender("Male");
    setPassword("");

    if (!isSignUp) {
      dispatch(toggleSignup());
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (!email.includes("@")) {
        return alert("Please enter the correct email");
      }

      if (!/^[0-9]{10}$/.test(phoneNumber)) {
        return alert(
          "Phone number must be exactly 10 digits and contain only numbers"
        );
      }

      if (password.length < 6) {
        return alert("Password length must be more than six characters");
      }

      const userInfo = {
        fullName,
        email,
        phoneNumber,
        gender,
        password,
        dateOfBirth: DOB,
      };
      dispatch(registerNewUser(userInfo));
    }

    if (!isSignUp) {
      if (!/^[0-9]{10}$/.test(phoneNumber)) {
        return alert(
          "Phone number must be exactly 10 digits and contain only numbers"
        );
      }

      dispatch(loginUser({ phoneNumber, password }));
    }
  };
  return (
    <div className="bg-light h-100 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-3 col-sm-5 bg-white border rounded-3 p-4">
        <h4 className="text-center text-warning">MusicMart</h4>
        <p className="text-center m-0">
          <small>
            Fill all the details to {isSignUp ? "register" : "login"} your
            Account
          </small>
        </p>
        <div className="mt-5">
          <form
            className="d-flex flex-column gap-3"
            onSubmit={handleFormSubmit}
          >
            {isSignUp && (
              <>
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="form-control"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="form-control"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="row justify-content-between">
                  <div className="col-md-6">
                    <label htmlFor="DOB">Date of Birth</label>
                    <input
                      id="DOB"
                      type="date"
                      placeholder="Date of Birth"
                      className="form-control"
                      required
                      value={DOB}
                      onChange={(e) => setDOB(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      className="form-select"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            {!isSignUp && (
              <>
                <div>
                  <label htmlFor="phone-number">* Phone Number</label>
                  <input
                    type="text"
                    id="phone-number"
                    placeholder="Enter your Phone number"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    max={10}
                  />
                </div>

                <div>
                  <label htmlFor="password">* Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your Password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
              </>
            )}

            <div className="d-flex gap-2 flex-column mt-3">
              <button className="btn btn-primary col-12">
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
              <button
                type="button"
                className="btn btn-outline-primary col-12"
                onClick={handleActionToggle}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
        {status === "loading" && (
          <p className="mb-0 mt-2 text-center">
            <small>Please wait...</small>
          </p>
        )}
        {error && <p className="text-danger mb-0 mt-2 text-center">{error}</p>}
        {isRegistered && isSignUp && (
          <p className="text-success mb-0 mt-2">
            Account created successfully. Please Login to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
