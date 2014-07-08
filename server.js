var express = require('express'),
product = require('./model/products');
 
var app = express();

app.get('/products',product.getAllProducts);
// app.post('/products',product.addProduct);
app.get('/products/:id',product.getProductById);

app.listen(3000);
console.log("Listening on port 3000...");