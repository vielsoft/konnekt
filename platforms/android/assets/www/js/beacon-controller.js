app.controller('ibeaconNotifyCtrl',function(
    $state,
    apiUrl,
    ibeaconUuid,
    ibeaconIdentifier,
    $http,
    $scope,
    $timeout,
    $window,
    $ionicPlatform,
    $cordovaBeacon,
    $rootScope,
    aboutKonnekt,
    $cordovaToast,
    $ionicHistory,
    $ionicPopup,
    $cordovaLocalNotification,
    $ionicSideMenuDelegate){

    $scope.sideMenuWidth = 300;

    //Initial Image on load
    $scope.adsPost = "img/giphy.gif";

    //Hold BEACONS in RANGE
    $scope.rangebeacons = [];

    //Hold BEACONS to be DISPLAY
    $scope.beaconsName = [];
    $scope.displaybeacons = [];

    //Handle SIDEMENU PREFERENCES
    $scope.toggleLeft = function(){
      $ionicSideMenuDelegate.toggleLeft()
    };

    //Trigger advertisements from SIDEMENU
    $scope.sideMenuAds = function(url,content){
      $cordovaBeacon.stopRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));
      console.log(url + " *** " + content);
      $scope.adsPost = content;
      $scope.redirLink = url;
      $window.open(url,'_blank','location=yes');
    };

    //Refresh Floating Menu
    $scope.refreshFloatingMenu = function(){
      //Initial Image on load is fired when Refreshed
      $scope.adsPost = "img/giphy.gif";
      $scope.urlRedirect = function(){
          //Needs to be empty to satisfy the null link of refreshed page
      };
    };

    //About Konnekt
    $scope.aboutKonnekt = function(){
        aboutKonnekt.about();
    };

    /*Beacon Detecttion Process*/
    $ionicPlatform.ready(function(){

     // TIMEOUT toast
     $timeout(function(){
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
     },5000);

      //Block for ranging and advertising beacons in region
      //var ibeaconIdentifier = 'iBeacon';
      //var ibeaconUuid = 'b9407f30-f5f8-466e-aff9-25556b57fe6d';

      //For IOS Security
      $cordovaBeacon.requestWhenInUseAuthorization();

      //MONITORING Regions
      $cordovaBeacon.startMonitoringForRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));

      //RANGING Beacons
      $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));

      //LISTENING
      $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, data) {

          $scope.rangebeacons = data.beacons; //HOLD beacons in RANGE
          var majorBeacons; //HOLD major
          var minorBeacons; //HOLD minor


          //Handle null values to be passed in temporary major and minor value of beacons
          try{
               majorBeacons = $scope.rangebeacons[0].major;
               minorBeacons = $scope.rangebeacons[0].minor;
          }catch(err){
               console.log("major and minor is empty . . .");
          }


          if(majorBeacons != null && minorBeacons != null){
              //API REQUEST
              $http.get(apiUrl + '/device/beacon/' + minorBeacons + '/' + majorBeacons).then(function(response){

                  $scope.beaconData = response.data[0];
                  var check; //Check if Exist
                  var toPush = $scope.beaconData.title; //Dummy for Checking
                  var urlText = {
                        text: $scope.beaconData.text,
                        url: $scope.beaconData.url,
                        icons: $scope.beaconData.icons,
                        content: $scope.beaconData.content
                  };
                  if($scope.beaconsName.length == 0){
                      $scope.beaconsName.push(toPush);
                      urlText.title = $scope.beaconData.title;
                      $scope.displaybeacons.push(urlText);
                  }
                  else{
                      var len = $scope.beaconsName.length;
                      for(var x = 0; x <= len; x++){
                        check = $scope.beaconsName.indexOf($scope.beaconData.title);
                        if(check == -1){
                          $scope.beaconsName.push(toPush);
                          urlText.title = $scope.beaconData.title;
                          $scope.displaybeacons.push(urlText);
                        }
                      }
                  }

              },function(err){
                  console.log(err.data); //Erorr Logs
                  $cordovaToast.show("Unable to connect server . . . ","long","center");
              });

              if($scope.beaconData != null){
                  //Beacon logs in range
                  console.info($scope.beaconData.title + " is in range . . .");
                  //Fired Notification
                  $cordovaLocalNotification.schedule({
                      id: $scope.beaconData.id,
                      title: $scope.beaconData.title,
                      text: $scope.beaconData.text,
                      icon: $scope.beaconData.icons,
                      smallIcon:"res://icon"
                  });

                  //POSTING beacons advertisements in main page
                  $scope.adsPost = $scope.beaconData.content;
                  $scope.redirLink = $scope.beaconData.url;

                  //REDIRECT Url Links from main page
                  $scope.urlRedirect = function(){
                    $window.open($scope.redirLink,"_blank","location=yes");
                    console.log("Click link: " + $scope.redirLink);
                  };

              }


              //Notification listen when clicked redirect to corresponding state
              $rootScope.$on('$cordovaLocalNotification:click',function(event,notification,state){

                  var notifId = notification.id;
                  $http.get(apiUrl + '/device/beacon/' + notifId).then(function(response){

                      $scope.notificationData = response.data[0];
                      console.log($scope.notificationData);

                      //POSTING beacons advertisements in main page when click from notification panel
                      $scope.adsPost = $scope.notificationData.content;
                      $scope.redirLinkNotif = $scope.notificationData.url;

                      //REDIRECT Url Links from Notication
                      $scope.urlRedirect = function(){
                        $window.open($scope.redirLinkNotif,"_blank","location=yes");
                        console.log("Click link: " + $scope.redirLink);
                      };

                      //STOP MONITORING range Beacons PAUSE
                      $cordovaBeacon.stopRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));
                      console.log("STOP ranging beacons");

                      $timeout(function(){
                          //START MONITORING range Beacons RESUME
                          $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));
                          console.log("START ranging beacons");
                      },60000);

                  },function(err){
                      $cordovaToast.show("Please check your network connection . . .","long","center");
                      console.log(err.data); //Erorr Logs
                  });

              });

              //STOP MONITORING range Beacons PAUSE
              $cordovaBeacon.stopRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));
              console.log("STOP ranging beacons");

              $timeout(function(){
                  //START MONITORING range Beacons RESUME
                  $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));
                  console.log("START ranging beacons");
              },11000)

          }
          $scope.$apply();
      });

    });

});
