class List < ApplicationRecord
  has_many :user_lists
  has_many :users, through: :user_lists
  has_many :tasks

  validates :name, presence: true

  def update_permission(user,permission)
    user_lists.where(user_id: user.id).first.update(permission: permission)
  end

  def permission(user)
    user_lists.where(user_id: user.id).first.permission
  end

  def collaborators=(emails)
    collaborator_list = emails.gsub(","," ").split(/\s+/).map{|email| User.find_by(email: email)}.compact
    creator = user_lists.where(permission: "creator").first.user 
    collaborator_list << creator
    self.users.clear
    collaborator_list.uniq.each do |u| 
      self.users << u
      update_permission(u, "collaborator")
    end
    update_permission(creator, "creator")
    save
  end

  def collaborators(include_creator=false)
    if include_creator
      users.map{|user| if permission(user) == "creator" then user.email + " (creator)" else user.email end}.join(", ")
    else
      users.select{|user| permission(user) != "creator"}.map(&:email).join(", ")
    end
  end

  def self.search(query, list_id, user_id)
    anchor = User.find_by(id: user_id)
    
    anchor = anchor.lists.find_by(id: list_id) if list_id.match(/\S/)
    return {error: "List #{list_id} was not found."} if anchor.nil? 

    anchor.tasks.joins(:tags).where("tasks.name LIKE '%#{query}%' OR tasks.description LIKE '%#{query}%' OR tags.name LIKE '%#{query}%'").distinct
  end
end
