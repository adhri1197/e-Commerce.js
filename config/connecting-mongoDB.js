const mongoose = require('mongoose');

mongoose
.connect("mongodb://localhost:27017/potlistore")
.then(function(){
console.log("Connected to MongoDB successfully");
})

.catch(function(err){
    console.log(err)
})

module.exports = mongoose.connection;
