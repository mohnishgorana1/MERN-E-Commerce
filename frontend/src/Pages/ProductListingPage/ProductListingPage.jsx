import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsAsync } from "../../Redux/product/productSlice";
import ProductCard from "../../Components/ProductCard/ProductCard";
import FilterSort from "../../Components/FilterSort/FilterSort";

function ProductListingPage() {
  const products = useSelector((state) => state.products.products);

  function fetchAllProducts() {
    dispatch(fetchAllProductsAsync());
  }

  const dispatch = useDispatch();
  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div className="mx-8 my-8 flex flex-col gap-8">
      <FilterSort />
      <div className=" grid grid-cols-2 sm:grid-cols-4 gap-5 items-center justify-center">
        {products &&
          products.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
      </div>
    </div>
  );
}

export default ProductListingPage;
