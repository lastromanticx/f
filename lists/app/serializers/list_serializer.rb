class ListSerializer < ActiveModel::Serializer
  include Policy

  attributes :id, :name, :collaborators, :editable, :errors, :all_tags
  has_many :tasks, serializer: ListTaskSerializer

  def collaborators
    object.collaborators(true)
  end

  def editable
    true
    authorize_resource(current_user,object,:edit)
  end
  
  # add all tags for task form on list show page
  def all_tags
    Tag.all.map{|tag| {id: tag.id, name: tag.name}}
  end
end
