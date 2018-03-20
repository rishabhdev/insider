angular.module('skeletonClient', ['ui.bootstrap', 'ui.router', 'ngAnimate', 'main']);

angular.module('skeletonClient').config(function($stateProvider, $urlRouterProvider) {
    /* Add New States Above */
    $urlRouterProvider.otherwise('/main');
});
angular.module('skeletonClient').run(function($rootScope) {
    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
