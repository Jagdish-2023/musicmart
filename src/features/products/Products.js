import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header";
import { fetchProductsAsync } from "./productsSlice";
import ProductsList from "../../components/ProductsList";
import FilterForm from "../filter/FilterForm";

const Products = () => {
  const dispatch = useDispatch();

  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="container mt-5">
        {error && <p>Failed to fetch Products.</p>}
        {status === "loading" && products.length < 1 && <p>Loading...</p>}

        <div className="row">
          {products.length > 0 && <FilterForm />}

          {products.length > 0 && <ProductsList products={products} />}
        </div>
      </main>
    </>
  );
};

export default Products;
