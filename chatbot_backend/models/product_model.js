const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const products = new Schema(
  {
    product_id: { type: Number },
    product_name: { type: String },
    Stock_price: { type: String },
    About: { type: String },
    questions: [String],
    answers: [String],
    graph: [String],
    image: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", products);
