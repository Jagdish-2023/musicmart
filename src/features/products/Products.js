import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header";
import { fetchProductsAsync } from "./productsSlice";
import ProductsList from "../../components/pages/ProductsList";
import FilterForm from "../filter/FilterForm";

const Products = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="container mt-5">
        <div className="row">
          {<FilterForm />}

          {<ProductsList products={products} />}
        </div>
      </main>
    </>
  );
};

export default Products;
