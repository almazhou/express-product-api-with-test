var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser());
Product = require('./routes/products');

router.route('/products').get(Product.getAllProducts)
.post(Product.addProduct);

router.route('/products/:id').get(Product.getProductById);

router.route('/products/:id/pricings').get(Product.getAllPricings)
.post(Product.addPricingToProduct);

router.route('/products/:id/pricings/:pricingId').get(Product.getPricingById);

app.use("/",router);


app.listen(3000);
console.log("Listening on port 3000...");