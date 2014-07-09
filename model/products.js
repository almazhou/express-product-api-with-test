var mongoose = require('mongoose');
var PricingModel = require("./pricings");

var Schema = mongoose.Schema;  
var Product = new Schema({  
  name: { type: String, required: true },  
  product_id: { type: Number, required: true },
  pricings:[{type:Schema.Types.ObjectId,ref:'Pricing'}],  
  modified: { type: Date, default: Date.now }
});

Product.methods.addPricing = function(pricing,callback){
  var product = this;
  this.pricings.push(pricing);
  this.save(function(err){
    pricing.product = product;
    pricing.save(callback);
  })
}

ProductModel = mongoose.model('Product', Product);

exports.getSchema = function(){
  return Product;
};

exports.getAllProducts = function(req,res){
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

exports.addProduct = function(req,res){
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
exports.getProductById = function(req,res){
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

exports.getAllPricings = function(req,res){
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

exports.getPricingById = function(req,res){
  console.log("I ame here now");
  PricingModel.findOne({_id:req.params.pricingId,product:req.params.id},function(err,pricing){
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

