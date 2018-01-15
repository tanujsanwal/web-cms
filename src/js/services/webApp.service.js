(function (window, angular) {
	var webAppService = angular.module('webApp.service', [])
	// service for set and get user data and current user data
	webAppService.factory("localStorage",['$window',function($window){
		return {
			getCurrentUser:function(){
				var data = $window.localStorage.getItem('currentUser') ? JSON.parse($window.localStorage.getItem('currentUser')) :{};
				return data;
			},
			setCurrentUser:function(user){
				var data = JSON.stringify(user);
				$window.localStorage.setItem('currentUser',data);
			},
			getUserData:function(){
				var data = JSON.parse($window.localStorage.getItem('userData'));
				return data;
			},
			setUserData:function(user){
				var data = $window.localStorage.getItem('userData') ? JSON.parse($window.localStorage.getItem('userData')):[];
				data.push(user);
				data = JSON.stringify(data);
				$window.localStorage.setItem('userData',data);
			}
		};
	}])
}(window, angular));