(function() {
    angular
        .module('app')
        .controller('HistoryController',['$scope', '$http', '$sce', function($scope, $http, $sce){
        	$http.get('https://temple-website.firebaseio.com/history.json').then((response) => {
            	 this.events = Object.keys(response.data.events).map((k) => { 
                    return response.data.events[k] 
                });

            	 this.missionIntro = response.data.mission.intro;
            	 this.missionConclusion = response.data.mission.conclusion;
            	 this.missions = Object.keys(response.data.mission.missions).map((k) => { 
                    return response.data.mission.missions[k] 
                });
            });

        }]);
})();