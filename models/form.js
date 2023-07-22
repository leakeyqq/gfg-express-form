var mongoose = require('mongoose');

//Schema
var formSchema = mongoose.Schema({
    username: String,
    email: String
});
module.exports = mongoose.model("Form", formSchema);