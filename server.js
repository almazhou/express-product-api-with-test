var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());
productRouter = require('./routes/products');
customerRouter = require('./routes/customers');

app.use("/products",productRouter);
app.use("/customers",customerRouter);

app.listen(3000);
console.log("Listening on port 3000...");