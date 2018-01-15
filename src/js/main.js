(function (window, angular) {
	'use strict';
	
	var filePath = 'dist/views/';
	var cmsWebApp = angular.module('web-cms',[
		'ui.router',
		'login.controllers',
		'signup.controllers',
		'home.controllers',
		'webApp.service',
		'webApp.directive'
		]);

	// Web page routes login, signup, home
	cmsWebApp.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
		$stateProvider
		.state('login',{
			url:'/login',
			templateUrl: filePath + 'login.html',
			controller: "loginController"
		})
		.state('signup',{
			url:'/signup',
			templateUrl: filePath + 'signup.html',
			controller: "signupController"
		})
		.state('home',{
			url:'/home/:username',
			templateUrl: filePath + 'home.html',
			controller: "homeController",
			onEnter:function(localStorage,$state){
				var currentUser = localStorage.getCurrentUser();
				console.log("current user",currentUser);
				if(!currentUser.email){
					$state.go('login');
				}
			}
		})
		$urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go('login');
        });
	}])

	// for setting current user details in root scope
	cmsWebApp.run(['$rootScope',"$window",'localStorage',function($rootScope,$window,localStorage){
		$rootScope.currenUser = localStorage.getCurrentUser();
	}])
}(window, angular));	