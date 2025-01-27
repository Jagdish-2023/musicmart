import "../css/header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavouriteItems,
  fetchCartItems,
  saveSearchInput,
} from "../features/products/productsSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favouriteItems, cartItems } = useSelector((state) => state.products);

  const [searchInput, setSearchInput] = useState("");

  const heartIconHandler = () => {
    navigate("/wishlist");
  };

  const basketIconHandler = () => {
    navigate("/view-cart");
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    dispatch(saveSearchInput(searchInput));
    navigate("/products");
  };

  useEffect(() => {
    dispatch(fetchFavouriteItems());
    dispatch(fetchCartItems());
  }, [dispatch]);
  return (
    <header className="bg-light">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <NavLink className="navbar-brand" to="/">
            MusicMart
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-auto">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>

              <form
                className="d-flex"
                role="search"
                onSubmit={handleSearchInput}
              >
                <input
                  className="form-control me-1"
                  type="search"
                  placeholder="Search.."
                  aria-label="Search"
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput}
                />

                <button className="btn btn-outline-warning" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>

            <div className="nav-item dropdown px4 nav-dropdown-links">
              <NavLink
                className="nav-link dropdown-toggle"
                to="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person fs-3"></i>
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/my-profile">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/my-orders">
                    Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/my-addresses">
                    My addresses
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="d-flex">
              <div
                className="position-relative me-1"
                onClick={heartIconHandler}
                style={{ cursor: "pointer" }}
              >
                <i className="bi bi-heart mx-2 fs-4"></i>
                <span
                  style={{ padding: "3px 5px" }}
                  className="bg-danger position-absolute start-50 top-0 badge rounded-circle"
                >
                  {favouriteItems.length}
                </span>
              </div>
              <div
                className="position-relative"
                onClick={basketIconHandler}
                style={{ cursor: "pointer" }}
              >
                <i className="bi bi-cart mx-2 fs-4"></i>
                <span
                  style={{ padding: "3px 5px" }}
                  className="bg-danger position-absolute start-50 top-0 badge rounded-circle"
                >
                  {cartItems.reduce((acc, cur) => acc + cur.cartQuantity, 0)}
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
