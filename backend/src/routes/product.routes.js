import {createProduct} from '../controllers/product.controller.js'
import express from 'express'
import { isLoggedIn } from '../middlewares/jwtAuth.middleware.js';
import upload from '../middlewares/multer.middleware.js';


const router = express.Router();
router.post('/createProduct', upload.single("images"), createProduct)


export default router

