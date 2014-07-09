var express = require('express'),
Product = require('./model/products');
Pricing = require('./model/pricings');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

app.use(bodyParser());

router.route('/products').get(Product.getAllProducts)
.post(Product.addProduct);

router.route('/products/:id').get(Product.getProductById);

router.route('/products/:id/pricings').get(Product.getAllPricings)
.post(Product.addPricingToProduct);

router.route('/products/:id/pricings/:pricingId').get(Product.getPricingById);

app.use("/",router);


app.listen(3000);
console.log("Listening on port 3000...");