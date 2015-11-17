var app = angular.module('myApp', []);

var apiKey = 'MDIxMTc2MDIxMDE0NDY5MzkyNTEzZmE0NA000',
    nprUrl = 'https://api.npr.org/query?id=57&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON&27';
    
    
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
            return $scope.playing = false;
        }
        var url = program.audio[0].format.mp4.$text;
        $scope.audio.src = url;
        $scope.audio.play();
        $scope.playing = true;
    };
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
  };
});

app.directive('ngCity', function() {
  return {
    controller: function($scope) {}
  }
});

app.directive('ngSparkline', function() {
  var url = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=imperial&cnt=14&APPID=0d3ca11cd9f77be1eec1b284667dd845&callback=JSON_CALLBACK&q=";

  return {
      restrict: 'A',
      require: '^ngCity',
      scope: {
        ngCity: '@'
      },
      template: '<div class="sparkline"><h4>Weather for {{ngCity}}</h4><div class="graph"></div></div>',
      controller: ['$scope', '$http', function($scope, $http) {
        $scope.getTemp = function(city) {
          $http({
            method: 'JSONP',
            url: url + city
          }).success(function(data) {
            var weather = [];
            angular.forEach(data.list, function(value){
              weather.push(value);
            });
            $scope.weather = weather;
          });
        };
      }],
      link: function(scope, iElement, iAttrs, ctrl) {
        scope.getTemp(iAttrs.ngCity);
        scope.$watch('weather', function(newVal) {
          // the `$watch` function will fire even if the
          // weather property is undefined, so we'll
          // check for it
          if (newVal) {
            var highs = [],
                width   = 200,
                height  = 80;
  
            angular.forEach(scope.weather, function(value){
              highs.push(value.temp.max);
            });
            // chart
          }
        });
      }
  };
});