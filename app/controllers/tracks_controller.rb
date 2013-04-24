class TracksController < ApplicationController

	def index
		@tracks = Track.all
	end
	
	def new
		@track = Track.new
		@track.project_id = params[:project_id]
	end
	
	def create
		@track = Track.new
		@track.project_id = params[:track][:project_id]
		@track.title = params[:track][:title]
		@track.wav = params[:track][:wav]
		@track.save
		redirect_to(project_path(@track.project, @track))
	end
	
	def show
		@track = Track.find(params[:id])
	end
	
	def edit
	end
	
	def update
	end
	
	def destroy
		@track = Track.find(params[:id])
		@track.destroy
		redirect_to(project_path(@track.project, @track))
	end

end
