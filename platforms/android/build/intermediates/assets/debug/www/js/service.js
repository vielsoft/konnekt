//Disable Views Back Service
app.service('disableBack',function($ionicHistory){
    this.removeBack = function(){
        $ionicHistory.nextViewOptions({
              disableBack: true
        });
    };
});

//View and Hide Element Service
app.service('viewProperty',function(){

      this.set = function(id,val){
          var x = document.getElementById(id);
          x.style.display = val;
      };
});

//Open link inAppBrowser Service
app.service('openLink',function($window){
      this.openNow = function(link){
          var url = link;
          $window.open(url,"_blank","location=yes");
      };
});

//About Konnekt Service
app.service('aboutKonnekt',function($ionicPopup){
      this.about = function(){
          $ionicPopup.alert({
              title: 'Konnekt v1.0.0',
              template: '<p align="center"><img style="width:70%;height:70%;" src="./img/icon.png"></img></br>About Konnekt Application</p>'
          });
          console.log("About Konnekt . . .");
      };
});

//Clear App Data and Cache Service
app.service('clearAppDataCache',function($window,$ionicHistory){

      this.clearApp = function(){
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
          console.log("Clearing app data . . .");
      };
});

//Kill Beacon Service
app.service('killBeacon',function($timeout,$cordovaBeacon,ibeaconUuid,ibeaconIdentifier){
      this.killnow = function(ms){
          var msecs = ms;
          $cordovaBeacon.stopMonitoringForRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));
          $cordovaBeacon.stopRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));
          console.log("Stop ranging beacons . . .");
          $timeout(function(){
              $cordovaBeacon.startMonitoringForRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));
              $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion(ibeaconIdentifier,ibeaconUuid));
              console.log("Start ranging beacons . . .");
          },msecs);
      };
});

//Notify when in Backgroundmode Service
app.service('backgroundMode',function($cordovaLocalNotification){
      this.notify = function(title,text){
          var notifTitle = title;
          var notifText = text;
          $cordovaLocalNotification.schedule({
              id: '0',
              title: notifTitle,
              text: notifText,
              icon: 'res://icon',
              smallIcon: 'res://icon'
          });
      };
});

//String Date Service
app.service('stringDate',function(){
      this.convertedDate = function(){
          var x = new Date();
          var intDay = x.getMonth();
          var listDay = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
          var returnStringDate = listDay[intDay] + " " + x.getDate();
          return returnStringDate;
      };
});


//Loading Service
app.service('loadingState',function($ionicLoading){
      this.show = function(ms){
          $ionicLoading.show({
              template: '<ion-spinner></ion-spinner></br>Loading content . . .',
              showBackDrop: false,
              duration: ms
          });
      };
});
