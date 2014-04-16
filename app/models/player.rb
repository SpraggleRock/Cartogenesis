class Player < ActiveRecord::Base
  belongs_to :user
  belongs_to :game

  def self.find_or_create_by_all(params = {})
    if self.find_by(user_id: params[:user_id])
      player = self.find_by(user_id: params[:user_id])
      if (player.game_id == params[:game_id])
        return player
      else
        self.create(params)
      end
    else
      self.create(params)
    end
  end
end
