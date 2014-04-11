class Tile < ActiveRecord::Base
  has_many :adjacencies
  has_many :neighbors, through: :adjacencies, source: :tile, foreign_key: "neighbor_id"
  belongs_to :game
end
