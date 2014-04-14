class TurnLog < ActiveRecord::Base
  belongs_to :active_player, class_name: 'Player'
  belongs_to :chronicle
  belongs_to :game

end
