(function(window,angular, undefined){
	// Login controller 
	var loginControllers = angular.module('login.controllers', [])
	loginControllers.controller("loginController",['$scope','$rootScope','$window','localStorage','$state', function($scope,$rootScope,$window,localStorage,$state){
		$scope.user = {};
		$scope.errorMsg = '';
		$scope.validateUser = function(){

		}
		// login function
		$scope.loginFn = function(){
			var userData = localStorage.getUserData();
			var login = false;
			if(userData){
				angular.forEach(userData,function(data){
					if(data.email == $scope.user.email){
						if(data.password == $scope.user.password){
							$rootScope.currentUser = data;
							localStorage.setCurrentUser(data);
							$state.go("home",{'username':data.name});
						}
						else{
							$scope.errorMsg = 'Invalid email or password';
						}
					}
					else{
						$scope.errorMsg = 'Please Signup First'
					}
					
				})
			}
			else{
				$scope.errorMsg = 'Please Signup First'
			}
		}
	}]);
}(window, window.angular));