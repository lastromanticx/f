class User < ApplicationRecord
  enum role: [:user, :admin]

  has_many :user_lists
  has_many :lists, through: :user_lists
  has_many :tasks, through: :lists

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = auth.info.email || "place@holder.email"
      user.password = Devise.friendly_token[0,20]
      end
  end
end
