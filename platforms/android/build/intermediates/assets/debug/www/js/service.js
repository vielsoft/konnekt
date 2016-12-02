app.service('disableBack',function($ionicHistory){
    //Disable Views Back Service
    this.removeBack = function(){
            $ionicHistory.nextViewOptions({
                  disableBack: true
            });
    };
});

app.service('viewProperty',function(){
    //View and Hide Element Service
    this.set = function(id,val){
        var x = document.getElementById(id);
        x.style.display = val;
    };
});

app.service('openLink',function($window){
    //Open link inAppBrowser Service
    this.openNow = function(link){
        var url = link;
        $window.open(url,"_blank","location=yes");
    };
});

app.service('aboutKonnekt',function($ionicPopup){
    //About Konnekt Service
    this.about = function(){
        $ionicPopup.alert({
            title: 'Konnekt v1.0.0',
            template: '<p align="center"><img style="width:50px;height:50px;" src="./img/icon.png"></img></br>About Konnekt Application</p>'
        });
    };
});

app.service('clearAppDataCache',function($window,$ionicHistory){
    //Clear App Data and Cache Service
    this.clearApp = function(){
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        console.log("Clearing app data . . .");
    };
});

app.service('killBeacon',function($timeout,$cordovaBeacon,ibeaconUuid,ibeaconIdentifier){
    //Kill Beacon Service
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


app.service('backgroundMode',function($cordovaLocalNotification){
    //Notify when in Backgroundmode Service
    this.notify = function(title,text){
        var notifTitle = title;
        var notifText = text;
        $cordovaLocalNotification.schedule({
          id: '0',
          title: notifTitle,
          text: notifText,
          icon: 'res://icon'
        });
    };
});
