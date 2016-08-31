// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
 var app = angular.module('starter', ['ionic','ngCordova']); //,'ngCordovaBeacon'


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
      StatusBar.styleDefault();
    }
    
  });
});








app.controller('ibeaconNotifyCtrl',function(
                                            disableBack,
                                            $scope,
                                            $cordovaLocalNotification,
                                            $ionicPlatform,
                                            $cordovaBeacon,
                                            $rootScope,
                                            $state,
                                            $ionicPopup,
                                            $ionicHistory,
                                            $ionicSideMenuDelegate){

    
    $scope.rangebeacons = []; //Hold the beacons in range
    
    //Let the user enable and disable the bluetooth through in app
    $scope.enaBtooth =function(btoothValue){
      
        if(btoothValue== true){
            console.log('Bluetooth is enable in app');
            $cordovaBeacon.enableBluetooth();
        }
        else{
            console.log('Bluetooth is disable in app');
            $cordovaBeacon.disableBluetooth();
        }
    };
    
    //Handle side menu preferences
    $scope.toggleLeft = function(){
      $ionicSideMenuDelegate.toggleLeft()
    };
    
    


    


    
    
    $ionicPlatform.ready(function(){     
      
      //Detect wether the bluetoth hardware is enabled
      $cordovaBeacon.isBluetoothEnabled().then(function(state){
        
        if(state == true){
          
              console.log('Bluetooth is enabled . . .');
        
        }
        else{
              console.log('Bluetooth is disabled . . . ');
             
              //Notify user that bluetooth is disabled
              $ionicPopup.alert({
                title: 'iBeacon Notify',
                template: 'Please turn on bluetooth in your settings'
              });
        }
   
      });
      
      
      
      
      
      
      
      //Block for ranging and advertising beacons in region
      var ibeaconIdentifier = 'iBeacon';
      var ibeaconUuid = 'b9407f30-f5f8-466e-aff9-25556b57fe6d';

      $cordovaBeacon.requestWhenInUseAuthorization();
      
      $cordovaBeacon.startMonitoringForRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));


      $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, data) {
          $scope.allBeacons = data;
          $scope.rangebeacons = data.beacons; 
          var majorBeacons;
          var minorBeacons;
          
          
          // Handle null values to be passed in temporary major  and minor value of beacons
          try{
               majorBeacons = $scope.rangebeacons[0].major;
               minorBeacons = $scope.rangebeacons[0].minor;
          }catch(err){
            
          }
          
          
          // Filter values of major and minor to be thrown in notifications
          if(majorBeacons == 25692 && minorBeacons == 33803 ){
            
            // code where to throw the call notifications for candy  
            console.log('Candy is in range . . . ');    
            $cordovaLocalNotification.schedule({
              
              id: '001',
              title: 'iBeacon notify',
              text: "Hi, I'm Candy",
              icon: 'res://icon.png'
            
            });
           
            $state.go('candy');
            
          
          }
          else if(majorBeacons == 51669 && minorBeacons == 32724 ){
              
            // code where to throw the call notifications for lemon  
            console.log('Lemon is in range . . . ');    
            $cordovaLocalNotification.schedule({
              
              id: '002',
              title: 'iBeacon notify',
              text: "Hi, I'm Lemon",
              icon: 'res://icon.png'
            
            });

            $state.go('lemon');
            
          }
          else if(majorBeacons == 28140 && minorBeacons == 15530 ){
            
            // code where to throw the call notifications for beetroot 
            console.log('Beetroot is in range . . . ');    
            $cordovaLocalNotification.schedule({
              
              id: '003',
              title: 'iBeacon notify',
              text: "Hi, I'm Beetroot",
              icon: 'res://icon.png'
            
            });
            
            $state.go('beetroot');
          
          }
          else{
            
            console.log('No beacons is in range . . .');          
          }

 
          $scope.$apply();
      });
      
      $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));
    
    });



    
  
});