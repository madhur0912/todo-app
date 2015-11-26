var TaskInfo = require('../models/taskinfo.js').TaskInfo;
var Task = require('../models/task.js');
var config = require('../config');
module.exports = function (app, express) {

		var api = express.Router();

		//GET method is for fetching all the tasks from the database,
		api.get('/taskdb', function (req, res) {

				//console.log("____");

				Task.find({}, function (err, taskdb) {

						if (err) {
								res.send(err);
								return;
						}
						res.json(taskdb);
				});
		});


		//POST method is for saving all the tasks to the database,
		api.post('/tasks', function (req, res) {
			var task = {};
			task.tasktype = req.body.tasktype;

			var taskObj = new Task(task);
			taskObj.taskinfo = req.body.taskInfo;

			taskObj.save(function (err) {
				if (err) {
					res.send(err);
					return;
				}
				res.json({
					message: 'Task has been created'
				})

			});
		});


		api.use('/tasks/:taskId',function(req, res, next){

			Task.findById(req.params.taskId, function(err, task){
				
				if(err){
					 res.send(err);
				return;
							 }
				else if(task)
				{
					req.task = task;
					next();
				}
				else
				{
				res.status(404).send ('no task found with such details');
				}
				});
		});





//put restful api- to edit a task
api.put ('/tasks/:taskId',function(req,res){
								 
var task = {};
				req.task.tasktype = req.body.tasktype;

				req.task.taskinfo = [];
				for (var i = 0; i < req.body.taskInfo.length; i++) {
						console.log(i);
						var taskInfo = new TaskInfo(req.body.taskInfo[i]);
						req.task.taskinfo.push(taskInfo);
				}
			 


				req.task.save('next',function(err){
				if(err){
					 res.send(err);
				return;
				}
			 res.json({message:'User info updated successfully'})
			 
		});      

});

//put ends here

//Task deletion is working fine 

api.delete ('/tasks/:taskId',function(req,res){
			 req.task.remove(function(err){
				if(err){
					 res.send(err);
				return;
				}
			 res.json({message:'Task has been deleted'})
	});
		 });

api.get('/tasks/:taskId',function(req, res){
				
			 res.json(req.task);
		});

/*
// api to find all tasks
api.get('/taskinfodb', function (req, res) {

				console.log("____");

				TaskInfo.find({}, function (err, taskinfodb) {

						if (err) {
								res.send(err);
								return;
						}
						res.json(taskinfodb);
				});
		});


api.use('/taskinfodb/:taskinfoId', function (req, res) {

				//console.log("____");

				TaskInfo.findById(req.params.taskinfoId, function (err, taskinfo) {

						if (err) {
								res.send(err);
								return;
							}
								else if(taskinfo)
								{
									req.taskinfo = taskinfo;
									next();
								}
						else
						{
							res.status(404).send ('no taskinfo found');
						}
									
				});
		});
api.get('/tasksinofdb/:taskinfoId',function(req, res){
				
			 res.json(req.taskinfo);
		});

*/


		return api
}