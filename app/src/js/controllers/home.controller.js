/**
 * @author lweisberger
 */
 (function() {
    angular
    .module('app')
    .controller('HomeController', ['$scope', 'homePageData','$sce', function($scope, homePageData, $sce){

        this.homeCards = Object.keys(homePageData.cards).map(function(k) { 
            return homePageData.cards[k] 
        });
        this.slides = Object.keys(homePageData.slides).map(function(k) { 
            return homePageData.slides[k] 
        });
        this.coverImage = homePageData.coverImage;
        this.video = homePageData.video;
        this.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }
    }]);
})();