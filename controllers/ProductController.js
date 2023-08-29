const Product = require("../models/Product");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

//0 Upload Image to Cloud
//1. Create a New Product   - Done
//2. Get All Products  - Done
//3. Get Single Product Details - Done
//4. Update a Single Product - Done
//5. Delete a Single Product - Done

const createNewProduct = async (req, res, next) => {

  try {
   
    const newProduct = await Product.create(req.body);

    if (!newProduct) {
      return res.status(400).json({
        success: false,
        message: "Product Failed to be created ",
      });
    }

    res.status(201).json({
      success: true,
      message: "Product was successfully Created",
      product: newProduct,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Product failed to be created",
    });
  }
};

const getProducts = async (req, res, next) => {

  try {
    const products = await Product.find();

    if (products === null) {
      return res.status(404).json({
        success: false,
        message: "Failed to fetch Products",
      });
    }

    res.status(200).send({
      success: true,
      products: products,
    });

  } catch (err) {
    res.status(400).send({
      success: false,
      message: "Products cannot be fetched ",
    });
  }
};


// 3. Get Single Product Details      -                 /api/v1/product/:id
const getSingleProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).send({
      success: true,
      product: product,
    });
  } catch (err) {
    res.status(404).send({
      success: false,
      message: "Product not Found",
    });
  }
};

// 4. Update a single Product         -                 /api/v1/admin/product/:id
const updateProduct = async (req, res, next) => {
  try {
    
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: true,
      }
    );

    if (!updateProduct) {
      return res.status(400).json({
        success: false,
        message: "Failed to Update Product",
      });
    }

    res.status(200).send({
      success: true,
      product: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong with the server",
    });
  }
};

// 5. Delete a Single Product         -                 /api/v1/admin/product/:id
const DeleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(400).json({
        success: false,
        message: "Product Not Found",
      });
    }

    for (let i = 0; i < product.images.length; i++) {
      const result = await cloudinary.uploader.destroy(
        product.images[i].public_id
      );
    }

    await Product.deleteOne({ _id: req.params.id });

    res.status(200).send({
      success: true,
      message: "Product has been deleted",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "The product failed to be deleted",
    });
  }
};


const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
});

//upload image
const uploadImage = async (req, res, next) => {

  try {

    console.log(req.files)

    let images = [];

    req.files.forEach((singleImage) => {
      images.push(singleImage.path);
    });

    let cloudinaryResponse = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
      });

      cloudinaryResponse.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    return res.status(200).send({
      success: true,
      data: cloudinaryResponse,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "picture could not be uploaded",
    });
  }
};

module.exports = {
  createNewProduct,
  getProducts,
  getSingleProductDetails,
  updateProduct,
  DeleteProduct,

  upload,
  uploadImage,
};
