function SessionService($http){
  var ctrl = this;

  ctrl.getUserInfo = function (login_hash){
    return $http.post('/sessions',login_hash);
  }

  ctrl.endSession = $http.delete('/sessions');
}

angular
  .module('app')
  .service('SessionService',SessionService);
