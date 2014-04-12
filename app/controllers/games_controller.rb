class GamesController < ApplicationController
  def new
    @game = Game.create(game_svg: params[:svg])
  end

  def index
  end

  def create


  end

  def generate_board
    board = Board.create(board_size: 7)
    board.setup_board(25)
    @tiles = board.tiles

    puts "------------------------------------"
    puts
    p @tiles.inspect
    puts
    puts "-----------------------------------------"
    render json: @tiles

    # respond_to do |format|
    #   format.json {render :json => @tiles}
    # end
  end

  def show
  end

  def game_params
    params.require(:game).permit(:svg)
  end
end
