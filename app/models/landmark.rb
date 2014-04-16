class Landmark < ActiveRecord::Base
  belongs_to :tile
  belongs_to :board
  belongs_to :game
end
