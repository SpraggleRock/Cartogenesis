class PlayersController < ApplicationController

def create
    @game = Game.find(params[:game_id])
    unless @game.in_game?(current_user)
      if params[:player][:name] == ""
        placeholderName = ["Odin", "Ra", "Baphamet", "Marduke", "Tiamat", "Zeus", "Hera", "Aphrodite", "Athena", "Gilgamesh"].sample
        player = Player.create(
          name: placeholderName,
          game: @game,
          user: current_user
        )
      else
        player = Player.create(
          name: params[:player][:name],
          game: @game,
          user: current_user
        )
      end
      WebsocketRails[@game.slug.to_sym].trigger(
        :new_player,
        {player_name: player.name, username: current_user.username}.to_json
        )
    end
  end
end
