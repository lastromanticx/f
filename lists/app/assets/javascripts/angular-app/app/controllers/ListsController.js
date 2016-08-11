function ListsController(getListsResponse){
  var ctrl = this;

  ctrl.lists = [];

  angular.forEach(getListsResponse.data,function(listHash){
    ctrl.lists.push(new List(listHash));
  });
}

angular
  .module('app')
  .controller('ListsController',ListsController);
