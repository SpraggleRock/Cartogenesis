class Board < ActiveRecord::Base
  has_many :tiles
  belongs_to :game
end
