class Track < ActiveRecord::Base
  belongs_to :project
  belongs_to :user
  attr_accessible :file, :index, :title
  
  validates_presence_of :project
end
