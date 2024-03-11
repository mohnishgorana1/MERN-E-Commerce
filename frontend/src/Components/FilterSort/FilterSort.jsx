import { useDispatch, useSelector } from "react-redux";
import { filterProductsAsync } from "../../Redux/product/productSlice.js";
import { useState } from "react";

function FilterSort() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products?.categories);
  const [selectedPrice, setSelectedPrice] = useState("");

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    isFeatured: false,
    price: selectedPrice,
    sortOrder: "",
  });
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    console.log(filters);
    dispatch(filterProductsAsync(filters));
  };
  return (
    <div className="w-full  py-3 px-5 rounded-xl bg-slate-200">
      <h1 className="text-slate-900 font-bold text-lg sm:text-xl pb-1 border max-w-44 border-b-blue-500">
        Filter Products
      </h1>

      <form
        onSubmit={handleFilterSubmit}
        className="mt-4 mx-3 grid sm:grid-cols-6 gap-3 items-center"
      >
        <div className="sm:col-span-2 flex gap-5 items-center">
          <h1 className="font-semibold">Category</h1>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="px-3 text-sm border border-gray-800 rounded-xl"
          >
            <option value="">Select Category</option>
            {categories.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2 flex gap-8 sm:gap-5 items-center">
          <h1 className="font-semibold">Gender</h1>
          <select
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            className="px-4 text-sm border border-gray-800 rounded-xl"
          >
            <option value="">Select Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        <div className="sm:col-span-2 flex gap-2 items-center"> 
          <h3 className="font-semibold">Sort Order</h3>
          <select
            name="sortOrder"
            value={filters.sortOrder}
            onChange={handleFilterChange}
            className="px-3 text-sm border border-gray-800 rounded-xl"
          >
            <option value="">No Sorting</option>
            <option value="asc">Name (ascending)</option>
            <option value="desc">Name (descending)</option>
          </select>
        </div>
        <div className="sm:col-span-2 flex gap-5">
          <h3 className="font-semibold">Is Featured</h3>
          <input
            type="checkbox"
            name="isFeatured"
            value={filters.isFeatured}
            onChange={handleFilterChange}
          />
        </div>
        <div className="sm:col-span-2 w-[80%] flex flex-col justify-start">
          <div className="flex items-center  justify-between ">
            <h3 className="font-semibold">Price </h3>
            <h4 className="text-blue-900 font-bold font-sans">
              {selectedPrice}
            </h4>
          </div>
          <input
            type="range"
            min={0}
            max={2000}
            step={100}
            value={filters.price}
            onChange={(e) => {
              setSelectedPrice(+e.target.value);
              handleFilterChange({
                target: { name: "price", value: +e.target.value },
              });
            }}
          />
          <div className="flex justify-between ">
            <small className="text-gray-900">0</small>
            <small className="text-gray-900">
              <span className="font-semibold">MAX: </span>2000
            </small>
          </div>
        </div>

        <button className="sm:col-span-2 bg-blue-700 rounded-2xl text-white px-5 py-1 mt-5 sm:place-self-start hover:bg-blue-900 duration-200 ease-in-out">
          Apply Filters
        </button>
      </form>
    </div>
  );
}

export default FilterSort;

/* {
        categories.map((c,i) => (
          <h1 key={i}>{c}</h1>
        ))
      } */
