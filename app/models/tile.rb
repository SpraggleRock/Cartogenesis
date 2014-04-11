class Tile < ActiveRecord::Base
  belongs_to :game
  belongs_to :board

  def neighbors
  end

  def is_neighbor?
  end
end
