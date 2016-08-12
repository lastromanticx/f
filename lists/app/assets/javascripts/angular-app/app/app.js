angular
  .module('app',['ui.router','templates'])
  .config(['$stateProvider', '$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider

    ///////* LISTS *///////
      .state('lists',{
        url: '',
        templateUrl: 'lists/ui_view.html'
      })
      .state('lists.index',{
        url: '/lists',
        templateUrl: 'lists/index.html',
        controller: 'ListsIndexController as ctrl',
        resolve: {
          getListsResponse: function(ListService){
            return ListService.getLists
          }
        }
      })
      .state('lists.show',{
        url: '/lists/:id',
        controller: 'ListsShowController as list',
        templateUrl: 'lists/show.html',
        resolve: {
          getListResponse: function($stateParams,ListService){
            return ListService.getList($stateParams.id);
          }
        }
      })
      .state('lists.new',{
        url: '/lists/new',
        controller: 'ListsNewController as ctrl',
        templateUrl: 'lists/new.html'
      })
      .state('lists.edit',{
        url: '/lists/:id/edit',
        controller: 'ListsEditController as ctrl',
        templateUrl: 'lists/edit.html'
      })
  
    ///////* USERS *///////
      .state('users',{
        url: '/users',
        templateUrl: 'users/index.html',
        controller: 'UsersController as ctrl',
        resolve: {
        }
      });

    $urlRouterProvider.otherwise('/lists');
  }]);
