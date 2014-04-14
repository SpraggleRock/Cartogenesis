class TurnLog < ActiveRecord::Base
  has_one :active_player, through: :players
  has_one :chronicle
  has_one :game

end
