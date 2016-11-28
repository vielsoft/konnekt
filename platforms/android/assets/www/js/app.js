var app = angular.module('konnekt', ['ionic','ngCordova','ion-floating-menu']);

app.run(function($ionicPlatform,$cordovaBeacon,$window,clearAppDataCache){

  $ionicPlatform.ready(function(){

        if(window.cordova && window.cordova.plugins.Keyboard){
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        if(window.StatusBar){
             StatusBar.show();
        }

        $ionicPlatform.registerBackButtonAction(function(e){
          backAsHome.trigger(function(){
              console.log("Success Over riding Back as Home . . .");
          }, function(){
              console.log("Error Over riding Back as Home . . .");
          });
          e.preventDefault();
        },101);

        //Enable the app to autostart
        cordova.plugins.autoStart.enable();

        //Enable autostart bluetooth
        $cordovaBeacon.enableBluetooth();

  });

});
