import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filteredPrice: null,
    filteredCategory: [],
    filteredRating: null,
    filteredSortBy: null,
  },
  reducers: {
    priceFilter: (state, action) => {
      state.filteredPrice = action.payload;
    },
    categoryFilter: (state, action) => {
      const { value, isChecked } = action.payload;

      if (isChecked) {
        state.filteredCategory = [...state.filteredCategory, value];
      } else {
        state.filteredCategory = state.filteredCategory.filter(
          (category) => category !== value
        );
      }
    },
    ratingFilter: (state, action) => {
      state.filteredRating = action.payload;
    },
    sortByFilter: (state, action) => {
      state.filteredSortBy = action.payload;
    },
    resetFormFilter: (state) => {
      state.filteredPrice = null;
      state.filteredCategory = [];
      state.filteredRating = null;
      state.filteredSortBy = null;
    },
  },
});

export const {
  priceFilter,
  categoryFilter,
  ratingFilter,
  sortByFilter,
  resetFormFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
