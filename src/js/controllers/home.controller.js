(function (window,angular) {
	// home controller
	var homeControllers = angular.module('home.controllers', [])
	homeControllers.controller("homeController",['$scope','$rootScope','$window','$state','$compile',function($scope,$rootScope,$window,$state,$compile){
		$scope.currentUser = $rootScope.currentUser;
		$scope.createCode = '';
		$scope.count = 0;
		// logout function
		$scope.logout = function(){
			$window.localStorage.removeItem('currentUser');
			$rootScope.currentUser = {};
			$state.go('login');

		}
		// showHtmlCode function to create html code
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