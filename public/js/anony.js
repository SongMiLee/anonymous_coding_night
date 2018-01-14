var app = angular.module('anony',[]);

app.controller('submitFeed', function($scope, $window, $http){
  $scope.feedData = {};

  $scope.sendFeed = function(){
    if($scope.feedData.feed_text == null){
      alert("글을 입력해 주시길 바랍니다.");
    } else {
      $http({
        method: "POST",
        url: "/api/sendfeed",
        data: $scope.feedData,
      }).then(function Success(res){
        console.log(res.data);
        var result = res.data.ret;

        if(result == 1){
          alert("Send Fail");
          console.log(res.data.error);
        }else{
          alert("Send Success");
          $window.location.reload();
        }

        $scope.feedData.text = "";
      }, function Fail(res){
        console.log(res);
        alert("Internal Error!");
      });
    }
  }
});

app.controller('getFeed', function($scope, $http){
  $http({
    method: "POST",
    url: "/api/loadfeed"
  }).then(function Success(res){
    if(res.data.ret == 0){
      var total = res.data.feeds;
      $scope.feedBox = total;
    }else{
      console.log(res.data.error);
      alert.log("load fail");
    }
  }), function Fail(res){
    alert("load Fail");
  };
});
