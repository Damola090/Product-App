const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Add a Product"],
        trim: true,
        maxLength: [100, "Product Name must not exceed 100 characters"]
    },
    price: {
        type: Number,
        required: [true, 'please enter Produt Price'],
        maxLength: [5, 'Product Price cannot exceed 5 Characters'],
        default: 0
    },
    description: {
        type: String,
        required: [true, "Please Add Product Description"],
    },
    images: [
        {
            public_id: {
                type: String,
                default: "No Image yet"
            },
            url: {
                type: String,
                default: "No Image Yet"
            }
        }
    ],
    stock : {
        type: Number,
        required: [true, "please enter product Stock"],
        maxLength: [5, 'product name cannot exceed 5 characters'],
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }  
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product