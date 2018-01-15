(function (window, angular) {
	var signupControllers = angular.module('signup.controllers', [])
	// for signup 
	signupControllers.controller("signupController",['$scope','$rootScope','$window','localStorage','$state',function($scope,$rootScope,$window,localStorage,$state){
		$scope.user = {};
		$scope.errorMsg = '';
		$scope.signupFunction =function(){
			var userList = localStorage.getUserData();
			var counter = 0;
			angular.forEach(userList,function(list){
				if(list.email == $scope.user.email){
					counter ++;
				}
			})
			if(counter > 0){
				$scope.errorMsg = 'Email already Exist.'
			}
			else{
				localStorage.setUserData($scope.user);
				$state.go('login');	
			}
		}

	}]);
}(window,angular));