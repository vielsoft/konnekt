app.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){

    $stateProvider
    .state('home',{

        cache: false,
        url: '/home',
        templateUrl: 'templates/home.html',
        controller:'ibeaconNotifyCtrl'

    });
    //Default State
    $urlRouterProvider.otherwise('/home');
});
