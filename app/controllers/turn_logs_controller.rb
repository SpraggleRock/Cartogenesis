class TurnLogsController < ApplicationController

  def create
    puts "in turn log create-------------------------------------------"
    p params['turn_log']['chronicle_id']
    game = Game.find(params['turn_log']['game_id'])
    active_player = Player.find(game.active_player)
    chronicle = Chronicle.find(params['turn_log']['chronicle_id'])
    turn_log = TurnLog.create(
      documentation: params['turn_log']['documentation'],
      board_json: params['turn_log']['board_json'],
      active_player: active_player,
      game_id: game.id
      )
    chronicle.turn_logs << turn_log
  end

  def show
    @turn_log = TurnLog.find(params[:id])
    @chronicle = Chronicle.find(params[:chronicle_id])
    logs = @chronicle.turn_logs.order(id: :asc)
    @turn_log = @chronicle.turn_logs.find(params[:id])
    next_index = logs.find_index{|log| log.id == @turn_log.id} + 1
    if logs[next_index]
      @next = logs[next_index].id
    end
  end

  def return_json
   @turn_log = TurnLog.find(params[:id])

   render json: @turn_log.board_json
  end
end
# board_json: [:radius, :terrain],
