class GamesController < ApplicationController
  def new
    @game = Game.create()
  end

  def index
  end

  def create


  end

  def generate_board
    board = Board.create(board_size: 7)
    board.setup_board(25)
    @tiles = board.tiles

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

  def show
  end

  def game_params
    params.require(:game).permit(:svg)
  end

  def json_params
    params.require(:_json)
  end
end
