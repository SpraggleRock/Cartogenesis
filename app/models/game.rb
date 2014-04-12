class Game < ActiveRecord::Base
  has_many :tiles
  has_one :board
  has_many :players
  has_many :users, through: :players
  has_many :ages


  def assign_round_points
    self.players.each do |player|
      player.points = player.points + (rand(6) +rand(6) + 2)
      player.save
    end
  end

end
