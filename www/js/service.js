app.service('disableBack',function($ionicHistory){
    // Disable Views Back Service
    this.removeBack = function(){
            $ionicHistory.nextViewOptions({
                  disableBack: true
              });
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
        $window.localStorage.clear();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        console.log("Clearing app data . . .");
    };
});
