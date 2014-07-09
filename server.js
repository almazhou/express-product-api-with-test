var express = require('express'),
Product = require('./model/products');
Pricing = require('./model/pricings');
var app = express();

app.use(express.bodyParser());

app.get('/products',Product.getAllProducts);
app.post('/products',Product.addProduct);
app.get('/products/:id',Product.getProductById);
app.get('/products/:id/pricings',Product.getAllPricings);
app.post('/products/:id/pricings',Product.addPricingToProduct);
app.get('/products/:id/pricings/:pricingId',Product.getPricingById);
app.listen(3000);
console.log("Listening on port 3000...");