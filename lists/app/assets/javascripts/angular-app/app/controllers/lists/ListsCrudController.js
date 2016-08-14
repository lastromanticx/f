function ListsCrudController(list,ListService,$state){
  var ctrl = this;

  ctrl.list = list;

  // remove the creator from the list of collaborators
  if (ctrl.list.collaborators){
    ctrl.list.collaborators = 
      ctrl.list.collaborators.split(',')
                             .filter(x => !x.match('creator'))
                             .map(x => x.replace(/^\s+|\s+$/,""))
                             .join(',');
  }

  ctrl.formData = {
    list: {
      name: ctrl.list.name, 
      collaborators: ctrl.list.collaborators
    }
  }

  // add list id if updating rather than creating
  if (ctrl.list.id){
    ctrl.formData.list.id = ctrl.list.id;
  }

  ctrl.createOrUpdate = function(){
    if (!ctrl.formData.list.collaborators){
      ctrl.formData.list.collaborators = '';
    }

    switch (ctrl.list.id){
      case undefined:
        ListService.postList(ctrl.formData).then(function(resp){
          if (resp.data.error){
            alert("An error occured: " + resp.data.error);        

          } else {
            $state.go('lists.show',{id: resp.data.id});
          }
        });
        break;

      default:
        ListService.updateList(ctrl.formData).then(function(resp){
          if (resp.data.error){
            alert("An error occured: " + resp.data.error);        

          } else {
            $state.go('lists.show',{id: resp.data.id});
          }
        });
        break;
    }
  }; 

  ctrl.deleteList = function(){
    if (confirm("Are you sure?")){
      ListService.deleteList(ctrl.list.id).then(function(resp){
        if (resp.data.error){
          alert("An error occured: " + resp.data.error);

        } else {
          $state.go('lists.index');
        }
      });
    }
  }
}

angular
  .module('app')
  .controller('ListsCrudController',ListsCrudController);
