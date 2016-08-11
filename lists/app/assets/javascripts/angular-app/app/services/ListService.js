function ListService($http){
  this.getLists = $http.get('/lists.json');
}

angular
  .module('app')
  .service('ListService',ListService);
