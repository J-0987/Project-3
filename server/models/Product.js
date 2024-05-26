const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  thumbnail: {
    type: String,
    required: false,
  },
  images: {
    type: [String]
  },
  price: {
    type: Number,
    required: true,
    min: 0.50
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: false
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
