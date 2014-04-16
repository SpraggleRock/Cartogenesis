class LandmarksController < ApplicationController

  def create
    Landmark.create(name: params[:name], description: params[:description], coordinates: params[:coordinates])
  end

end