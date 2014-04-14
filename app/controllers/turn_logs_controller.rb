class TurnLogsController < ApplicationController

  def create
    p "heres some params +++++++++++++++++++++++++++++++++++++"
    p params['turn_log']['board_json']
    p '+++++++++++++++++++++++++++++++++++++++++++++++++++++++'
    game = Game.find(params['turn_log']['game_id'])
    turn_log = TurnLog.create(documentation: params['turn_log']['documentation'], board_json: params['turn_log']['board_json'])
    game.chronicle.turn_logs << turn_log

    # puts params
    # params['turn_log']['board_json'].each do |tile_object|
    #   turn_log.board_json += tile_object.to_s
    # end
    # turn_log.save
  end
end
# board_json: [:radius, :terrain],
