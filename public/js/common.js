var app = angular.module('commonService', []);

app.service('commonService', function(){
  this.checkId = function(id){
    if(angular.isUndefined(id) || id == null || id.length == 0 || angular.equals({}, id)){
      return false;
    }else{
      return true;
    }
  }
});
