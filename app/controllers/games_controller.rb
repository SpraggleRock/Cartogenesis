class GamesController < ApplicationController
  def new
    @game = Game.new()
  end

  def portal
    @game = Game.find(params[:id])
    render :create
  end

  def index
  end

  def create
    @game = Game.create
    board = Board.create(board_size: 7, game_id: @game.id)
    @game.board = board
    p json_params
    data = []
    json_params.each do |string|
      data.push(JSON.parse(string.to_json))
    end
    puts data
    data.each do |datum|
      board.tiles << Tile.create(coordinates: datum['coordinates'], terrain: datum['terrain'], radius: datum['radius'])
    end
    @tiles = board.tiles.order(id: :asc)
    @game.update(chronicle: Chronicle.create(initial_board_json: JSON.parse(board.tiles.to_json)))
    render json: board
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
