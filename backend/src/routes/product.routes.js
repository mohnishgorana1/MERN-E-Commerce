import {createProduct, fetchAllProducts, singleProduct} from '../controllers/product.controller.js'
import express from 'express'
import { isLoggedIn } from '../middlewares/jwtAuth.middleware.js';
import upload from '../middlewares/multer.middleware.js';


const router = express.Router();
router.post('/createProduct', upload.single("images"), createProduct)
router.get('/getAllProducts', fetchAllProducts)
router.get('/:id', singleProduct)




export default router

