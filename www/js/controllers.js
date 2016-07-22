var fb = new Firebase("https://firearm.firebaseio.com/");

angular.module('controllers', [])



.controller('LoginCtrl', function($scope, $state, $http, $ionicPopup, $ionicPlatform, $firebaseAuth) {


    var fbAuth = $firebaseAuth(fb);

    $scope.login = function(username, password) {
        fbAuth.$authWithPassword({
            email: username,
            password: password
        }).then(function(authData) {
            $state.go("home");
        }).catch(function(error) {
                       var alertPopup = $ionicPopup.alert({
                             title: 'Acceso Incorrecto',
                             template: 'Revise su usuario o contraseña'
                        });
        });
    }

})

.controller('HomeCtrl', function($scope, $http, $ionicPopover, $ionicLoading, $ionicHistory) {

 $ionicPopover.fromTemplateUrl('templates/popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;

    });

    $scope.closePopover = function() {
          
           $scope.popover.hide();

    };

   $scope.myGo = function(){
      $ionicHistory.goBack();
   }

  $scope.load = function(){

     $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });

       $http.get('http://tureparto.com/wp/wp-json/wp/v2/categories')
          .then(
            function(response){
                  //  alert("entro aqui");

                          $scope.cat = response.data;

                $http.get('http://tureparto.com/wp/wp-json/wp/v2/media')
                  .then(
                    function(resp){

                        $scope.media = resp.data;

                       
                       $scope.cakeOptions = [];


                          angular.forEach($scope.cat, function (value) {

                             var cat_slug = value.slug;
                            
                             var cat_title = value.name;

                             var id= value.id;
                         
                            

                            angular.forEach($scope.media, function (value) {
                                var image_nom = value.title.rendered;
                                var image = value.guid.rendered;

                                //alert("aqui 2"+image_nom);

                                //alert(cat_slug);

                                if(image_nom == cat_slug){
                                   //   alert(cat_slug);    
                                   //   alert(image);
                                         $scope.cakeOptions.push({
                                            id: id,
                                            title: cat_title,
                                            img: image
                                       
                                         });
                                }
                              
                              
                               
                             
                            });
                        });

                        $ionicLoading.hide();
                    },
                    function(){
                         alert("error");
                    }
                );
               
           
            },
            function(){
                 alert("error");
            }
        );
    }
})

.filter('htmlToPlaintext', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
)


.controller('ListarCtrl', function($scope, $state, $http, $ionicPlatform, $stateParams,  $ionicLoading,  $ionicPopover,  $ionicHistory) {


  var id = $stateParams.id;

  $scope.id = id;


 $ionicPopover.fromTemplateUrl('templates/popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;

    });

    $scope.closePopover = function() {
          
           $scope.popover.hide();

    };

   $scope.myGo = function(){
      $ionicHistory.goBack();
   }


  $scope.cargar = function(){

     $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
  

       $http.get('http://tureparto.com/wp/api/get_category_posts/?id='+$scope.id)
          .then(
            function(response){
               
                $scope.listado = response.data;
                $ionicLoading.hide();  
            },
            function(){
                 alert("error");
            }
        );

  }

})

//http://tureparto.com/wp/api/get_post/?id=49




.controller('DetalleCtrl', function($scope, $state, $http,  $ionicPopover, $ionicPlatform, $stateParams, $ionicLoading,  $ionicHistory) {

  var id_detalle = $stateParams.id;

  $scope.id_detalle = id_detalle;


 $ionicPopover.fromTemplateUrl('templates/popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;

    });

    $scope.closePopover = function() {
          
           $scope.popover.hide();

    };

     $scope.myGo = function(){
      $ionicHistory.goBack();
   }


  $scope.ver_detalle = function(){
    
     

     $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
  

       $http.get('http://tureparto.com/wp/api/get_post/?id='+$scope.id_detalle)
          .then(
            function(response){
               
                $scope.detalle = response.data;
                        $ionicLoading.hide();   
            },
            function(){
                 alert("error");
            }
        );

  }


});


