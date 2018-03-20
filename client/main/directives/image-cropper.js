angular.module('main').directive('imagecropper', function ($rootScope) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        cropWidth: '=cropWidth',
        cropHeight: '=cropHeight',
        image:"=image",
        showSelector:"=",
        text:"@",
        uploadCallback:"="
      },
      templateUrl: '/main/directives/image-cropper.html',
      link : function($scope, element, attrs, fn) {

          var croppieLoaded = false;
          $scope.bucket = {};
          $rootScope.$on('image',function(event,data){
              if(!croppieLoaded){
                 var image = element.find('.image')[0];
                 image.src = data;
                 initializeCroppie(data);
              }
          });

          
          function initializeCroppie(imageData){
            var image = element.find('.image')[0];
            var temp = new Image();
            temp.src = imageData;
            temp.onload = function() {
                if(this.width === 1024 && this.height === 1024){
                    var basic = $(image).croppie({
                        viewport: {
                            width: $scope.cropWidth,
                            height:$scope.cropHeight
                        },
                        enableZoom:false
                    });
                    basic.croppie('bind', {
                        url:  imageData
                   });
                //on button click
                $scope.onCropClick = function(){
                    if(!$scope.bucket.imageHidden){
                    basic.croppie('result', 'base64').then(function(html) {
                        // html is div (overflow hidden)
                        // with img positioned inside.
                        $scope.bucket.imageData ={image:html,width:$scope.cropWidth,height:$scope.cropHeight};
                        element.find(".output img")[0].src = (html);
                    });
                }
                $scope.bucket.imageHidden = !$scope.bucket.imageHidden;
                } 
                $scope.bucket.imageSizeError = null;
                $scope.$apply();


            }
            else{
                console.log("WEFWEFWEFwefwe");
                $scope.bucket.imageSizeError = "Please upload an image of 1024X1024 pixel";
                $scope.$apply();
            }
        }
          }
        $scope.triggerUploadClick = function ($event) {
        const target = $event.target;
        const formContainer = element.find('.uploadForm');
        const inputEle = formContainer.find('.uploader').trigger('click');
        formContainer.find('.uploader').on('change', function () {
          $scope.fileCount = inputEle[0].files.length;
          $scope.$apply();
          $scope.loading = true;
          if (inputEle[0].files && inputEle[0].files[0]) {
            const reader = new FileReader();
            reader.addEventListener("load", function (e) {
                element.find('.logoElement').attr('src', e);
                var image = element.find('.image')[0];
                image.src = e.target.result;
                //var temp = new Image();
               // temp.src = e.target.result;
                $scope.image = image.src;
                croppieLoaded = true;
                $rootScope.$broadcast("image",image.src);
                initializeCroppie(image.src);
                
            
            })
            reader.readAsDataURL(inputEle[0].files[0]);

            
              $scope.savingLogo = false;

          }
          angular.element(this).off('change');
        });
      };
    }
      }
    });
  