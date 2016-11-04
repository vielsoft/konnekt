app.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
    
    // Add NEW state for NEW entry: Fix cant done in other way
    
    $stateProvider
    .state('home',{
        
        cache: false,
        url: '/home',
        templateUrl: 'templates/home.html',
        controller:'ibeaconNotifyCtrl'
        
    });
    
    $urlRouterProvider.otherwise('/home');
    
    
    // Delete CACHE globally
    $ionicConfigProvider.views.maxCache(0);
    
    
});