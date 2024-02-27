import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsAsync } from "../../Redux/product/filterProductSlice";
import ProductCard from "../../Components/ProductCard/ProductCard";

function ProductListingPage() {
  const products = useSelector((state) => state.filteredProducts.products);

  function fetchAllProducts() {
    dispatch(fetchAllProductsAsync());
  }
  function log(){
    console.log(products);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAllProducts();
    log();
  }, []);
  return (
    <div className="border border-black mx-8 my-8 grid grid-cols-2 sm:grid-cols-4 gap-5 items-center justify-center">
      {products &&
        products.map((product, index) => {
          return <ProductCard key={index} product={product} />;
        })}
    </div>
  );
}

export default ProductListingPage;
