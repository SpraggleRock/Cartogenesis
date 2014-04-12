class Age < ActiveRecord::Base
  belongs_to :game
  has_many :players, through: :game

  def assign_round_points
    self.players.each do |player|
      player.points = player.points + (rand(6) +rand(6) + 2)
      player.save
    end
  end
end
