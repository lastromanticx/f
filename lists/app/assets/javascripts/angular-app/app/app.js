angular
  .module('app',['ui.router','templates'])
  .config(['$stateProvider', '$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider

    ///////* LISTS *///////
      .state('lists',{
        abstract: true,
        url: '',
        template: '<div ui-view></div>'
      })
      .state('lists.index',{
        url: '/lists',
        templateUrl: 'lists/index.html',
        controller: 'ListsIndexController as ctrl',
        resolve: {
          lists: function(ListService){
            return ListService.getLists().then(function(resp){
              return resp.data;
            });
          }
        }
      })
      .state('lists.new',{
        url: '/lists/new',
        controller: 'ListsCrudController as ctrl',
        templateUrl: 'lists/_form.html',
        resolve: {
          list: function(ListService){
            return {};
          }
        }
      })
      .state('lists.edit',{
        url: '/lists/:id/edit',
        controller: 'ListsCrudController as ctrl',
        templateUrl: 'lists/_form.html',
        resolve: {
          list: function($stateParams,ListService){
            return ListService.getList($stateParams.id).then(function(resp){
              return resp.data;
            });
          }
        }
      })
      .state('lists.show',{
        url: '/lists/:id',
        controller: 'ListsShowController as ctrl',
        templateUrl: 'lists/show.html',
        resolve: {
          list: function($stateParams,ListService){
            return ListService.getList($stateParams.id).then(function(resp){
              return resp.data;
            });
          }
        }
      })

    ///////* TASKS *///////

      .state('lists.task',{
        url: '/lists/:listId/tasks/:taskId',
        templateUrl: 'tasks/show.html',
        controller: 'TasksShowController as ctrl',
        resolve: {
          task: function($stateParams,TaskService){
            return TaskService.getTask($stateParams.taskId).then(function(resp){
              if (resp.data.error){
                alert(resp.data.error);
                $state.go('lists.index');

              } else {
                return resp.data;
              }
            });
          }
        }
      })
      .state('tasks',{
        abstract: true,
        url: '',
        template: '<div ui-view></div>'
      })
      .state('tasks.edit',{
        url: '/tasks/:id/edit',
        controller: 'TasksCrudController as ctrl',
        templateUrl: 'tasks/edit.html',
        resolve: {
          task: function($stateParams,TaskService){
            return TaskService.getTaskEdit($stateParams.id).then(function(resp){
              if (resp.data.error){
                alert(resp.data.error);
                $state.go('lists.index');

              } else {
                return resp.data;
              }
            });
          }
        }
      })

    ///////* TAGS *///////
      .state('tags',{
        abstract: true,
        url: '',
        template: '<div ui-view></div>'
      })
      .state('tags.index',{
        url: '/tags',
        templateUrl: 'tags/index.html'
      })

    ///////* SEARCH *///////

      .state('search',{
        url: '/search',
        templateUrl: 'search/index.html',
        controller: 'SearchController as ctrl'
      })

    ///////* USERS *///////
      .state('users',{
        url: '/accounts/myAccount',
        templateUrl: 'users/index.html',
        controller: 'UsersController as ctrl',
        resolve: {
          userInfo: function(SessionService){
            return SessionService.getUserInfo().then(function(resp){
              if (resp.data.error){
                alert("An error occurred: " + resp.data.error);
                $state.go('sessions.new');

              } else {
                return resp.data;
              }
            });
                               
          }
        }
      })

    ///////* SESSIONS *///////

      .state('sessions',{
        abstract: true,
        url: '',
        template: '<div ui-view></div>'
      })
      .state('sessions.new',{
        url: '/login',
        templateUrl: 'sessions/new.html',
        controller: 'SessionsController as ctrl'
      });

    $urlRouterProvider.otherwise('/lists');
  }])

  ///////* RUN *///////

  // http://stackoverflow.com/questions/27212182/angularjs-ui-router-how-to-redirect-to-login-page
  .run(function($rootScope, $location, $state, $window, SessionService) {

      $rootScope.$on( '$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

          var isLogin = toState.name === "sessions.new";
          if(isLogin){
             return; // no need to redirect 
          }

          // now, redirect only not authenticated
          if(!SessionService.loggedIn && !$window.localStorage.loggedIn) {
              e.preventDefault(); // stop current execution
              $state.go('sessions.new'); // go to login
          }
      });
  });
