// Temporary service for disabling history
app.service('disableBack',function($ionicHistory){
  
    this.removeBack = function(){
            $ionicHistory.nextViewOptions({
                  disableBack: true
              });
    };
    
});


//Pending as service to be  called
app.service('beaconService',function(){
    
      var len;                                  
      $scope.data =[];       
                                        
      $http.get('data/data.json').success(function(data){
          
        $scope.data = data.info;
        len = $scope.data.length;  
        
      });
      
});


                                      
