import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "../features/products/productsSlice";
import { filterSlice } from "../features/filter/filterSlice";

export default configureStore({
  reducer: { products: productsSlice.reducer, filters: filterSlice.reducer },
});
