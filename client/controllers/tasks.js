var myApp = angular.module("myApp");

myApp.controller('TasksController', ['$scope', '$http','$location','$routeParams', function($scope, $http,$location, $routeParams){
	console.log('Task Controller Initialized...');

	$scope.getTasks = function(){
		$http.get('/api/taskdb').success(function(response){
			$scope.tasks = response;
		});
	}

	$scope.getTask = function(){
		var id = $routeParams.id;
		$http.get('/api/tasks/'+id).success(function(response){
			$scope.task = response;
		});
	}


	$scope.addTask = function(){
		$http.post('/api/tasks',$scope.task).success(function(response){
			window.location.href='/#tasks';
		});
	}


	$scope.deleteTask = function(id){
		$http.delete('/api/tasks/'+id).success(function(response){
			window.location.href='/#tasks';
		});
	}
}]);