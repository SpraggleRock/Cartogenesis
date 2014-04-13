class BoardController < ApplicationController

  def create
    board = Board.create(board_size: 7)
    board.setup_board(25)
    @tiles = board.tiles

    render json: @tiles
  end

  def show
    board = Board.find_by(game_id: params[:id])
    @tiles = board.tiles

    puts "I'm here"

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
