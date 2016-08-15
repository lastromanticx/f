function TasksShowController(task){
  var ctrl = this;

  ctrl.task = new Task(task);
}

angular
  .module('app')
  .controller('TasksShowController',TasksShowController);
