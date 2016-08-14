function UsersController(SessionService,$state,$window){
  var ctrl = this;

  ctrl.user = JSON.parse($window.localStorage.user);

  ctrl.logout = function(){
    SessionService.endSession().then(function(resp){
      if (!resp.data.match('successful')){
        alert("An error occurred processing the request.\nSigning out locally.");
      }

      SessionService.user = null;
      delete $window.localStorage.user;
      SessionService.loggedIn = null;
      delete $window.localStorage.loggedIn;

      $state.go('sessions.new');
    });
  }

}

angular
  .module('app')
  .controller('UsersController',UsersController);
