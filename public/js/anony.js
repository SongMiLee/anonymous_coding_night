var app = angular.module('anony',['ngMaterial', 'ngRoute','angular-encryption', 'commonService']);
var global_user_id = '';

app.config(function($locationProvider, $routeProvider){
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

app.controller('navController', function($scope, $window, $http){
  $scope.pageMove = function(path){
    $window.location.href = path;
  }

  $scope.logout = function(){
    $http({
      method : "POST",
      url    : '/api/logout',
    }).then(function Success(res){
      var ret = res.data.ret;
      if(ret == 1){
        alert(res.data.data);
      }else{
        $window.location.href = '/main';
      }
    }), function Fail(res){
      alert("Sorry Internal Error");
    };
  }
});

app.controller('modiFeed', function($scope, $window, $http, $location, commonService){
  $scope.feedData = {};

    $http({
      method: "POST",
      url: "/api/loadfeed"
    }).then(function Success(res){
      if(res.data.ret == 0){
        var total = res.data.data;
        $scope.feedBox = total;

        console.log(total);
      }else{
        alert(res.data.data);
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

app.controller('loginControl', function($scope, $http, $window, sha256){

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
            $window.location.href = '/main/feed';
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
          $window.location.href = '/main/feed';
        }
      }), function Fail(res){
        alert("Internal Error!");
      };
    }
  };
});

app.controller('myInfoController', function($scope, $http, sha256){
  var choose = "minfo";
  $scope.user = {};

  getInfo($http, $scope);

  $scope.isActive = function(info){
    return choose == info;
  };

  $scope.getMyInfo = function(){
    choose = "minfo";
    getInfo($http, $scope);
  };

  $scope.getMyFeed = function(){
    choose = "mfeed";

    $http({
      method: "POST",
      url: "/api/loadmyfeed"
    }).then(function Success(res){
      if(res.data.ret == 0){
        var total = res.data.data;
        $scope.feedBox = total;
      }else{
        alert(res.data.data);
      }
    }), function Fail(res){
      alert("load Fail");
    };
  }

  $scope.updateInfo = function(){

    var cur_pwd = sha256.convertToSHA256($scope.current_pwd);

    if(cur_pwd == $scope.user.user_pwd){
      var cha_pwd = sha256.convertToSHA256($scope.change_pwd);
      var con_pwd = sha256.convertToSHA256($scope.confirm_pwd);

      if(cha_pwd == con_pwd){
        $scope.user.user_pwd = con_pwd;

        $http({
          method  : "POST",
          url     : "/api/updateinfo",
          data    : $scope.user,
        }).then(function Success(res){
          var ret = res.data.ret;

          if(ret == 0){
            alert("Password Updated!");
            $scope.current_pwd = '';
            $scope.change_pwd = '';
            $scope.confirm_pwd = '';
          } else{
            alert(res.data.data);
          }
        }), function Fail(res){
          alert("Internal Error!");
        };
      }else{
        alert("Password don't match");
      }
    } else {
      alert("You enter the wrong password");
    }
  }
});

function getInfo($http, $scope){
  $http({
    method : "POST",
    url    : "/api/getinfo",
  }).then(function Success(res){
    if(res.data.ret == 0){
      var data = res.data.data;
      console.log(data);
      $scope.user.user_email = data.user_email;
      $scope.user.user_pwd   = data.user_pwd;
    } else{
      alert(res.data.data);
    }

  }), function Fail(result){
    alert("Internal Error!");
  };
}
