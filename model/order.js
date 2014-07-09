mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Order = new Schema({
	customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
	payment: {type: Schema.Types.ObjectId, ref: 'Payment'},
	totalCost: {type: Number,require:true},
	modified: { type: Date, default: Date.now }
});

Order.methods.pay = function (payment,callback){
	var order = this;
	this.payment = payment;
	this.save(function(err){
		if(!err){
		payment.customer = order.customer;
		payment.order = order;
		payment.save(callback);
		}
		else { console.log("order payment error");}
	});
}

module.exports = mongoose.model("Order",Order);