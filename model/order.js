mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Order = new Schema({
	customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
	totalCost: {type: Number,require:true},
	modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order",Order);