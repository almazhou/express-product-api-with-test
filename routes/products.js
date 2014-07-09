var express = require('express');
var PricingModel = require("../model/pricing");
var ProductModel = require("../model/product");

var getAllProducts = function(req,res){
	ProductModel.find(function (err, products) {
    if (!err) {
      if(products.length === 0){
        return res.send(404);
      }
      return res.send(products);
    } else {
      return console.log(err);
    }
  });
};

var addProduct = function(req,res){
  var product;
  product = new ProductModel({
    name: req.body.name,
    product_id: req.body.product_id
  });

  product.save(function (err,req,res) {
    if (err) {
      return console.log(err);
    }
  });
  res.location('/products/' + product._id);
  return res.send(201);
};
var getProductById = function(req,res){
  ProductModel.findById(req.params.id, function (err, product) {
    if (!err) {
      if(product){
        return res.send(product);
      }
      return res.send(404);
    } else {
      return console.log(err);
    }
  });

};

var getAllPricings = function(req,res){
  ProductModel.findById(req.params.id, function (err, product) {
    if(!err){
      if(product){
        return res.send(product.pricings);
      }
      return res.send(404);
    }else{
      return res.send(500);
    }

  });
}

var getPricingById = function(req,res){
  PricingModel.findOne({_id:req.params.pricingId,product:req.params.id},function (err,pricing){
    if(!err){
      if(pricing){
        return res.send(pricing);
      }
      return res.send(404);
    }else{
      return res.send(500);
    }
  });
}

var addPricingToProduct = function(req,res){
  var pricing = new PricingModel({amount:req.body.amount});
  ProductModel.findOne(req.params.id,function (err,product){
    if(!err){
      if(product){
        product.addPricing(pricing);
        res.location("/products/"+product._id+"/pricings/"+pricing._id);
       return res.send(201);
      }
      return res.send(404);
    }else{
      return res.send(500);
    }
  });
}

var productRouter = express.Router();

productRouter.route('/').get(getAllProducts).post(addProduct);

productRouter.route('/:id').get(getProductById);

productRouter.route('/:id/pricings').get(getAllPricings).post(addPricingToProduct);

productRouter.route('/:id/pricings/:pricingId').get(getPricingById);

module.exports = productRouter;


