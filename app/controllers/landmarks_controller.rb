class LandmarksController < ApplicationController

  def create
    @landmark = Landmark.create(name: params[:name], description: params[:description], tile_id: params[:tile_id])
    @tile = Tile.find(@landmark.tile_id)
    @tile.landmark = true
    @tile.save
    render nothing: true
  end

end
