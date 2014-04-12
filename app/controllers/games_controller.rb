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

  end

  def start_game
    @game = Game.find(params[:id])
    new_players_params.each do |player|
      @game.players << Player.create(name: player, game_id: @game.id)
    end

    redirect_to play_game_path
  end

  def play_game
    #if @game.users.include?(current_user)
    # else redirect "you're not authorized to view that game"
    @game = Game.find(params[:id])
    @game.new_round
    @active_player = game.active_player
    @points = @active_player.points
  end

  # def show
  # end

  def json_params
    params.require(:_json)
  end

  def new_players_params
    params.require(:players)
  end
end
