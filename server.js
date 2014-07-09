var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());
Customer = require('./routes/customers');
productRouter = require('./routes/products');


app.use("/products",productRouter);
// app.use("/orders",orders);

app.listen(3000);
console.log("Listening on port 3000...");