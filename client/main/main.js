angular.module('main', ['ui.bootstrap','ui.router','ngAnimate']);

angular.module('main').config(function($stateProvider) {
    $stateProvider.state('main', {
        url: '/main',
        templateUrl: 'main/partial/main/main.html'
    });
});

