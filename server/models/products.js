let mongoose = require("mongoose");
//AmirPatel-301229381
// create a model class
let Product = mongoose.Schema(
  {
    Productid: String,
    Productname: String,
    Description: String,
    Price: Number,
  },
  {
    collection: "products",
  }
);

module.exports = mongoose.model("Product", Product);
