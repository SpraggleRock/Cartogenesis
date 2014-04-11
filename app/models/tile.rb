class Tile < ActiveRecord::Base
  belongs_to :game
  belongs_to :board

  NEIGHBOR_VECTORS = [ [+1, -1,  0], [+1,  0, -1], [ 0, +1, -1], [-1, +1,  0], [-1,  0, +1], [ 0, -1, +1] ]

  def neighbors
    neighbor_coords = NEIGHBOR_VECTORS.map { |vector| self.add_coords(vector) }
    neighbor_coords.map{ |coord| Tile.where(coordinates: coord.join(", "))}
  end

  def coordinate_array
    coordinates.split(", ").map(&:to_i)
  end

  def is_neighbor?(tile)
    (tile.a - self.a).abs < 1 && (tile.b - self.b).abs < 1 && (tile.c - self.c).abs < 1
  end

  def add_coords(coords)
    own_coords = self.coordinates.split(", ").map(&:to_i)
    puts own_coords
    [own_coords[0] + coords[0], own_coords[1] + coords[1], own_coords[2] + coords[2]]
  end
end
