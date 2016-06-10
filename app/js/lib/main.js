var app = angular.module('sampleApp',['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
		templateUrl: 'html/login.html',
		controller: 'loginController'
	}).
      when('/account', {
		templateUrl: 'html/myAccount.html',
		controller: 'myAccounrtController'
      }).
      otherwise({
		redirectTo: '/login'
      });
}]);

app.controller('loginController', function($scope,$http,$location){
		$scope.message = '';
			$scope.email = 'amitavkaushik@gmail.com';
	$scope.password = 'something';
	$scope.goNextFunc = function(){
		 $http({
        method : "POST",
        url : "http://localhost:8080/SpringNodeApp/authenticate",
        data : { "emailId": $scope.email, "password": $scope.password }

    }).then(function mySucces(response) {
        $scope.message = response;
        if(response.data.status){
       		//$location.path("/account");
       	}else{
       		$scope.message = response.data.errorCode + ' : ' + response.data.errorMessage;
       	}
    }, function myError(response) {
        $scope.message = response.statusText;
    });
	};

})

app.controller('myAccounrtController', function($scope) {
	$scope.message = 'Welcome to account page';


	
});
