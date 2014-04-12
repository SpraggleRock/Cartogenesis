class Round < ActiveRecord::Base
  belongs_to :game
  has_many :users_games
  after_initialize :assign_round_points

  def assign_round_points
    users_games do |usergames|
      users_games.points += (rand(6) +rand(6) + 2)
    end
  end
end
