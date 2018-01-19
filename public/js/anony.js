var app = angular.module('anony',['ngMaterial', 'ngRoute','angular-encryption', 'commonService']);
var global_user_id = '';

app.config(function($locationProvider, $routeProvider){
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

app.controller('navController', function($scope, $window){
  $scope.pageMove = function(path){
    $window.location.href = path;
  }
});

app.controller('modiFeed', function($scope, $window, $http, $location, commonService){
  $scope.feedData = {};

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

  $scope.signIn = function(){
      if($scope.user_email == null || $scope.user_pwd == null){
        alert("입력 값을 다시 확인해 주십시오");
      }else{
        var pwd = sha256.convertToSHA256($scope.user_pwd);

        var userData = {
          user_email : $scope.user_email,
          user_pwd   : pwd,
        };
        //로그인
        $http({
          method:"POST",
          url: "/api/signin",
          data: userData
        }).then(function Success(res){
          var result = res.data;
          if(result.ret == 1){
            $scope.user_email = "";
            $scope.user_pwd = "";
            alert(result.data);
          }else{
            $scope.user_email = "";
            $scope.user_pwd = "";
            $window.location.href = '/main';
          }
        }), function Fail(res){
          alert("Internal Error!");
        };
      }
  };

  $scope.signUp = function(){
    if($scope.user_email == null || $scope.user_pwd == null){
      alert("입력 값을 다시 확인해 주십시오");
    }else{
      var pwd = sha256.convertToSHA256($scope.user_pwd);

      var userData = {
        user_email : $scope.user_email,
        user_pwd   : pwd,
      };

      //가입
      $http({
        method:"POST",
        url: "/api/signup",
        data: userData
      }).then(function Success(res){
        var result = res.data;
        if(result.ret == 1){
          $scope.user_email = "";
          $scope.user_pwd = "";
          alert(result.data);
        }else{
          $scope.user_email = "";
          $scope.user_pwd = "";
          $window.location.href = '/main';
        }
      }), function Fail(res){
        alert("Internal Error!");
      };
    }
  };
});

app.controller('myInfoController', function($scope, $http){
  var choose = "minfo";

  $scope.isActive = function(info){
    return choose == info;
  };

  $scope.getMyInfo = function(){
    choose = "minfo";
  };

  $scope.getMyFeed = function(){
    choose = "mfeed";
  }
});
