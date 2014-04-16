class LandmarksController < ApplicationController

  def create
    p '========================================='
    p params
    p '========================================='

    Landmark.create(name: params[:name], description: params[:description], tile_id: params[:tile_id])

    render nothing: true
  end

end