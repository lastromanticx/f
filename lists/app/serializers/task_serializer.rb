class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :format_due_date, :status, :errors
  has_many :tags

  def format_due_date
    object.format_due_date if object.due_date
  end
end
