var request = require('supertest'),
should = require('should');
var product = require('../model/products');
var app = require("../server");
var mongoose = require("mongoose");
var product_schema = product.getSchema();
var ProductModel = mongoose.model("Product",product_schema);

request = request('http://localhost:3000');
describe('GET /products', function(){
    product_new = null;
	beforeEach(function (done) {
		ProductModel.remove().exec();
        product_new = new ProductModel({name:"test",product_id:2});
        product_new.save(done);
        });

  it('should respond with 200 for get all products', function(done){
    request
    .get('/products/')
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err,response){
    	if(err){
    		done(err);
    	}
    	var product = response.body[0]
        product.should.have.property("name","test");
    	product.should.have.property("product_id","2");
    	done();
    });
  });



  it('should respond with 200 for get one product with id', function(done){
    request
    .get('/products/'+product_new._id)
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err,response){
        if(err){
            done(err);
        }
        var product = response.body
        product.should.have.property("name","test");
        product.should.have.property("product_id","2");
        done();
    });
  });
});
describe('returns 404', function(){
    beforeEach(function (done) {
        ProductModel.remove().exec(done);
        });
  it('should respond with 404 for get all products', function(done){
    request
    .get('/products/')
    .expect(404,done);
  });
  });


