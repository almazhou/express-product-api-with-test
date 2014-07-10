var express = require("express");
var CustomerModel = require("../model/customer");
var OrderModel = require("../model/order");
var PaymentModel = require("../model/payment");

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
		}
		return res.send(500);
	});
}

var getOrderById = function (req,res){
	OrderModel.findOne({customer: req.params.id, _id: req.params.orderId},function(err,order){
		if(!err){
			if(order){
				return res.send(order);
			}
			return res.send(404);
		}
		return res.send(500);
	});
}

var placeOrder = function (req,res){
	var order = new OrderModel({totalCost: req.body.totalCost});
	CustomerModel.findById(req.params.id,function (err,customer){
		if(!err){
			if(customer){
				customer.placeOrder(order);
				res.location("/customers/" + customer._id + "/orders/" + order._id);
				return res.send(201);
			}
			return res.send(404);
		}
		return res.send(500);
	});
}

var getPaymentOfOrder = function (req,res){
	PaymentModel.findOne({customer:req.params.id, order:req.params.orderId},function (err,payment){
		if(!err){
			if(payment){
				return res.send(payment);
			}
			return res.send(404);
		}
		return res.send(500);
	});
}

var payMoney = function (req,res){
	var payment = new PaymentModel({amount : req.body.amount});
	OrderModel.findOne({customer: req.params.id, _id : req.params.orderId}, function (err, order){
		if(!err){
			if(order){
				order.pay(payment);
				res.location("/customers/"+ req.params.id + "/orders/" + order._id + "/payment");
				return res.send(201);
			}
			return res.send(404);
		}
		return res.send(500);
	});	

}

var customerRouter = express.Router();

customerRouter.route("/").get(getAllCustomers).post(addCustomer);

customerRouter.route("/:id").get(getCustomerById);

customerRouter.route("/:id/orders").get(getAllOrders).post(placeOrder);

customerRouter.route("/:id/orders/:orderId").get(getOrderById);

customerRouter.route("/:id/orders/:orderId/payment").get(getPaymentOfOrder).post(payMoney);

module.exports = customerRouter;