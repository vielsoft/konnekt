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
            template: 'About Konnekt Information'
        });
    };
});
