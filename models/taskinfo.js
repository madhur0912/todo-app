var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskInfo = mongoose.Schema({

     isactive:{type:Boolean}, 
     taskobject:{type:String}, 
     taskdetails:{type:String}, 
     iscompleted:{type:Boolean}

    },{ _id :true,// false
     });


    var TaskInfo = mongoose.model('TaskInfo', taskInfo);
    module.exports.TaskInfo = TaskInfo;
    module.exports.TaskInfoSchema = taskInfo;


