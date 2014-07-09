var express = require("express");
var CustomerModel = require("../model/customer");
var OrderModel = require("../model/order");

var getAllCustomers = function (req,res){
	CustomerModel.find(function (err, customers) {
		if (!err) {
			if(customers.length === 0){
				return res.send(404);
			}
			return res.send(customers);
		} else {
			return console.log(err);
		}
	});
}

var getCustomerById = function (req,res){
	CustomerModel.findById(req.params.id,function(err,customer){
		if (!err) {
			if(!customer){
				return res.send(404);
			}
			return res.send(customer);
		} else {
			return res.send(500);
		}
	});
}

var addCustomer = function(req,res){
	var customer = new CustomerModel({name:req.body.name});
	customer.save(function (err,req,res){
		if (err) {
			return res.send(500);
		} 
	});
	res.location("/customers/"+customer._id);
    return res.send(201);
}

var getAllOrders = function(req,res){
	OrderModel.find({customer: req.params.id},function(err,orders){
		if(!err){
			if(orders.length !== 0){
				return res.send(orders);
			}
			return res.send(404);
		}else{
			return res.send(500);
		}
	});
}

var customerRouter = express.Router();

customerRouter.route("/").get(getAllCustomers).post(addCustomer);

customerRouter.route("/:id").get(getCustomerById);

customerRouter.route("/:id/orders").get(getAllOrders);
module.exports = customerRouter;