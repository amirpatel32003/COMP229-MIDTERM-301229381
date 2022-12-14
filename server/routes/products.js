//AmirPatel-301229381
// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the product model
let product = require("../models/products");

/* GET products List page. READ */
router.get("/", (req, res, next) => {
  // find all products in the products collection
  product.find((err, products) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("products/index", {
        title: "Products",
        products: products,
      });
    }
  });
});

//  GET the Product Details page in order to add a new Product
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  res.render('products/add', {title : 'Add a Product'});
});

// POST process the Product Details page and create a new Product - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let newProduct = product({
    Productid: req.body.Productid,
    Productname: req.body.Productname,
    Description: req.body.Description,
    Price: req.body.Price
  })

  product.create(newProduct, (err, product) => {
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/products');
    }
  })
});

// GET the Product Details page in order to edit an existing Product
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

  console.log(req.params.id);

  product.findById({_id : req.params.id}, (err, product) => {
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.render('products/details', {title: 'Edit a Product', products : product});
    }
  })
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  console.log(req.params.id);

  let editedProduct = product({
    _id : req.params.id,
    Productid: req.body.Productid,
    Productname: req.body.Productname,
    Description: req.body.Description,
    Price: req.body.Price
  })

  product.update({_id : req.params.id}, editedProduct, (err, product) => {
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/products');
    }
  })
});

// GET - process the delete
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  console.log(req.params.id);


  product.remove({_id : req.params.id}, (err) => {
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/products');
    }
  })
});

module.exports = router;
