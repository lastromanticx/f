var Task = function(task_hash){
  this.id = task_hash.id;
  this.name = task_hash.name;
  this.description = task_hash.description;
  this.status = task_hash.status;
  this.format_due_date = task_hash.format_due_date;
  this.dueDateString = task_hash.due_date_string
  this.listId = task_hash.list_id;
  this.tags = task_hash.tags
  this.errors = task_hash.errors;

  this.tagNames = function(){
    return this.tags.map(x => x.name).join(", ");
  }
};
