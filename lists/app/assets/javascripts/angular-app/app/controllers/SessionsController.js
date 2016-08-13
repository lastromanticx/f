function SessionsController(SessionService,$state){
  var ctrl = this;

  ctrl.user = {};

  ctrl.authenticateUser = function(){
    SessionService.getUserInfo(ctrl.user).then(function(resp){
      if (resp.data.error){
        alert(resp.data.error);

      } else {
        UsersController.user = {email: resp.data.email, id: resp.data.id};
        $state.go('users');
      }
    });
  }

  ctrl.logout = function(){
    console.log(SessionService.endSession);
  }
}

angular
  .module('app')
  .controller('SessionsController',SessionsController);
