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

describe("/GET and /POST payment", function(){
	beforeEach(function(done){
		mockgoose.reset();
		customer = new Customer({name:"test"});
		customer.save();

		order = new Order({totalCost: 45});
		order.save();

		order2 = new Order({totalCost: 45});
		order2.save();

		payment = new Payment({amount: 45});
		payment.save();

		customer.placeOrder(order);
		customer.placeOrder(order2);

		order.pay(payment);

		done();
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

	it("should return 201 for post payment for order",function (done){
		request
		.post("/customers/" + customer._id + "/orders/" + order._id + "/payment")
		.send({amount:56})
		.expect(201, function(err,res){
			var location = res.header.location;

			location.should.containEql("/customers/" + customer._id + "/orders/" + order._id + "/payment");

			done();
		});
	});


	afterEach(function(done){
		mockgoose.reset();
		done();
	});
});