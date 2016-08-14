function SessionsController(SessionService,$state,$window){
  var ctrl = this;

  ctrl.login = function(){
    SessionService.getUserInfo(ctrl.user).then(function(resp){
      if (resp.data.error){
        return alert(resp.data.error);

      } else {
        SessionService.user = new User(resp.data);
        $window.localStorage.loggedIn = SessionService.loggedIn = true;
        $window.localStorage.user = JSON.stringify(SessionService.user);
        $state.go('lists.index');
      }
    });
  }
}

angular
  .module('app')
  .controller('SessionsController',SessionsController);
