class GamesController < ApplicationController
  def new
    @game = Game.new(id: (Game.all.last.id + 1))
  end

  def index
  end

  def create
    @game = Game.create()
  end

  def update

    render nothing: true
  end

  # def show
  # end

  def json_params
    params.require(:_json)
  end
end
