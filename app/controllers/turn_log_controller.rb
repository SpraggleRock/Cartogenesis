class TurnLogController < ApplicationController

  def create
    TurnLog.create(documentation: params[:documentation], board_json: params[:board_json], game_id: params[:game_id])
  end
end
