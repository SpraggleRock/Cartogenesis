class PlayersController < ApplicationController

  def create
    player = Player.find_or_create_by_all(game_id: params[:game_id],
      user_id: current_user.id, name: params[:player][:name])
    player.update(name: params[:player][:name])
    @game = player.game
    WebsocketRails[@game.slug.to_sym].trigger(:new_player, {player_name: player.name, username: current_user.username}.to_json)
    puts
  end


  # private
  #   def player_params
  #     params.require(:player).permit(:name)
  #   end


end
