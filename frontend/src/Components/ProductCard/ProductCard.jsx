import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const {
    _id,
    brand,
    category,
    description,
    gender,
    images,
    name,
    price,
    reviews,
    stockQuantity,
    tags,
  } = product;
  const navigate = useNavigate();
  return (
    <div className="border sm:w-full flex flex-col h-[500px] bg-gray-900 relative">
      <div className="overflow-hidden  ">
        <img
          src={images.secure_url}
          alt="item_image"
          className="w-full hover:scale-125 duration-200 ease-in-out"
        />
      </div>
      <div className="flex flex-col items-center gap-3 mt-8 text-gray-100 ">
        <h1 className="font-bold text-xl text-center">{name}</h1>
        <p className="font-semibold ">Price: ₹{price}</p>
        <button 
            className="rounded-xl mt-2 border border-transparent px-5 py-1 bg-green-600 font-semibold text-gray-950 hover:bg-transparent hover:text-green-600 hover:border-green-600 ease-in-out duration-150"
            onClick={() => navigate(`/product/${_id}`)}    
        >
          Buy Now
        </button>
        {price > 300 ? (
          <p className="underline absolute right-2 bottom-2">Free Delivery</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ProductCard;
