import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { ProductCategory } from "../models/productCategory.model.js";
import cloudinary, { v2 } from "cloudinary";
import fs from "fs/promises";

export const createProduct = async (req, res, next) => {
  // Get Data From Request an validate them
  const productData = {
    name: req.body.name,
    description: req.body.description,
    price: Number(req.body.price),
    category: req.body.category,
    gender: req.body.gender,
    brand: req.body.brand,
    tags: [req.body.tags],
    isFeatured: req.body.isFeatured,
    stockQuantity: Number(req.body.stockQuantity),
  };
  if (
    !productData.name ||
    !productData.description ||
    !productData.price ||
    !productData.category ||
    !productData.gender ||
    !productData.brand ||
    !productData.isFeatured ||
    !productData.stockQuantity
  ) {
    console.log("All field are required");
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  // Check category is available or we have to create new one
  let productCategory = await ProductCategory.findOne({
    name: productData.category,
  });
  if (!productCategory) {
    productCategory = await ProductCategory.create({
      name: productData.category,
    });
  }

  // create the product with some data
  const newProduct = await Product.create({
    name: productData.name,
    description: productData.description,
    price: productData.price,
    category: productCategory,
    gender: productData.gender || "MEN",
    images: {
      public_id: "",
      secure_url: "",
    },
    brand: productData.brand,
    tags: productData.tags || [],
    isFeatured: productData.isFeatured || false,
    stockQuantity: productData.stockQuantity || 0,
  });
  if (!newProduct) {
    return res.status(500).json({
      success: false,
      error: "Product can't be created",
    });
  }

  // if file exists from request then upload on cloudinary and add it to our newProduct
  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "E-Commerce",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        newProduct.images.public_id = result.public_id;
        newProduct.images.secure_url = result.secure_url;

        //remove file from local system
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      return res.status(
        500,
        "Product Image File not uploaded, Please try again!"
      );
    }
  } else {
    return res.status(
      500,
      "Product Image File not received from client side , Please try again!"
    );
  }

  // last tasks: save newProduct, add newProduct to products of productCategory , save productCategory
  await newProduct.save();
  productCategory.products.push(newProduct._id);
  await productCategory.save();

  // if your there then send response
  res.status(201).json({
    success: true,
    message: "Product Created SuccessFully",
    newProduct: newProduct,
  });
};

export const fetchAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Can't Fetch All Products",
    });
  }
};

export const singleProduct = async (req, res, next) => {
  const productId = req.params.id;
  console.log("productId: ", productId);

  try {
    const product = await Product.findById(productId).populate('category', 'name');
    if (!product) {
      console.log("Can't find your product");
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    console.log(product);
    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Can't Fetch Required Products",
    });
  }
};
