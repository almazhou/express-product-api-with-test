var request = require('supertest'),
should = require('should');
var product = require('../model/products');
var app = require("../server");
var mongoose = require("mongoose");
var product_schema = product.getSchema();
var ProductModel = mongoose.model("Product",product_schema);

request1 = request('http://localhost:3000');
describe('GET /products or /prducts/:id', function(){
    product_new = null;
    beforeEach(function (done) {
      ProductModel.remove().exec();
      product_new = new ProductModel({name:"test",product_id:2});
      product_new.save(done);
  });

    it('should respond with 200 for get all products', function(done){
        request1
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
        request1
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

    it('returns 404 for get id failed', function(done){
        request1
        .get('/products/'+"53bb642a19cb742d22b8b9d4")
        .set('Accept', 'application/json')
        .expect(404,done);
    });
});
describe('GET /products failed', function(){
    beforeEach(function (done) {
        ProductModel.remove().exec(done);
    });
    it('should respond with 404 for get all products', function(done){
        request1
        .get('/products/')
        .expect(404,done);
    });
});

describe('POST /products successful', function(){
    beforeEach(function (done) {
        ProductModel.remove().exec(done);
    });
    it('should return 201 for post successfully', function(done){
        request1
        .post('/products')
        .send({name:"testName",
            product_id:4})
        .expect(201,done);
    });
});


