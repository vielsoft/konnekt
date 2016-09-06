app.config(function($stateProvider,$urlRouterProvider){
    
    // Add NEW state for NEW entry: Fix cant done in other way
    
    $stateProvider
    .state('home',{
        
        url: '/home',
        templateUrl: 'templates/home.html',
        controller:'ibeaconNotifyCtrl'
    })
    .state('candy',{
        
        url: '/candy',
        templateUrl: 'templates/candy.html',
        controller:'templateCtrl'
    })
    .state('beetroot',{
        
        url: '/beetroot',
        templateUrl: 'templates/beetroot.html',
        controller:'templateCtrl'
    })
    .state('lemon',{
        
        url: '/lemon',
        templateUrl: 'templates/lemon.html',
        controller:'templateCtrl'
    })
 
    $urlRouterProvider.otherwise('/home');
    
});