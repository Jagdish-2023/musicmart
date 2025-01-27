import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  priceFilter,
  categoryFilter,
  ratingFilter,
  sortByFilter,
  resetFormFilter,
} from "./filterSlice";

const FilterForm = () => {
  const dispatch = useDispatch();
  const { filteredCategory, filteredRating, filteredSortBy } = useSelector(
    (state) => state.filters
  );

  const [renderSliderValue, setRenderSliderValue] = useState(20000);

  const priceBtnHandler = () => {
    dispatch(priceFilter(renderSliderValue));
  };

  const categoryHandler = (e) => {
    const isChecked = e.target.checked;
    const value = e.target.value;
    dispatch(categoryFilter({ isChecked, value }));
  };

  const ratingHandler = (e) => {
    const value = parseInt(e.target.value);
    dispatch(ratingFilter(value));
  };

  const priceSortHandler = (e) => {
    const value = e.target.value;
    dispatch(sortByFilter(value));
  };

  const resetFormHandler = () => {
    dispatch(resetFormFilter());
    setRenderSliderValue(20000);
  };

  return (
    <>
      <div id="filterSection" className="col-md-2">
        <form id="filterForm">
          <div>
            <span className="fw-bold fs-5">Filters</span>
            <button
              type="button"
              className="float-end btn btn-outline-danger rounded-pill"
              onClick={resetFormHandler}
            >
              Clear
            </button>
          </div>

          {/*filter price */}
          <div className="py-3">
            <div>
              <label htmlFor="priceInput">
                <span className="fw-bold">Price</span>
              </label>
              <br />
              <div
                className="d-flex justify-content-between mt-1"
                style={{ width: "70%" }}
              >
                <span style={{ fontSize: "13px" }}>₹3000</span>
                <span style={{ fontSize: "13px" }}>₹25000</span>
                <span style={{ fontSize: "13px" }}>₹50000</span>
              </div>
              <div className="d-flex justify-content-between">
                <input
                  type="range"
                  id="priceInput"
                  min="3000"
                  max="50000"
                  onChange={(e) =>
                    setRenderSliderValue(parseInt(e.target.value))
                  }
                  value={renderSliderValue}
                  style={{ width: "70%" }}
                />
                <button
                  type="button"
                  className="btn btn-outline-primary rounded-pill"
                  onClick={priceBtnHandler}
                >
                  Go
                </button>
              </div>
              {renderSliderValue !== 0 && (
                <p className="m-0">
                  Price Range: {`₹ 3000 - ₹${renderSliderValue}`}
                </p>
              )}
            </div>
          </div>
          {/* filter category */}
          <div className="py-3">
            <span className="fw-bold">Category</span>
            <br />
            <label htmlFor="guitar">
              <input
                type="checkbox"
                id="guitar"
                name="categories"
                value="Guitar"
                onChange={categoryHandler}
                checked={filteredCategory.includes("Guitar")}
              />{" "}
              Guitar
            </label>
            <br />
            <label htmlFor="piano">
              <input
                type="checkbox"
                id="piano"
                name="categories"
                value="Piano"
                onChange={categoryHandler}
                checked={filteredCategory.includes("Piano")}
              />{" "}
              Piano
            </label>
            <br />
            <label htmlFor="ukulele">
              <input
                type="checkbox"
                id="ukulele"
                name="categories"
                value="Ukulele"
                onChange={categoryHandler}
                checked={filteredCategory.includes("Ukulele")}
              />{" "}
              Ukulele
            </label>
            <br />
            <label htmlFor="drum">
              <input
                type="checkbox"
                id="drum"
                name="categories"
                value="Drum"
                onChange={categoryHandler}
                checked={filteredCategory.includes("Drum")}
              />{" "}
              Drum
            </label>
          </div>
          {/* filter rating */}
          <div className="py-3">
            <span className="fw-bold">Rating</span>
            <br />
            <label htmlFor="fourStarRate">
              <input
                type="radio"
                name="ratings"
                id="fourStarRate"
                value={4}
                onChange={ratingHandler}
                checked={filteredRating === 4}
              />{" "}
              4 ★ & above
            </label>
            <br />
            <label htmlFor="threeStarRate">
              <input
                type="radio"
                name="ratings"
                id="threeStarRate"
                value={3}
                onChange={ratingHandler}
                checked={filteredRating === 3}
              />{" "}
              3 ★ & above
            </label>
            <br />
            <label htmlFor="twoStarRate">
              <input
                type="radio"
                name="ratings"
                id="twoStarRate"
                value={2}
                onChange={ratingHandler}
                checked={filteredRating === 2}
              />{" "}
              2 ★ & above
            </label>
            <br />
            <label htmlFor="oneStarRate">
              <input
                type="radio"
                name="ratings"
                id="oneStarRate"
                value={1}
                onChange={ratingHandler}
                checked={filteredRating === 1}
              />{" "}
              1 ★ & above
            </label>
          </div>
          {/* sort by */}
          <div className="py-3">
            <span className="fw-bold">Sort by</span>
            <br />
            <label htmlFor="lowToHigh">
              <input
                type="radio"
                id="lowToHigh"
                name="priceSorting"
                value="lowToHigh"
                onChange={priceSortHandler}
                checked={filteredSortBy === "lowToHigh"}
              />{" "}
              Price - Low to High
            </label>
            <br />
            <label htmlFor="HighToLow">
              <input
                type="radio"
                id="HighToLow"
                name="priceSorting"
                value="highToLow"
                onChange={priceSortHandler}
                checked={filteredSortBy === "highToLow"}
              />{" "}
              Price - High to Low
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default FilterForm;
