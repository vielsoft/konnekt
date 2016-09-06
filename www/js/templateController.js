app.controller('templateCtrl',function($window,$scope,$http){
    
    //URL Links for beacons
    

    //Eastwet URL - Lemon
    $scope.eastwestUrl = function(){
        $window.open("https://www.eastwestbanker.com/","_blank","location=yes");
    };
    
    //Jollibee URL - Beetroot
    $scope.jollibeeUrl = function(){
        $window.open("http://www.jollibeedelivery.com/?gclid=Cj0KEQjwgJq-BRCFqcLW8_DU9agBEiQAz8Koh1lhouDPHpEPLsU-H8c_ZktRoIU_MqMIgdf9C_-n1h4aAk_z8P8HAQ","_blank","location=yes");
    };
    
    //RobinsonsMovie URL -Candy
    $scope.robmovieUrl = function(){
        $window.open("https://www.robinsonsmovieworld.com/","_blank","location=yes");
    };
    
  


});