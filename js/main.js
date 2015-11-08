var app = angular.module('myApp', []);

var apiKey = 'MDIxMTc2MDIxMDE0NDY5MzkyNTEzZmE0NA000',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';
    
app.controller('PlayerController', ['$scope', function($scope){
    $scope.playing = false;
    $scope.audio = document.createElement('audio');
    $scope.audio.src = '/media/npr.mp4';
    $scope.play = function() {
        $scope.audio.play();
        $scope.playing = true;
    };
    $scope.stop = function() {
        $scope.audio.pause();
        $scope.playing = false;
    };
    $scope.audio.addEventListener('ended', function(){
        $scope.$apply(function(){
            $scope.stop()
        });
    });
    $http({
        method: 'JSONP',
        url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
    }).success(function(data, status){
       $scope.programs = data.list.story; 
    }).error(function(data, status){
        
    });
}]);

app.controller('RelatedController', ['$scope', function($scope){
    
}]);