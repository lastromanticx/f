var List = function(list_hash){
  this.id = list_hash.id;
  this.name = list_hash.name;
  this.editable = list_hash.editable;
  this.collaborators = list_hash.collaborators;
  this.tasks = list_hash.tasks;
  this.errors = list_hash.errors;

  this.linkHTMLString = function(){
    return '<a href="/lists/' + this.id + '">' + this.name + '</a>'
  }

  this.editLinkHTMLString = function(){
    return this.editable ? '<a href="/lists/' + this.id + '/edit">Edit</a>' : '';
  }
}
