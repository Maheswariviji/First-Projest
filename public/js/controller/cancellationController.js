'use strict';

module.exports = function($scope,$route,$http,$location) {
	 $scope.show = false;

$scope.getdetails=function(){
$scope.show = true;
$scope.id;
$scope.name;
console.log($scope.id);
console.log($scope.name);
$http.get('/bk/bk').success(function (response) {
	console.log(response);
	var i;
     try
    {
        for(i=0;i<=response.length;i++)
        {
          if(response[i].BookingID==$scope.id  && response[i].mName==$scope.name)
          {
          	 $scope.bklist = response[i];
          	 console.log($scope.bklist);
           $scope.bking = "";

}

}
alert("Please enter valid details");
}
 catch(e){}

         });
     };

$scope.cancel = function (id) {
        console.log(id);
        $http.delete('/bk/bk/' + id._id).success(function (response) {
            console.log(response);
            console.log('CANCELLED SUCCESSFULLY');
           alert("cancelled Successfully");
           $location.path('/home');
});
    };
};
