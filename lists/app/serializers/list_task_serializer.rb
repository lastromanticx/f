class ListTaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :status, :format_due_date
end
