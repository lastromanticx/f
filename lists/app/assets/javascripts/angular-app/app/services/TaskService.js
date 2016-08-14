function TaskService($http){
  this.postTask = function(task_hash){
    return $http.post('/tasks',task_hash);
  }
}

angular
  .module('app')
  .service('TaskService',TaskService);
