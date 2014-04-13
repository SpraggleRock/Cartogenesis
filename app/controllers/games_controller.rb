class GamesController < ApplicationController
  def new
    @game = Game.new(id: (Game.all.last.id + 1))
  end

  def index
  end

  def create
    @game = Game.create()
    @game.board = Board.find(session[:board_id])
  end

  def update
    @game = Game.find(params[:id])
    @board = Board.find_by(game_id: params[:id])
    @game.end_turn
    @game.save

    redirect_to play_game_path
  end

  def start_game
    @game = Game.find(params[:id].to_i)
    puts params
    params[:players].each do |player|
      @game.players << Player.create!(name: player)
    end
    @game.active_player = @game.players[0].id
    @game.save
    redirect_to play_game_path
  end

  def play_game
    #if @game.users.include?(current_user)
    # else redirect "you're not authorized to view that game"
    @game = Game.find(params[:id])
    @points = Player.find(@game.active_player).points
  end

  # def show
  # end

  def json_params
    params.require(:_json)
  end

  # def new_players_params
  #   params.require(:players)
  # end
end
