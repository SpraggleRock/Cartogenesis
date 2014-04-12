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

  def end_turn
    self.turn_counter = self.turn_counter + 1
    if self.turn_counter > self.players.length
        new_round
    end
    next_player
  end

  def next_player
    active_player = player[turn_counter]
  end

  def new_round
    self.round_counter = self.round_counter + 1
    self.turn_counter = 0
  end

end
