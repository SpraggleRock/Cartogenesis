class GamesController < ApplicationController
  def new
    @game = Game.new(id: (Game.all.last.id + 1))
  end

  def index
  end

  def create
    @game = Game.create()
  end

  # def generate_board
  #   board = Board.create(board_size: 7)
  #   board.setup_board(25)
  #   @tiles = board.tiles

  #   render json: @tiles
  # end

  def update

  end

  # def show
  # end

  def json_params
    params.require(:_json)
  end
end
