import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/Header";
import { categoryFilter, resetFormFilter } from "./features/filter/filterSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetFormFilter()); //reset filterStoreSlice as soon as leave from Products component
  }, [dispatch]);

  const handleSelectedCategory = (value) => {
    const isChecked = true;

    dispatch(categoryFilter({ isChecked, value }));
    navigate("/products");
  };
  return (
    <>
      <Header />
      <main className="container mt-5">
        <section>
          <img
            // src="https://placehold.co/1400x600?text=MusicMart"
            src="https://yamaha.ndcdn.in/media/wysiwyg/banner_desk_27_01.jpg"
            alt="brand"
            className="img-fluid"
          />
        </section>

        <section className="py-5">
          <h1 className="text-center py-3">Top Categories</h1>
          <div className="row">
            <div className="col-md-3 mb-3">
              <div
                className="card"
                style={{ cursor: "pointer" }}
                onClick={() => handleSelectedCategory("Guitar")}
              >
                <img
                  src="https://m.media-amazon.com/images/I/71jh2mbBMdS._SX679_.jpg"
                  alt="guitar"
                  className="card-img opacity-75"
                />

                <div className="card-img-overlay">
                  <p
                    className="text-center display-6 bg-light position-relative"
                    style={{ top: "75%" }}
                  >
                    Guitar
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div
                className="card"
                style={{ cursor: "pointer" }}
                onClick={() => handleSelectedCategory("Piano")}
              >
                <img
                  src="https://m.media-amazon.com/images/I/71z7svZWSFL.jpg"
                  alt="piano"
                  className="card-img opacity-75"
                />

                <div className="card-img-overlay">
                  <p
                    className="text-center display-6 bg-light position-relative"
                    style={{ top: "75%" }}
                  >
                    Piano
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div
                className="card"
                style={{ cursor: "pointer" }}
                onClick={() => handleSelectedCategory("Drum")}
              >
                <img
                  src="https://kadence.in/wp-content/uploads/2023/12/D1.jpg"
                  alt="drum"
                  className="card-img opacity-75"
                />

                <div className="card-img-overlay">
                  <p
                    className="text-center display-6 bg-light position-relative"
                    style={{ top: "75%" }}
                  >
                    Drum
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div
                className="card"
                style={{ cursor: "pointer" }}
                onClick={() => handleSelectedCategory("Ukulele")}
              >
                <img
                  src="https://m.media-amazon.com/images/I/71z8SiuiX+L._SX522_.jpg"
                  alt="ukulele"
                  className="card-img opacity-75"
                />

                <div className="card-img-overlay">
                  <p
                    className="text-center display-6 bg-light position-relative"
                    style={{ top: "75%" }}
                  >
                    Ukulele
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
