var express = require("express");
var CustomerModel = require("../model/customer");

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

var customerRouter = express.Router();

customerRouter.route("/").get(getAllCustomers);

customerRouter.route("/:id").get(getCustomerById);

module.exports = customerRouter;