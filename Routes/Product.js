const express = require('express');
const router = express.Router();

const { 
    createNewProduct, 

    getProducts, 
    getSingleProductDetails,
    
    updateProduct,
    DeleteProduct,

    upload,
    uploadImage
} = require('../controllers/ProductController');

router.route('/get-all-products').get(getProducts);
router.route('/get-single-product/:id').get(getSingleProductDetails);

router.route('/admin/create-new-product').post(createNewProduct);
router.route('/admin/get-single-product/:id')
    .put(updateProduct)
    .delete(DeleteProduct)

router.post('/admin/product/image', upload.array('image', 6), uploadImage)


module.exports = router