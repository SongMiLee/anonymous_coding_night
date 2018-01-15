var app = angular.module('anony',['ngMaterial', 'ngRoute','angular-encryption']);

app.config(function($locationProvider){
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

app.controller('modiFeed', function($scope, $window, $http, $location){
  $scope.feedData = {};
  var id = $location.search();

  //redirect when id is not came
  if(angular.isUndefined(id) || id == null || id.length == 0 || angular.equals({}, id)){
    $window.location.href='/';
  }else{
    $scope.feedData.user_id = id;

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
  }

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



app.controller('loginControl', function($scope, $http, $window,sha256){
  $scope.userData = {};

  $scope.signIn = function(){
      if($scope.userData.user_email == null || $scope.userData.user_pwd == null){
        alert("입력 값을 다시 확인해 주십시오");
      }else{
        $scope.userData.user_pwd = sha256.convertToSHA256($scope.userData.user_pwd);
        //로그인
        $http({
          method:"POST",
          url: "/signin",
          data: $scope.userData
        }).then(function Success(res){
          var result = res.data;
          if(result.ret == 1){
            $scope.userData.user_email = "";
            $scope.userData.user_pwd = "";
            alert(result.data);
          }else{
            $scope.userData.user_email = "";
            $scope.userData.user_pwd = "";
            $window.location.href = '/main?id='+result.data;
          }
        }), function Fail(res){
          alert("Internal Error!");
        };
      }
  };

  $scope.signUp = function(){
    if($scope.userData.user_email == null || $scope.userData.user_pwd == null){
      alert("입력 값을 다시 확인해 주십시오");
    }else{
      $scope.userData.user_pwd = sha256.convertToSHA256($scope.userData.user_pwd);

      //가입
      $http({
        method:"POST",
        url: "/signup",
        data: $scope.userData
      }).then(function Success(res){
        var result = res.data;
        if(result.ret == 1){
          $scope.userData.user_email = "";
          $scope.userData.user_pwd = "";
          alert(result.data);
        }else{
          $scope.userData.user_email = "";
          $scope.userData.user_pwd = "";
          $window.location.href = '/main?id='+result.data;
        }
      }), function Fail(res){
        alert("Internal Error!");
      };
    }
  };
});
