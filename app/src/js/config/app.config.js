/**
 * @author lweisberger
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
        .state('events', {
            url: '/events',
            templateUrl: "views/events.html"
        })
        .state('membership', {
            url: '/membership',
            templateUrl: "views/membership.html",
            controller: "MembershipController as membershipCtrl"
        })
        .state('contribute', {
            url: '/contribute',
            templateUrl: "views/contribute.html",
            controller: "ContributeController as contributeCtrl"
        })
        .state('history', {
            url: '/history',
            templateUrl: "views/history.html",
            controller: "HistoryController as historyCtrl"
        })
        .state('education', {
            url: '/education',
            templateUrl: "views/education.html",
            controller: "EducationController as educationCtrl",
        })
        .state('bulletins', {
            url: '/bulletins',
            templateUrl: "views/bulletins.html",
            controller: "BulletinsController as bulletinsCtrl",
        })
        .state('asktherabbi', {
            url: '/asktherabbi',
            templateUrl: "views/asktherabbi.html",
            controller: "AskTheRabbiController as askTheRabbiCtrl",
        })
        .state('worship', {
            url: '/worship',
            templateUrl: "views/worship.html",
            controller: "WorshipController as worshipCtrl",
        });
}