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

var customerRouter = express.Router();
customerRouter.route("/").get(getAllCustomers);
module.exports = customerRouter;