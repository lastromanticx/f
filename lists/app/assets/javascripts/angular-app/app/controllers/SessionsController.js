function SessionsController(SessionService,$state,$window){
  var ctrl = this;

  ctrl.login = function(){
    SessionService.authenticateUser(ctrl.user).then(function(resp){
      if (resp.data.error){
        return alert(resp.data.error);

      } else {
        SessionService.user = new User(resp.data);

        // save a flag without sensitive info, to keep session locally across browser tabs 
        $window.localStorage.loggedIn = SessionService.loggedIn = true;

        $state.go('lists.index');
      }
    });
  }
}

angular
  .module('app')
  .controller('SessionsController',SessionsController);
