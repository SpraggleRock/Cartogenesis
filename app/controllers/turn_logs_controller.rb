class TurnLogsController < ApplicationController

  def create
    p "heres some params +++++++++++++++++++++++++++++++++++++"
    puts
    puts
    puts
    puts
    puts
    p params['turn_log']['chronicle_id']
    puts
    puts
    puts
    p '+++++++++++++++++++++++++++++++++++++++++++++++++++++++'
    game = Game.find(params['turn_log']['game_id'])
    active_player = Player.find(game.active_player)
    chronicle = Chronicle.find(params['turn_log']['chronicle_id'])
    turn_log = TurnLog.create(
      documentation: params['turn_log']['documentation'],
      board_json: params['turn_log']['board_json'],
      active_player: active_player
      )
    chronicle.turn_logs << turn_log

    # puts params
    # params['turn_log']['board_json'].each do |tile_object|
    #   turn_log.board_json += tile_object.to_s
    # end
    # turn_log.save
  end

  def show
    @turn_log = TurnLog.find(params[:id])
  end
end
# board_json: [:radius, :terrain],
