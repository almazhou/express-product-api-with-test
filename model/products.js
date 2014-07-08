var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/product-api');

var Schema = mongoose.Schema;  
var Product = new Schema({  
    name: { type: String, required: true },  
    product_id: { type: Number, required: true },  
    modified: { type: Date, default: Date.now }
});
var ProductModel = mongoose.model('Product', Product);

exports.getSchema = function(){
  return Product;
};

exports.getAllProducts = function(req,res){
	ProductModel.find(function (err, products) {
    if (!err) {
      return res.send(products);
    } else {
      return console.log(err);
    }
  });
};

exports.addProduct = function(req,res){
  var product;
  console.log("POST: ");
  console.log(req.body);
  product = new ProductModel({
    name: req.body.name,
    product_id: req.body.product_id
  });
  product.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(product);
};
exports.getProductId = function(res,req){
  ProductModel.findById(req.params.product_id, function (err, product) {
    if (!err) {
      return res.send(product);
    } else {
      return console.log(err);
    }
  });
};

