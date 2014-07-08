var mongoose = require('mongoose');

var Schema = mongoose.Schema;  
var Pricing = new Schema({  
  product: {type: Schema.Types.ObjectId, ref: 'Product'}, 
  amount:{type:Number,require:true}, 
  modified: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Pricing', Pricing);
