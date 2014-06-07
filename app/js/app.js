(function(){
	var app = angular.module('bessemer', ['ngRoute']);
	var serverUrl = "http://bessemerallianceshopper.herokuapp.com/lists";
	var apiKey = "3bb0528a-b467-46d2-affd-4ad6e9023d80";

	app.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/lists', {templateUrl: 'partials/lists.html', controller: 'ListsCtrl'});
		$routeProvider.when('/lists/:listId', {templateUrl: 'partials/items.html', controller: 'ItemsCtrl'});
		$routeProvider.when('/lists/:listId/items/:itemId', {templateUrl: 'partials/item.html', controller: 'ItemCtrl'});
		$routeProvider.otherwise({redirectTo: '/lists'});
	}]);

	app.controller('ListsCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
		$scope.lists = account;

		$scope.newList = {};

		$scope.addList = function() {
			this.newList.items = [];
			this.lists.push(this.newList);

			// Preview becomes blank
			this.newList = {};
		}

		$scope.deleteList = function(index) {
			this.lists.splice(index,1);
		}

		$scope.go = function(path) {
			$location.path(path);
		}
	}]);

	app.controller('ItemsCtrl', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location){
		$scope.items = account[$routeParams.listId].items;

		$scope.newItem = {};

		$scope.addItem = function() {
			this.items.push(this.newItem);

			// Preview becomes blank
			this.newItem = {};
		}

		$scope.deleteItem = function(index) {
			this.items.splice(index,1);
		}

		$scope.go = function(path) {
			$location.path('/lists/'+$routeParams.listId+path);
		}
	}]);

	app.controller('ItemCtrl', ['$scope', '$routeParams', function($scope, $routeParams){
		$scope.item = account[$routeParams.listId].items[$routeParams.itemId];

	}]);

	////////////////////////////////////
	// CURRENTLY FOR TESTING PURPOSE  //
	////////////////////////////////////
	var account = [{
		name: "List1",
		items: [{
			name: "Item1 - List1",
			amount: 1
		}
		]
	}, {
		name: "List2",
		items: [{
			name: "Item1 - List2",
			amount: 3
		}
		]
	},{
		name: "List3",
		items: []
	}
	]
})();