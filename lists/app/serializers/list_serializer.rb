class ListSerializer < ActiveModel::Serializer
  include Policy

  attributes :id, :name, :collaborators, :editable, :errors
  has_many :tasks, serializer: ListTaskSerializer

  def collaborators
    object.collaborators(true)
  end

  def editable
    true
    #authorize_resource(current_user,object,:edit)
  end
end
