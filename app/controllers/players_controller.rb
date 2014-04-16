class PlayersController < ApplicationController

  def create
    player = Player.find_or_create_by(player_params)
    player.update(user_id: current_user.id)
    player.update(game_id: params[:game_id])
    @game = player.game
    WebsocketRails[@game.slug.to_sym].trigger(:new_player, {player_name: player.name, username: current_user.username}.to_json)
    puts
  end


  private
    def player_params
      params.require(:player).permit(:name)
    end


end
