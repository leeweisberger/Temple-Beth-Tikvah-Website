(function() {
    angular
        .module('app')
        .controller('AskTheRabbiController',['$scope', '$http', '$sce', function($scope, $http, $sce){
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

            this.formData = {};

            this.sendEmail = () => {
                const url = "https://shrouded-beach-93379.herokuapp.com/sendMailToRabbi";
                if (!this.formData.name || !this.formData.email || !this.formData.body) {
                    Materialize.toast('Error - please fill out all fields', 3000, 'redToast');
                } else {
                    this.formData.subject = "Question from " + this.formData.name;
                    $http.post(url, this.formData).then(
                        () => {Materialize.toast('Success! Your message has been delivered to Rabbi Meeka.', 3000, 'greenToast');},
                        () => {Materialize.toast('Error - please resubmit or try a different email address.', 3000, 'redToast');}
                        );
                }
            };
        }]);
})();