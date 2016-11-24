app.controller('ibeaconNotifyCtrl',function(
    apiUrl,
    ibeaconUuid,
    defaultContent,
    ibeaconIdentifier,
    openLink,
    killBeacon,
    aboutKonnekt,
    $http,
    $state,
    $scope,
    $window,
    $timeout,
    $rootScope,
    $ionicPopup,
    $cordovaToast,
    $ionicHistory,
    $ionicPlatform,
    $cordovaBeacon,
    $ionicSideMenuDelegate,
    $cordovaLocalNotification){

    $scope.sideMenuWidth = 300;
    //Initial image on load
    $scope.adsPost = defaultContent;
    //Hold becons in range
    $scope.rangebeacons = [];
    //Hold beacons to be displayed
    $scope.beaconsName = [];
    $scope.displaybeacons = [];
    //Notification and beacon detection moderator
    $scope.notificationModerator = [];
    $scope.beaconDetectModerator = [];

    //Handle sidemenu preferences
    $scope.toggleLeft = function(){
      $ionicSideMenuDelegate.toggleLeft()
    };

    //Trigger advertisements from sidemenu *** to be fix the link
    $scope.sideMenuAds = function(url,content){
      console.log(url + " *** " + content);
      killBeacon.killnow(60000);
      var x = document.getElementById('sidemenu-trigger');
      x.setAttribute('src',content);
      $scope.link = url;
    };

    //Refresh floating menu button
    $scope.refreshFloatingMenu = function(){
      do{
          killBeacon.killnow(30000);
          $state.go('home');
          $scope.adsPost = defaultContent;
          var x = document.getElementById('sidemenu-trigger');
          x.setAttribute('src',defaultContent);
          $scope.urlRedirect = function(){};
      }while($scope.adsPost != defaultContent)
    };

    //About Konnekt button
    $scope.aboutKonnekt = function(){
        aboutKonnekt.about();
    };

    //Beacon Detecttion Process
    $ionicPlatform.ready(function(){

      //Toast notification for bluetooth
      $timeout(function(){
            //Detect if bluetooth hardware is enabled
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

      //For IOS security
      $cordovaBeacon.requestWhenInUseAuthorization();

      //Monitoring regions
      $cordovaBeacon.startMonitoringForRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));

      //Ranging beacons
      $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));

      //Listening . . .
      $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, data){
          $scope.rangebeacons = data.beacons; //Hold beacons in range
          var majorBeacons; //Hold major
          var minorBeacons; //Hold minor

          //Handle null values to be passed in temporary major and minor value of beacons
          try{
               majorBeacons = $scope.rangebeacons[0].major;
               minorBeacons = $scope.rangebeacons[0].minor;
               var moderator = majorBeacons + "" + minorBeacons;

               if($scope.beaconDetectModerator.length == 0){
                  $scope.beaconDetectModerator.push(moderator);
                  console.log($scope.beaconDetectModerator.length);
               }
               else{
                  if($scope.beaconDetectModerator.indexOf(moderator) == -1){
                       $scope.beaconDetectModerator.push(moderator);
                  }
                  else{
                      $setTimeout(function(){
                          majorBeacons = null; minorBeacons = null;
                      },350);
                  }
                  console.log($scope.beaconDetectModerator.length);
               }
          }catch(err){
               console.log("major and minor is empty . . .");
          }

          if(majorBeacons != null && minorBeacons != null){
              //API Request for beacon detection
              $http.get(apiUrl + '/device/beacon/' + minorBeacons + '/' + majorBeacons).then(function(response){
                  $scope.beaconData = response.data[0];
                  var check; //Check if Exist
                  var toPush = $scope.beaconData.title; //Dummy for checking detected beacons
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
                  console.log(err.data); //Erorr logs
                  $cordovaToast.show("Unable to connect server . . . ","long","center");
              });


              //Throw Notification when detected beacons
              if($scope.beaconData != null){
                  var check = false;
                  if($scope.notificationModerator.length == 0){
                      $scope.notificationModerator.push($scope.beaconData.title);
                      check = true;
                  }
                  else{
                      if($scope.notificationModerator.indexOf($scope.beaconData.title) < 0){
                          $scope.notificationModerator.push($scope.beaconData.title);
                          check = true;
                      }
                      else{
                          check = false;
                      }
                  }

                  if(check == true){
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

                      //Posting beacons advertisements in main page
                      $scope.adsPost = $scope.beaconData.content;
                      $scope.redirLink = $scope.beaconData.url;

                      //Redirect Url links from main page
                      $scope.urlRedirect = function(){
                        $window.open($scope.redirLink,"_blank","location=yes");
                        console.log("Home Click link: " + $scope.redirLink);
                      };
                  }
              }

            //Notification listen when clicked redirect to corresponding state
            $rootScope.$on('$cordovaLocalNotification:click',function(event,notification,state){
                var notifId = notification.id;
                $http.get(apiUrl + '/device/beacon/' + notifId).then(function(response){
                    killBeacon.killnow(100000);
                    $scope.notificationData = response.data[0];
                    console.log($scope.notificationData);

                    //Posting beacons advertisements in main page when click from notification panel
                    $scope.adsPost = $scope.notificationData.content;
                    $scope.redirLinkNotif = $scope.notificationData.url;

                    //Redirect Url Links from notication
                    $scope.urlRedirect = function(){
                      $window.open($scope.redirLinkNotif,"_blank","location=yes");
                      console.log("Notification Click link: " + $scope.redirLinkNotif);
                    };

                },function(err){
                    $cordovaToast.show("Please check your network connection . . .","long","center");
                    console.log(err.data); //Erorr logs
                });

            });
          }
          $scope.$apply();
      });

    });

});
