/**
 * @author ctola
 */
angular
    .module("app")
    .config(appConfig);

appConfig.$inject =['$stateProvider', '$urlRouterProvider'];

function appConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: "views/home.html",
            controller: "HomeController as homeCtrl",
            resolve: {
                homePageData:  function($http) {
                    return $http.get('https://temple-website.firebaseio.com/home.json').then(function(response) {
                        return response.data;
                    });
                }
            }
        })
        .state('clergy', {
            url: '/clergy',
            templateUrl: "views/clergy.html",
            controller: "ClergyController as clergyCtrl"
        })
        .state('staff', {
            url: '/staff',
            templateUrl: "views/staff.html",
            controller: "StaffController as staffCtrl"
        })
        .state('events', {
            url: '/events',
            templateUrl: "views/events.html"
        })
        .state('membership', {
            url: '/membership',
            templateUrl: "views/membership.html",
            controller: "MembershipController as membershipCtrl"
        })
        .state('history', {
            url: '/history',
            templateUrl: "views/history.html",
            controller: "HistoryController as historyCtrl"
        });
}