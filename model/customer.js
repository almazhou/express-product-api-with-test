var mongoose = require('mongoose');

var Schema = mongoose.Schema;  
var Customer = new Schema({  
  name: { type: String, required: true },  
  modified: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Customer', Customer);
