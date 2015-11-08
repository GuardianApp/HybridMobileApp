angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPopup){

  $ionicLoading.show({
    template: 'Espere...'
  });

  $scope.triggerPanicControl = function(){
      alert('simone');
  }


  $scope.$on('mapInitialized', function(event, map) {
    $scope.map = map;

    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation.getCurrentPosition(posOptions)
    .then(function (position) {
      console.log( position );
      $ionicLoading.hide();
      map.setCenter( { 'lat' : position.coords.latitude, 'lng' : position.coords.longitude } );
      var marker = new google.maps.Marker({
        position: { 'lat' : position.coords.latitude, 'lng' : position.coords.longitude },
        map: map,
        title: 'Hello World!'
      });


    }, function(err) {
      // error
      $ionicLoading.hide();
      if( JSON.stringify(err) === '{}' ){
        $ionicPopup.alert({
         title: 'Error GPS',
         template: 'Parece que su dispositvo tiene apagado el GPS. Actívelo para continuar'
       });
      }else{
        alert('GEO GET --> ' + JSON.stringify(err));
      }
    });

  });

})


.controller('DenunciasCtrl', function($scope){
  

})

.controller('AccountCtrl', function($scope) {

  $scope.settings = {
    enableFriends: true
  };
});
