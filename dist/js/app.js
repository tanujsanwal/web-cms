(function (window, angular) {
	'use strict';

		var filePath = 'web-cms/dist/views/';
	var cmsWebApp = angular.module('web-cms',[
		'ui.router',
		'login.controllers',
		'signup.controllers',
		'home.controllers',
		'webApp.service',
		'webApp.directive'
		]);

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

	cmsWebApp.run(['$rootScope',"$window",'localStorage',function($rootScope,$window,localStorage){
		$rootScope.currenUser = localStorage.getCurrentUser();
	}])
}(window, angular));	
(function (window,angular) {
	var homeControllers = angular.module('home.controllers', [])
	homeControllers.controller("homeController",['$scope','$rootScope','$window','$state','$compile',function($scope,$rootScope,$window,$state,$compile){
		$scope.currentUser = $rootScope.currentUser;
		$scope.createCode = '';
		$scope.count = 0;
		$scope.logout = function(){
			$window.localStorage.removeItem('currentUser');
			$rootScope.currentUser = {};
			$state.go('login');

		}
		$scope.showHtmlCode = function(){
				$scope.createCode = angular.element('#action-code').html();
				$scope.createCode = $scope.createCode.replace(/<!--(?!>)[\S\s]*?-->/gm,'');
				$('#getCodeModal').modal('show');
		}

		$('.draggable-header').draggable({
	        revert: false,
	        helper: "clone",
	        cursor: "move", 
	        revertDuration:0
    	})
		$( "#action" ).droppable({
			accept:('.draggable-header'),
			drop: function( event, ui ) {
				var item = $(ui.draggable).clone();
				var type = $(ui.draggable)[0].dataset['type'];

				item.empty();
				item.removeClass();
				item.addClass('droped-item draggable resizable')
				item.css({"margin-top":"10px","border":"4px dotted #ececec"});

								item.draggable({
					containment: "#action"
				});
				item.resizable({
    				containment: "#action"
				});
				var directiveText = "<div style='width:100%;height: 100%;' drag-drop-template type=" + type + "></div>";
				var comiledElement = $compile(directiveText)($scope);
				$scope.count ++;
				item.append(comiledElement);

				angular.element('#action').append(item);
			}
	    })
	}]);
}(window,angular));
(function(window,angular, undefined){
	var loginControllers = angular.module('login.controllers', [])
	loginControllers.controller("loginController",['$scope','$rootScope','$window','localStorage','$state', function($scope,$rootScope,$window,localStorage,$state){
		$scope.user = {};
		$scope.errorMsg = '';
		$scope.validateUser = function(){

		}
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
(function (window, angular) {
	var signupControllers = angular.module('signup.controllers', [])
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
(function (window,angular) {
	var webAppDirective = angular.module('webApp.directive', [])
	webAppDirective.directive("dragDropTemplate",function(){
		return {
			restrict:'A',
			scope:{
				type:'@'
			}, 
			templateUrl:'dist/views/contentTemplate.html',
			controller:['$scope','$window',function($scope,$window){
				$scope.isEditable = false;
				$scope.shownData = {
					link : "https://tanzo.io/",
					linkText : "Enter your link Text",
					paragraph : "Add a paragraph",
					imageUrl : "http://asvs.in/wp-content/uploads/2017/08/dummy.png",
					header1 : "Heading 1",
					header2 : "Heading 2",
					header3 : "Heading 3",	
				}

				$scope.data = {};
				$scope.changeEditMode = function(){
					$scope.isEditable = !$scope.isEditable;
					if($scope.isEditable){
						$scope.setData();
					}
				}
				$scope.setData = function(){
					angular.forEach($scope.shownData,function(value,key){
						$scope.data[key] = value;
					})
				}
				$scope.updateContent = function(){
					switch($scope.type){
						case 'link':  $scope.shownData.link = $scope.data.link;
									  $scope.shownData.linkText = $scope.data.linkText;		
									  break;
						case 'paragraph': $scope.shownData.paragraph = $scope.data.paragraph;
										break;
						case 'image':   $scope.shownData.imageUrl = $scope.data.imageUrl;
										break;
						case 'header1':  $scope.shownData.header1 = $scope.data.header1;
										break;
						case 'header2':  $scope.shownData.header2 = $scope.data.header2;
										break;
						case 'header3':  $scope.shownData.header3 = $scope.data.header3;
										break;
						default : console.log("Cant find your option please select from link, paragraph, image, header");		
					}
					$scope.data ={};
					$scope.isEditable =false;
				}
			}]
		}
	})
}(window,angular));
(function (window, angular) {
	var webAppService = angular.module('webApp.service', [])
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