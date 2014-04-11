class GamesController < ApplicationController
  def new
  end

  def index
  end

  def create
    @game = Game.create(game_svg: params[:svg])
  end

  def show
  end

  def game_params
    params.require(:game).permit(:svg)
  end
end
