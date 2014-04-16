class Game < ActiveRecord::Base
  has_many :tiles
  has_one :board
  has_many :players
  has_many :users, through: :players
  has_many :ages
  has_many :turn_logs
  has_one :chronicle
  before_create :generate_url

  def generate_url
    lowercase_letters = ('a'..'z').to_a
    uppercase_letters = lowercase_letters.map(&:upcase)
    numbers = (0..9).to_a
    char_set = lowercase_letters + uppercase_letters + numbers
    self.slug = char_set.sample(30).join()
  end

  def assign_round_points
    self.players.each do |player|
      player.points = player.points + (rand(6) +rand(6) + 2)
      player.save
    end
  end

  def end_turn
    p '======================================='
    p self
    p '======================================='

    self.turn_counter = self.turn_counter + 1
    if self.turn_counter > self.players.length
        new_round
    end
    p '--------------------------------------------'
    p "turn counter:#{self.turn_counter}"
    p "round counter:#{self.round_counter}"
    p "active_player:#{self.active_player}"
    p "players in game:#{self.players.map(&:name)}"
    p '--------------------------------------------'

    next_player
  end

  def next_player
    p '++++++++++++++++++++++++++++++++++++++++'
    p 'next player is being called!!!'
    p '++++++++++++++++++++++++++++++++++++++++'
    self.active_player = self.players.order(id: :asc)[self.turn_counter - 1].id
  end

  def new_round
    p '--------------------------------------------'
    p 'starting a new round!'
    p '--------------------------------------------'
    self.round_counter = self.round_counter + 1
    self.update(turn_counter: 1)
    self.next_player
    assign_round_points
  end

end
