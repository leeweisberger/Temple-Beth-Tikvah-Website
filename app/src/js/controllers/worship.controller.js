(function() {
    angular
        .module('app')
        .controller('WorshipController',['$scope', '$http', '$sce', function($scope, $http, $sce){
        	$http.get('https://temple-website.firebaseio.com/worship.json').then((response) => {
            	this.worshipTimes = Object.keys(response.data.Shabbat).map((k) => { 
                    return response.data.Shabbat[k] 
                });
                this.highHolidaysIntro = response.data.highHolidays.intro; 
                this.roshHashanah = response.data.highHolidays.roshHashanah;
                this.yomKippur = response.data.highHolidays.yomKippur;
                this.atonement = response.data.highHolidays.atonement;
                this.highHolidaysTicketInfo = response.data.highHolidays.ticketInfo;
                
                this.totShabbatTimes = Object.keys(response.data.totShabbat.times).map((k) => { 
                    return response.data.totShabbat.times[k] 
                });
                this.totShabbatDates = Object.keys(response.data.totShabbat.dates).map((k) => { 
                    return response.data.totShabbat.dates[k] 
                });
                this.totShabbatIntro = response.data.totShabbat.intro;
                this.totShabbatAbout = response.data.totShabbat.about;
                this.totShabbatMoreInfo = response.data.totShabbat.moreInfo;

                this.morningMinyonTimes = Object.keys(response.data.morningMinyon.times).map((k) => { 
                    return response.data.morningMinyon.times[k] 
                });
                this.morningMinyonIntro = response.data.morningMinyon.intro;
                this.morningMinyonAbout = response.data.morningMinyon.about;

            });
            $scope.scrollTo = function (id) {
                $anchorScroll(id);  
            }
        }]);
})();