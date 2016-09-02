app.controller('ibeaconNotifyCtrl',function(
                                            $window,
                                            disableBack,
                                            $scope,
                                            $cordovaLocalNotification,
                                            $ionicPlatform,
                                            $cordovaBeacon,
                                            $rootScope,
                                            $state,
                                            $cordovaToast,
                                            $ionicHistory,
                                            $http,
                                            $ionicSideMenuDelegate){
                                              
                                              



    $scope.rangebeacons = []; //Hold BEACONS in RANGE
    
    //DISABLE and ENABLE BT in application
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
    
    //Handle SIDEMENU PREFERENCES
    $scope.toggleLeft = function(){
      $ionicSideMenuDelegate.toggleLeft()
    };
    
    //Handle the miss ads FORWARD and BACKWARD
    $scope.goBackward = function(){
      $window.history.back();
    };
    
    $scope.goForward = function(){
      $window.history.forward();
    }
    


    

    //************** data.json Service *******************
      var len;                                  
      $scope.data =[];                                         
      $http.get('data/data.json').success(function(data){
        $scope.data = data.info;
        len = $scope.data.length;  
      });
    //************** data.json Service *******************

    
    
    $ionicPlatform.ready(function(){     
      
     //Detect if BT HARDWARE is enabled 
      $cordovaBeacon.isBluetoothEnabled().then(function(state){
        if(state == true){
              console.log('Bluetooth is enabled . . .');
              $cordovaToast.show("Bluetooth is enabled","short","center");
        }
        else{
              console.log('Bluetooth is disabled . . . ');
              $cordovaToast.show("Please enable bluetooth on your settings","long","center");
        }
      });
      
      
      
      //Block for ranging and advertising beacons in region
      var ibeaconIdentifier = 'iBeacon';
      var ibeaconUuid = 'b9407f30-f5f8-466e-aff9-25556b57fe6d';

      $cordovaBeacon.requestWhenInUseAuthorization();
      
      $cordovaBeacon.startMonitoringForRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));


      $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, data) {
         
          $scope.rangebeacons = data.beacons; 
          var majorBeacons;
          var minorBeacons;
          
          
          // Handle null values to be passed in temporary major  and minor value of beacons
          try{
               majorBeacons = $scope.rangebeacons[0].major;
               minorBeacons = $scope.rangebeacons[0].minor;
          }catch(err){
            
          }
          

          var i;
          for(i = 0; i < len; i++){
              //Filter the MINOR and MAJOR values
              if(majorBeacons == $scope.data[i].major && minorBeacons == $scope.data[i].minor ){
                
                // code where to throw the call notifications for candy    
                $cordovaLocalNotification.schedule({
                  
                  id: $scope.data[i].id,
                  title: $scope.data[i].title,
                  text: $scope.data[i].text,
                  icon: $scope.data[i].icons,
                  smallIcon:"res://icon"
                
                });
                $state.go($scope.data[i].state);
              }
              else{
                console.log('No beacons is in range . . .');          
              }
          }
          $scope.$apply();
      });
      
      $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));
    

    });

});