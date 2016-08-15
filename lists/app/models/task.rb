class Task < ApplicationRecord
  belongs_to :list
  has_many :task_tags
  has_many :tags, through: :task_tags

  validates_presence_of :name
  validate :date_format

  scope :overdue, -> {
    all.select(&:overdue)
  }

  def date_format
    errors.add(:due_date, "Please format the due date as indicated YYYY-MM-DD") if due_date.nil?
  end

  def tags_attributes=(tag_attributes)
    tag = Tag.find_or_create_by(tag_attributes.values[0]) if tag_attributes.values[0]["name"].match(/[a-zA-Z]/)
    tags << tag if tag and not tags.include?(tag)
  end

  def overdue
    due_date < Time.now
  end

  def format_due_date
    due_date.strftime("%A, %B %e, %Y") + (overdue ? " (OVERDUE)" : "")
  end

  def due_date_string
    due_date.strftime("%Y-%m-%d")    
  end

  def serialize_with_all_tags
    {
      id: id,
      name: name,
      description: description,
      due_date_string: due_date_string,
      status: status,
      tags: tags.map(&:id),
      all_tags: Tag.all.map{|tag| {id: tag.id, name: tag.name}}
    }
  end
end
