var request = require('supertest'),
should = require('should');
var app = require("../server");
var mongoose = require("mongoose");
var mockgoose = require("mockgoose");
mockgoose(mongoose);

var Customer = mongoose.model("Customer");
var Order = mongoose.model("Order");
request = request("http://localhost:3000");

describe("/GET",function(){
	beforeEach(function(done){
		mockgoose.reset();

		order = new Order({totalCost:45});
		order.save();

		customer = new Customer({name:"test"});
		customer.save();

		customer.placeOrder(order,done);
	});

	it("should return 200 for get all orders",function(done){
		request
		.get("/customers/" + customer._id + "/orders")
		.expect(200,function (err,res){
			var orderJson = res.body[0];
			orderJson.should.have.property("totalCost","45");
			done();
		});
	});

	it("should return 200 for get one order success",function(done){
		request
		.get("/customers/" + customer._id + "/orders/" +order._id)
		.expect(200,function (err,res){
			var orderJson = res.body;
			orderJson.should.have.property("totalCost","45");
			done();	
		});
	});

	it("should return 404 for get one order failed",function (done){
		request
		.get("/customers/" + customer._id + "/orders/" +"nosuchorderfoundinthismo")
		.expect(404,done);
	});

	afterEach(function(done){
		mockgoose.reset();
		done();
	});
});

describe("/POST",function(){
	beforeEach(function(done){
		mockgoose.reset();
		customer = new Customer({name:"test"});
		customer.save(done);
	});

	it("should return 201 when post one order",function(done){
		request
		.post("/customers/" + customer._id + "/orders")
		.send({totalCost:45})
		.expect(201,function(err,res){
			var location = res.header.location;
			location.should.containEql("/customers/" + customer._id + "/orders/");
			done();
		});
	});

	afterEach(function(done){
		mockgoose.reset();
		done();
	});
});