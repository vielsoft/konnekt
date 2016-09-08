app.config(function($stateProvider,$urlRouterProvider){
    
    // Add NEW state for NEW entry: Fix cant done in other way
    
    $stateProvider
    .state('home',{
        
        url: '/home',
        templateUrl: 'templates/home.html',
        controller:'ibeaconNotifyCtrl'
    })
    $urlRouterProvider.otherwise('/home');
    
});