angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaGeolocation, $ionicLoading){

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

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true,
      familiares: false
    };
    $scope.familiartoggle = function() {
        if($scope.familiares){
            
        }else{
            
        }
        
     };
});
