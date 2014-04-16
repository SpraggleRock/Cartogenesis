class BoardController < ApplicationController

  def new
    @tiles = Tile.tileset(params[:size])
    render json: @tiles
  end

  def create
    board = Board.create(board_size: 7)
    data = []
    json_params.each do |string|
      data.push(JSON.parse(string.to_json))
    end
    data.each do |datum|
      board.tiles << Tile.create(coordinates: datum['coordinates'], terrain: datum['terrain'], radius: datum['radius'])
    end
    @tiles = board.tiles.order(id: :asc)
  end

  def show
    board = Board.find_by(game_id: params[:id])
    @tiles = board.tiles.order(id: :asc)
    render json: @tiles
  end

  def update
    data = []
    json_params.each do |string|
      data.push(JSON.parse(string.to_json))
    end
    data.each do |datum|
      tile = Tile.find(datum['id'])
      tile.update_attribute(:terrain, datum['terrain'])
    end
    render nothing: true
  end

  def json_params
    params.require(:_json)
  end
end
