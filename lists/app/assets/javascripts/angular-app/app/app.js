angular
  .module('app',['ui.router','templates'])
  .config(function($stateProvider,$urlRouterProvider){
    $stateProvider
      .state('lists',{
        url: '/lists',
        templateUrl: 'lists/index.html',
        controller: 'ListsController as ctrl',
        resolve: {
          getListsResponse: function(ListService){
            return ListService.getLists
          }
        }
      });

    $urlRouterProvider.otherwise('/lists');
  });
