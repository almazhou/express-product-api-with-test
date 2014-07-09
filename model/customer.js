var mongoose = require('mongoose');

var Schema = mongoose.Schema;  
var Customer = new Schema({  
  name: { type: String, required: true },  
  orders :[{type:Schema.Types.ObjectId,ref:'Order'}],
  modified: { type: Date, default: Date.now }
});

Customer.methods.placeOrder = function (order,callback){
	var customer = this;
	this.orders.push(order);
	this.save(function(err){
		if(!err){
			order.customer = customer;
			order.save(callback);
		}else{
			console.log("error placing order");
		}
	});

}

module.exports = mongoose.model('Customer', Customer);
