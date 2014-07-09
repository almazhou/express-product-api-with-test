var request = require('supertest'),
should = require('should');
var app = require("../server");
var mongoose = require("mongoose");
var mockgoose = require("mockgoose");
mockgoose(mongoose);

var Customer = mongoose.model("Customer");
var Order = mongoose.model("Order");
var Payment = mongoose.model("Payment");
request = request("http://localhost:3000");

describe("/GET payment", function(){
	beforeEach(function(done){
		mockgoose.reset();
		customer = new Customer({name:"test"});
		customer.save();

		order = new Order({totalCost: 45});
		order.save();

		payment = new Payment({amount: 45});
		payment.save();

		customer.placeOrder(order,done);

		order.pay(payment);
	});

	it("should return 200 for get payment of order",function (done){
		request
		.get("/customers/" + customer._id + "/orders/" + order._id + "/payment")
		.expect(200,function (err,res){
			var paymentJson = res.body;
			paymentJson.should.have.property("amount",45);
			done();
		});
	});

	afterEach(function(done){
		mockgoose.reset();
		done();
	});
});