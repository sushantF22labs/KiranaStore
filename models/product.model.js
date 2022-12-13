const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, require: true },
  price: { type: Number, require: true },
  category: {
    quality: { type: String, default: null },
  },
  description: { type: String, require: true },
  img: { type: String, require: true },
  userId: { type: String, require: true },
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = {
  ProductModel,
};
