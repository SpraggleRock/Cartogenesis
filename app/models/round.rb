class Round < ActiveRecord::Base
  belongs_to :game
  has_many :players, through: :game
  after_initialize :assign_round_points

  def assign_round_points
    players do |player|
      player.points += (rand(6) +rand(6) + 2)
    end
  end
end
