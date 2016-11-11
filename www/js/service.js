app.service('disableBack',function($ionicHistory){

    // Temporary service for disabling history
    this.removeBack = function(){
            $ionicHistory.nextViewOptions({
                  disableBack: true
              });
    };

});
