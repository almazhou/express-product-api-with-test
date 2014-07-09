var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Payment = new Schema({
	customer : { type : Schema.Types.ObjectId, ref:'Customer'},
	order : {type : Schema.Types.ObjectId, ref:'Order'},
	amount : {type : Number, require : true},
	modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', Payment);