import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsAsync } from "../../Redux/product/productSlice";
import ProductCard from "../../Components/ProductCard/ProductCard";
import FilterSort from "../../Components/FilterSort/FilterSort";
import Pagination from "../../Components/Pagination/Pagination";

function ProductListingPage() {
  const products = useSelector((state) => state.products.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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
        {currentProducts &&
          currentProducts.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
      </div>
      <section className="place-self-center sm:place-self-end">
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </div>
  );
}

export default ProductListingPage;
