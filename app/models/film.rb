class Film < ActiveRecord::Base
  has_one :category
  has_many :attachments
end
