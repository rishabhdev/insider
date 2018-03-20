angular.module('main').controller('MainCtrl',function($scope, $http,$state){
    $scope.bucket = {};
    $scope.bucket.showSelector = true;
    $scope.submitUsername = function() {
        if($scope.bucket.username){
            $scope.bucket.usernameEntered = true;
            $http({
                method:"GET",
                url:"http://localhost:9000/images",
                params:{user:$scope.bucket.username}
            })
            .then(function(result){
                 $scope.images = result.data;
            })
        }
    }
    $scope.uploadImages = function(imageData){
        if(imageData && imageData.image){
            var uploadData = {};
            uploadData.image = imageData.image;
            uploadData.width = imageData.width;
            uploadData.height = imageData.height;
            uploadData.user = $scope.bucket.username;
                $http({
                    method:"POST",
                    url:"http://localhost:9000/images",
                    data:uploadData
                })
                .then(function(res){

                })
        }
    }
    $scope.reload = function(){
        $state.reload();
    }

});