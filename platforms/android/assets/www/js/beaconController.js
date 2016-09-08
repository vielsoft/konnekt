app.controller('ibeaconNotifyCtrl',function(
                                            $http,
                                            disableBack,
                                            $scope,
                                            $timeout,
                                            $window,
                                            $ionicPlatform,
                                            $cordovaBeacon,
                                            $rootScope,
                                            $state,
                                            $cordovaToast,
                                            $ionicHistory,
                                            $cordovaLocalNotification,
                                            $ionicSideMenuDelegate){



    //Hold BEACONS in RANGE                                
    $scope.rangebeacons = []; 
    
    //DISABLE and ENABLE BT in application
    $scope.enaBtooth = function(btoothValue){
        if(btoothValue == true){
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
      $scope.notifyData = [];                                       
      $http.get('data/data.json').success(function(data){
        
        $scope.data = data.info; //Main Data Process
        $scope.notifyData = data.info; // Data to be used in holding notification ID
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
                
                //Beacon logs in range
                console.log($scope.data[i].state+" beacons is in range . . ."); 
                
                //Blocks that throw notifications   
                $cordovaLocalNotification.schedule({
                  
                  id: $scope.data[i].id,
                  title: $scope.data[i].title,
                  text: $scope.data[i].text,
                  icon: $scope.data[i].icons,
                  smallIcon:"res://icon"
                
                });
                
                //Routing beacons Ads.
                $state.go($scope.data[i].state);
                
                //Notification listen when clicked redirect to corresponding state
                $rootScope.$on('$cordovaLocalNotification:click',function(event,notification,state){
                  
                    var i;                  
                    var len = $scope.notifyData.length;
                    
                    for(i = 0; i < len; i++){
                      
                      if(notification.id == $scope.notifyData[i].id){
                          //Corresponding State
                          $state.go($scope.notifyData[i].state);
                          
                          //STOP MONITORING range Beacons PAUSE
                          $cordovaBeacon.stopRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));
                          console.log("STOP ranging beacons");
                          
                          $timeout(function(){
                            
                              //START MONITORING range Beacons RESUME
                              $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));
                              console.log("START ranging beacons");
                              
                          },10000);
                      }
                    
                    }  
             
                });
                
                
                
                
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