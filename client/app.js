var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/',{
		controller: 'DashboardController',
		templateUrl: 'views/dashboard.html'
	})
	
	.when('/tasks',{
		controller: 'TasksController',
		templateUrl: 'views/tasks.html'
	})

	.when('/tasks/details/:id',{
		controller: 'TasksController',
		templateUrl: 'views/task_details.html'
	})
	
  	.when('/tasks/add', {
    	controller: 'TasksController',
    	templateUrl: 'views/add_task.html'
  	})
  	
	.when('/tasks/edit/:id',{
		controller: 'TasksController',
		templateUrl: 'views/edit_task.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});