class Board < ActiveRecord::Base
  has_many :tiles
  belongs_to :game

  def setup_board(tile_radius)
    (-board_size..board_size).to_a.each do |x|
      (-board_size..board_size).to_a.each do |y|
        (-board_size..board_size).to_a.each do |z|
          self.tiles << Tile.new(radius: tile_radius,
            a: x, b: y, c: z) if x + y + z == 0
        end
      end
    end
  end
end
