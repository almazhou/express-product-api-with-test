var request = require('supertest'),
should = require('should');
var app = require("../server");
var mongoose = require("mongoose");
var mockgoose = require("mockgoose");
mockgoose(mongoose);
Product = mongoose.model("Product");
Pricing = mongoose.model("Pricing");


request = request("http://localhost:3000");
describe("/GET all pricings",function(){
	beforeEach(function (done) {
      mockgoose.reset();
      pricing = new Pricing({amount:45.0});
      pricing.save();

      product_new = new Product({name:"test",product_id:2});
      product_new.save();

      product_new.addPricing(pricing,done);

  });

	it("should return 200 when success",function(done){
		request
		.get("/products/"+product_new._id+"/pricings")
		.expect(200,function(err,res){
      var body = res.body;
      body[0].should.equal(String(pricing._id));
      done();
    });
	});


  it("should return 200 when get specific pricing",function(done){
    request
    .get("/products/"+product_new._id+"/pricings/"+pricing._id)
    .expect(200,function(err,res){
      var body = res.body;
      body.should.have.property("amount","45");
      body.should.have.property("_id",String(pricing._id));
      body.should.have.property("product",String(product_new._id));
      done();
    });
  });

     afterEach(function (done) {
      mockgoose.reset();
      done();
  });




});

describe("test 404",function(){
     beforeEach(function (done) {
      mockgoose.reset();
      done();
  });

    it("should return 404 when cannot find product",function(done){
    request
    .get("/products/"+product_new._id+"/pricings")
    .expect(404,done);
  });
})