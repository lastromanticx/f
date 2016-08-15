function UsersController(userInfo,SessionService,$state,$window){
  var ctrl = this;

  ctrl.user = new User(userInfo);

  ctrl.logout = function(){
    SessionService.endSession().then(function(resp){
      if (!resp.data.match('successful')){
        alert("An error occurred processing the request.\nSigning out locally.");
      }

      SessionService.user = null;
      SessionService.loggedIn = null;
      delete $window.localStorage.loggedIn;

      $state.go('sessions.new');
    });
  }

}

angular
  .module('app')
  .controller('UsersController',UsersController);
