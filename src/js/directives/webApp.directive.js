(function (window,angular) {
	var webAppDirective = angular.module('webApp.directive', [])
	// Drag and Drop Directive
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
				// change edit mode function
				$scope.changeEditMode = function(){
					$scope.isEditable = !$scope.isEditable;
					if($scope.isEditable){
						$scope.setData();
					}
				}
				// set data function 
				$scope.setData = function(){
					angular.forEach($scope.shownData,function(value,key){
						$scope.data[key] = value;
					})
				}
				// Update content function
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