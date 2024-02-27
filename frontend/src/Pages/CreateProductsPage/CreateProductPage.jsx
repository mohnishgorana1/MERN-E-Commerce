import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductAsync } from "../../Redux/product/productSlice";

function CreateProductPage() {
  const dispatch = useDispatch();

  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    gender: "",
    images: "",
    brand: "",
    tags: [],
    isFeatured: false,
    stockQuantity: "",
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: [e.target.value],
    }));
  };

  const handleImage = (e) => {
    e.preventDefault();

    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      setFormData({
        ...formData,
        images: uploadedImage,
      });

      // for preview File on frontend
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImagePreview(this.result);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataForServer = new FormData();
    for (const key in formData) {
      formDataForServer.append(key, formData[key]);
    }
    console.log("FORMDATA FOR SERVER", formDataForServer);
    const res = await dispatch(createProductAsync(formDataForServer));
    if (res?.payload?.success === true) {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        gender: "",
        images: "",
        brand: "",
        tags: [],
        isFeatured: false,
        stockQuantity: "",
      });
      return;
    } else {
      return;
    }
  };
  return (
    <main className="w-full border border-blue-500">
      <div className="w-full px-5 py-6 sm:py-12 sm:px-16">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="grid gap-y-8 items-center sm:justify-center border"
        >
          <div className="p-2 grid sm:grid-cols-2 gap-5 border">
            <section className="sm:col-span-1 ">
              <div className="h-[400px] sm:max-h-72 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    onChange={handleImage}
                    className="h-full w-full"
                  />
                ) : (
                  <h1 className="font-bold">Upload Product Image</h1>
                )}
              </div>
              <input type="file" name="images" onChange={handleImage} />
            </section>
            <section className="sm:col-span-1 flex flex-col gap-y-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="py-1 px-3 w-full border border-gray-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                className="py-1 px-3 w-full border border-gray-500"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="brand"
                placeholder="Brand"
                className="py-1 px-3 w-full border border-gray-500"
                value={formData.brand}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                className="py-1 px-3 w-full border border-gray-500"
                value={formData.category}
                onChange={handleChange}
                required
              />
              <select
                type="text"
                name="gender"
                className="py-1 px-3 w-full border border-gray-500"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" className="text-gray-300">Gender</option>
                <option value="MEN">MEN</option>
                <option value="WOMEN">WOMEN</option>
              </select>
              <textarea
                name="description"
                placeholder="Description"
                className="py-1 px-3 w-full border border-gray-500"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
              <div className="w-full flex items-center justify-between">
                <label className="flex items-center gap-3">
                  <h1 className="font-semibold">Is Featured</h1>
                  <input
                    type="checkbox"
                    name="isFeatured"
                    onChange={handleChange}
                    value={formData.isFeatured}
                    className="border border-black h-8 w-5 py-8 rounded-full"
                  />
                </label>
                <label className="flex items-center gap-3 justify-between">
                  <h1 className="font-semibold">Stock</h1>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    className="border border-gray-500 h-5 w-12 text-center"
                  />
                </label>
              </div>
            </section>
          </div>
          <div className="w-full text-center">
            <button
              type="submit"
              className="w-full py-1 px-5 font-bold sm:py-2 bg-green-600 hover:bg-green-700 text-white"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
export default CreateProductPage;
