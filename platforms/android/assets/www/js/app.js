var app = angular.module('konnekt', ['ionic','ngCordova','ion-floating-menu']);

app.run(function($ionicPlatform,$cordovaBeacon,$window,clearAppDataCache,$cordovaSQLite,$cordovaLocalNotification,backgroundMode){

  $ionicPlatform.ready(function(){

        backAsHome.trigger(function(){
            backgroundMode.notify('Konnekt','Tap here to launch konnekt . . .');
        },function(){
            cosnsole.log("Failed to start app in background mode . . .");
        });

        if(window.cordova && window.cordova.plugins.Keyboard){
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        if(window.StatusBar){
             StatusBar.show();
        }

        $ionicPlatform.registerBackButtonAction(function(e){
          backAsHome.trigger(function(){
              backgroundMode.notify('Konnekt','Konnekt is running in background mode . . .');
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

        db = $cordovaSQLite.openDB({name:'konnekt.db',location:'default'});
        //db = window.openDatabase("konnekt.db", "1.0", "Cordova Demo", 200000);
        //var db = $cordovaSQLite.openDB({name:'konnekt.db',bgType:1,location:'default'});
        $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS konnekt_table (id text primary key , title  text , text text , url text , icons text , content text , fulldate_detected text , date_detected text)")
        .then(function(res){
            console.log("konnekt_table has been created . . . ");
        },function(err){
            console.log(err.message);
        })
  });

});
