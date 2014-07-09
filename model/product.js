var mongoose = require('mongoose');

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

module.exports = mongoose.model('Product', Product);

