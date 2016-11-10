 var app = angular.module('konnekt', ['ionic','ngCordova','ion-floating-menu']);


app.run(function($ionicPlatform,$cordovaBeacon) {


  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
       StatusBar.show();
    }

    $ionicPlatform.registerBackButtonAction(function(e){
      backAsHome.trigger(function(){
          console.log("Success Over riding Back as Home . . ");
      }, function(){
          console.log("Error Over riding Back as Home . . .");
      });
      e.preventDefault();
    },101);

    //Enable the app to autostart
    cordova.plugins.autoStart.enable();

    //Enable autostart Bluetooth
    $cordovaBeacon.enableBluetooth();

    //Disable autostart Bluetooth
    //$cordovaBeacon.disableBluetooth();

  });

});
