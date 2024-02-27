import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, clearCartAsync } from "../../Redux/user/cartSlice";
import { Link, useNavigate } from "react-router-dom";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const cartData = useSelector((state) => state.cart.cartData) || null;
  const cartItems = useSelector((state) => state.cart.cartItems) || null;
  const user = useSelector((state) => state.auth.user) || null;

  const [orderTotal, setOrderTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const handleOrder = () => {
    if(cartData.subTotal < 100){
      setShippingFee(100)
    }else{
      setShippingFee(0)
    }
    const amountToPay = Number(cartData?.subTotal + shippingFee + cartData?.subTotal / 100).toFixed(2) || 0;
    setOrderTotal(Math.round(amountToPay));
  };

  useEffect(() => {
    handleOrder();
  }, [cartData?.subTotal]);

  function handleClearCart() {
    dispatch(clearCart());
    dispatch(clearCartAsync());
  }

  if (!cartData || !cartItems) {
    return (
      <div className="w-full h-screen flex flex-col gap-8 items-center justify-center bg-gray-400 ">
        <h1 className="font-bold text-5xl font-serif">Cart is Empty </h1>
        <p>
          Please add&nbsp;
          <Link to="/products" className="text-red-700 underline">
            Products
          </Link>
          &nbsp;to cart
        </p>
      </div>
    );
  }

  return (
    <div className="mx-8 my-8  grid gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">
          Shopping Cart
        </h1>
        <button
          onClick={() => handleClearCart()}
          className="px-4 py-[2px] text-sm bg-red-600 text-white rounded-xl"
        >
          Clear Cart
        </button>
      </div>

      <div className="border h-[1px] border-gray-300 "></div>

      <div className="grid sm:grid-cols-12">
        <div className="sm:col-span-9 border-b-2 sm:border-b-0 sm:border-r-2  border-gray-500 grid gap-5 px-5 py-5">
          {cartItems &&
            cartItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className="border-b pb-5 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-between"
                >
                  <div className="sm:col-span-1">
                    <img
                      src={item?.product?.images?.secure_url}
                      alt="product image"
                      className="h-[150px] w-[150px] sm:h-[100px] sm:w-[100px]"
                    />
                  </div>
                  <div className="sm:col-span-3 grid sm:grid-cols-3 items-center justify-between gap-4">
                    <div className="sm:col-span-2">
                      <p className="font-bold text-lg">{item?.product?.name}</p>
                      <p className="font-semibold">{item?.product?.brand}</p>
                    </div>
                    <div className="sm:col-span-1 font-semibold grid sm:gap-2">
                      <p>Quantity: {item?.quantity}</p>
                      <p>Price: ₹{item?.product.price}</p>
                      <p>Total: ₹{item?.quantity * item?.product.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="sm:col-span-3 flex flex-col gap-5 mx-4">
          <div className="px-8 py-5 bg-gray-800 text-white text-lg">
            <div className="flex items-center justify-between border-b-2 mb-2">
              <h4>Subtotal </h4>
              <span>₹ {cartData?.subTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between border-b-2 mb-2">
              <h4>Shipping</h4>
              <span>₹ {`${Number(shippingFee).toFixed(2)}`}</span>
            </div>
            <div className="flex items-center justify-between border-b-2 mb-5">
              <h4>
                Tax &nbsp;<small> 0.01%</small>
              </h4>
              <span>₹ {`${Number(cartData?.subTotal / 100).toFixed(2)}`}</span>
            </div>
            <div className="flex items-center justify-between border-b-2 mb-3 mt-6">
              <h2 className="font-bold">Order Total</h2>
              <span>₹ {orderTotal}</span>
            </div>
          </div>
          {user ? (
            <button className="font-bold px-4 py-2 rounded-lg bg-yellow-500  text-blue-950 hover:bg-blue-950 hover:text-yellow-500 duration-200 ease-in-out">
              Proceed to Checkout
            </button>
          ) : (
            <button className="font-bold px-4 py-2 border rounded-lg bg-teal-700 hover:bg-teal-900 text-white">
              Please Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
