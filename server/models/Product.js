const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 200

  },
  details: {
    type: String
  },
  images: {
    type: [String], // Array of strings to store multiple image URLs
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
