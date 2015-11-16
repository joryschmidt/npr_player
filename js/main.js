var app = angular.module('myApp', []);

var apiKey = 'MDIxMTc2MDIxMDE0NDY5MzkyNTEzZmE0NA000',
    nprUrl = 'https://api.npr.org/query?id=2&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON&27';
    
    
app.controller('PlayerController', function($scope, $http){
    $http({
        method: 'JSONP',
        url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
    }).success(function(data, status){
       $scope.programs = data.list.story; 
    }).error(function(data, status){
        console.log('Somthing is wrong');
    });
    $scope.audio = document.createElement('audio');
    $scope.playing = false;
    $scope.play = function(program) {
        if ($scope.playing) {
            $scope.audio.pause();
            $scope.playing = false;
        }
        var url = program.audio[0].format.mp4.$text;
        $scope.audio.src = url;
        $scope.audio.play();
        $scope.playing = true;
    }
});

app.controller('RelatedController', ['$scope', function($scope){
    
}]);

app.directive('nprLink', function() {
  return {
    restrict: 'EA',
    require: ['^ngModel'],
    replace: true,
    scope: {
      ngModel: '=',
      play: '&'
    },
    templateUrl: '/views/nprListItem.html',
    link: function(scope, ele, attr) {
      scope.duration = scope.ngModel.audio[0].duration.$text;
    }
  }
});

app.directive('ngSparkline', function() {
    return {
        restrict: 'A',
        require: '^ngCity',
        scope: {
            ngCity: '@'
        },
        template: '<div class="sparkline"><h4>Weather for {{ ngCity }}</h4></div>'
        
    }
});