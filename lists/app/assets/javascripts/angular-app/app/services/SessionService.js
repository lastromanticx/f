function SessionService($http){
  var svc = this;

  svc.user = null;
  svc.loggedIn = false;

  svc.getUserInfo = function (login_hash){
    return $http.post('/sessions',login_hash);
  }

  svc.endSession = function(){
    return $http.delete('/sessions');
  }
}

angular
  .module('app')
  .service('SessionService',SessionService);
