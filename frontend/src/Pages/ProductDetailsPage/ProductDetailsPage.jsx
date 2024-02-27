import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../../Redux/product/productSlice";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { addToCartAsync } from "../../Redux/user/cartSlice";
function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);

  const fetchProduct = async () => {
    await dispatch(fetchSingleProduct(id));
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const product = useSelector((state) => state.products.singleProduct) || null;

  function increaseAmount() {
    if (amount === product.stockQuantity) {
      return;
    } else {
      setAmount(amount + 1);
    }
  }
  function decreaseAmount() {
    if (amount === 1) {
      return;
    } else {
      setAmount(amount - 1);
    }
  }

  function addToCart(productId, quantity) {
    console.log(productId, quantity);
    dispatch(addToCartAsync({ productId, quantity }));
  }

  return (
    <div className="mx-8 my-5 grid gap-5 sm:grid-cols-3 items-start justify-between ">
      <div className="">
        <img
          src={product?.images.secure_url}
          alt=""
          className="sm:col-span-1 w-full h-full"
        />
      </div>
      <div className="sm:col-span-2 grid items-center justify-center sm:justify-normal">
        <h1 className="text-2xl sm:text-3xl text-blue-900 mb-5">
          <span className="font-bold">{product?.name}</span>
        </h1>
        <h2 className="text-xl sm:text-2xl text-blue-950">
          <span className="text-center">{product?.description}</span>
        </h2>
        <br />
        {product?.stockQuantity < 20 ? (
          <button className="w-[140px] rounded-lg font-semibold px-5 cursor-auto py-2 text-xs bg-red-600 text-white">
            Limited Time Deal
          </button>
        ) : (
          ""
        )}
        <p className="font-semibold mt-4 text-lg font-serif tracking-wider">
          Price: &nbsp; ₹{product?.price}
        </p>
        <br />
        <p className="font-semibold flex items-center gap-8">
          Brand: <span className="text-base font-bold">{product?.brand}</span>
        </p>
        <p className="font-semibold flex items-center gap-6">
          Gender: <span className="text-base font-bold">{product?.gender}</span>
        </p>
        <p className="font-semibold flex items-center gap-3">
          Category:{" "}
          <span className="text-base font-bold">{product?.category.name}</span>
        </p>
        <h1 className="flex items-center gap-6 font-semibold mt-3">
          Amount
          <span className="flex items-center rounded-lg border-2 border-purple-600 font-bold  text-purple-600">
            <button className="px-2 py-1" onClick={decreaseAmount}>
              <FaMinus />
            </button>
            <p className="px-2 py-1 border border-t-0 border-b-0 border-purple-600 text-xl">
              {amount}
            </p>
            <button className="px-2 py-1" onClickCapture={increaseAmount}>
              <FaPlus />
            </button>
          </span>
        </h1>

        <button
          className="w-full sm:w-[20%] rounded-xl my-6 border-2 border-transparent px-5 py-2 bg-gray-800 font-semibold text-gray-100 hover:bg-transparent hover:text-gray-800 hover:border-gray-800 ease-in-out duration-150"
          onClick={() => addToCart(product._id, amount)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
