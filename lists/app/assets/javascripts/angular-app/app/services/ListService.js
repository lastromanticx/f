function ListService($http){
  this.getLists = $http.get('/lists.json');

  this.getList = function(id){
    return $http.get('/lists/' + id + '.json');
  }
}

angular
  .module('app')
  .service('ListService',ListService);
