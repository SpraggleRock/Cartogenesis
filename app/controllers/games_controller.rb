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
    data = []
    json_params.each do |string|
      data.push(JSON.parse(string.to_json))
    end
    data.each do |datum|
      board.tiles << Tile.create(coordinates: datum['coordinates'], terrain: datum['terrain'], radius: datum['radius'])
    end
    @tiles = board.tiles.order(id: :asc)
    @game.update(chronicle: Chronicle.create(initial_board_json: JSON.parse(board.tiles.to_json)))
    render json: @game
  end

  def update
    @game = Game.find(params[:id])
    @board = Board.find_by(game_id: params[:id])
    points = params[:points][:to_s]
    player = Player.find(@game.active_player)
    puts points
    player.points = points
    player.save
    @game.end_turn
    @game.save
    puts "sendgin end turn event==============================="
    puts
    puts
    WebsocketRails[@game.slug.to_sym].trigger(:end_turn, {board_json: @tiles, myTurn: true})
    puts
    puts
    puts "========================================================"

    redirect_to play_game_path
  end

  def join_game
    @game = Game.find_by(slug: join_game_params)
  end

  def start_game
    @game = Game.find(params[:id].to_i)
    puts params
    @game.players.each do |player|
      @game.players << Player.create(name: player)
    end
    @game.active_player = @game.players[0].id
    @game.assign_round_points
    @game.save
    redirect_to play_game_path(@game.slug)
  end

  def play_game
    #if @game.users.include?(current_user)
    # else redirect "you're not authorized to view that game"
    @game = Game.find_by(slug: params[:game_slug])
    @players = @game.players.order(id: :asc)
    @points = Player.find(@game.active_player).points
  end

  # def show
  # end

  def json_params
    params.require(:_json)
  end

  def join_game_params
    params.require(:game_slug)
  end

  # def new_players_params
  #   params.require(:players)
  # end
end
