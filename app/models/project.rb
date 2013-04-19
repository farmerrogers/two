class Project < ActiveRecord::Base
  belongs_to :user
  has_many :tracks
  attr_accessible :index, :title

  accepts_nested_attributes_for :tracks  
  
end
