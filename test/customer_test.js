var request = require('supertest'),
should = require('should');
var app = require("../server");
var mongoose = require("mongoose");
var mockgoose = require("mockgoose");
mockgoose(mongoose);

var Customer = mongoose.model("Customer");
request = request("http://localhost:3000");
describe("/GET",function(){
	beforeEach(function(done){
		order = new Customer({name:"test"});
		order.save(done);
	});
	it("should return 200 when get all customer",function(done){
		request
		.get("/customers")
		.expect(200,function(err,res){
			var customer = res.body[0];
			customer.should.have.property("name","test");
			customer.should.have.property("_id",String(customer._id));
			done();
		});
	});
	afterEach(function(done){
		mockgoose.reset();
		done();
	});
});