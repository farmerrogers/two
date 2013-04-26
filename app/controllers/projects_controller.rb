class ProjectsController < ApplicationController

	before_filter :authenticate_user!

	def index
		@projects = Project.all
	end

	def new
		@project = Project.new
	end
	
	def create
		@project = Project.new
		@project.title = params[:project][:title]
		@project.save
		redirect_to @project
	end
	
	def show
		@project = Project.find(params[:id])
	end
	
	def edit
	end
	
	def update
	end
	
	def destroy
		@project = Project.find(params[:id])
		@project.destroy
		redirect_to(projects_path(@project))
	end
	
	

end
