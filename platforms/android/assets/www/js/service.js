// Temporary service for disabling history
app.service('disableBack',function($ionicHistory){
  
    this.removeBack = function(){
            $ionicHistory.nextViewOptions({
                  disableBack: true
              });
    };
    
});
