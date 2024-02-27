import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CartPage() {
  const { subTotal } = useSelector((state) => state.cart.cartData);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user) || null;

  const [orderTotal, setOrderTotal] = useState(0);
  useEffect(() => {
    const amountToPay = subTotal + 100 + Number(subTotal / 100);
    setOrderTotal(amountToPay);
  }, [subTotal]);

  return (
    <div className="mx-8 my-8 border grid gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">
          Shopping Cart
        </h1>
        <button className="px-4 py-[2px] text-sm bg-red-600 text-white rounded-xl">
          Clear Cart
        </button>
      </div>

      <div className="border h-[1px] border-gray-300 "></div>

      <div className="grid sm:grid-cols-12">
        <div className="sm:col-span-9 border border-gray-500 grid gap-5 px-5 py-5">
          {cartItems.map((item, index) => {
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
              <h4>Subtotal</h4>
              <span>{subTotal}</span>
            </div>
            <div className="flex items-center justify-between border-b-2 mb-2">
              <h4>Shipping</h4>
              <span>{`${Number(100)}`}</span>
            </div>
            <div className="flex items-center justify-between border-b-2 mb-5">
              <h4>
                Tax &nbsp;<small> 0.1%</small>
              </h4>
              <span>{`${Number(subTotal / 10)}`}</span>
            </div>
            <div className="flex items-center justify-between border-b-2 mb-3 mt-6">
              <h2 className="font-bold">Order Total</h2>
              <span>{orderTotal}</span>
            </div>
          </div>
          {user ? (
            <button className="font-bold px-4 py-2 border rounded-lg bg-yellow-500 text-blue-950">
              Proceed to Checkout
            </button>
          ) : (
            <button className="font-bold px-4 py-2 border rounded-lg bg-yellow-500 text-blue-950">
              Please Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
