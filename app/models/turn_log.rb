class TurnLog < ActiveRecord::Base
  belongs_to :active_player, through: :players
  belongs_to :chronicle
  belongs_to :game

end
