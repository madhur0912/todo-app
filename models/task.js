var mongoose = require('mongoose');
var TaskInfoSchema = require("./taskinfo.js").TaskInfoSchema

var Schema = mongoose.Schema;

// Task schema
var taskSchema = mongoose.Schema({

 tasktype    : {type: String},
 createdon   : {type: Date, default: Date.now},
 updatedon   : {type: Date},
 taskinfo  : [TaskInfoSchema]  

});
module.exports = mongoose.model('Task', taskSchema); 

taskSchema.pre('save',function(next){
  this.updatedon = new Date()
  next();
});
