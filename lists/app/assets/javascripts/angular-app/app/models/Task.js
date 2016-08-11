var Task = function(task_hash){
  this.id = task_hash.id;
  this.name = task_hash.name;
  this.description = task_hash.description;
  this.status = task_hash.status;
  this.format_due_date = task_hash.format_due_date;
  this.listId = task_hash.list_id;
  this.tags = task_hash.tags
  this.errors = task_hash.errors;

  this.linkHTMLString = function(){
    return '<a href="/lists/' + this.listId + '/tasks/' + this.id + '">' + this.name + '</a>'
  }

  this.listTaskHTML = function(){
    return '<h5>' + this.linkHTMLString() + '</h5>' +
           '<p>Due: ' + this.format_due_date + '<p>' +
           '<p>Status:  ' + this.status + '</p>' +
           '<hr >'
  }

  this.format_errors = function(){
    var html = '';

    $.each(this.errors, function(attr,error){
      html += '<p>' + attr.split('_').map(x => x.capitalize()).join(' ') + ': ' + error + '</p>'
    });

    return html;
  }
};
