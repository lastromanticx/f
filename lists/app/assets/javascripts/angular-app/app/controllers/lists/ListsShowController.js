function ListsShowController(getListResponse){
  var ctrl = this;
  console.log(getListResponse)
}

angular
  .module('app')
  .controller('ListsShowController',ListsShowController);
