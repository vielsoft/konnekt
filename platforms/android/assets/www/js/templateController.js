app.controller('templateCtrl',function($window,$scope,$http){

    
    $scope.eastwestUrl = function(){
        $window.open("https://www.eastwestbanker.com/","_blank","location=yes");
    };
    
    $scope.jollibeeUrl = function(){
        $window.open("http://www.jollibeedelivery.com/?gclid=Cj0KEQjwgJq-BRCFqcLW8_DU9agBEiQAz8Koh1lhouDPHpEPLsU-H8c_ZktRoIU_MqMIgdf9C_-n1h4aAk_z8P8HAQ","_blank","location=yes");
    };
    
    $scope.robmovieUrl = function(){
        $window.open("https://www.robinsonsmovieworld.com/","_blank","location=yes");
    };
    
  


});