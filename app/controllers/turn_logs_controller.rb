class TurnLogsController < ApplicationController

  def create
    p "heres some params +++++++++++++++++++++++++++++++++++++"
    p params['turn_log']['board_json']
    p '+++++++++++++++++++++++++++++++++++++++++++++++++++++++'
    turn_log = TurnLog.create(documentation: params['turn_log']['documentation'], game_id: params['turn_log']['game_id'],
      board_json: params['turn_log']['board_json'])
    # puts params
    # params['turn_log']['board_json'].each do |tile_object|
    #   turn_log.board_json += tile_object.to_s
    # end
    # turn_log.save
  end
end
# board_json: [:radius, :terrain],
