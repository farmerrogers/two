class Track < ActiveRecord::Base
  belongs_to :project
  belongs_to :user
  attr_accessible :file, :index, :title, :wav
  
  validates_presence_of :project
  mount_uploader :wav, WavUploader
end
