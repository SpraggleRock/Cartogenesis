class Game < ActiveRecord::Base
  has_many :tiles
  has_one :board
  has many :players
  has_many :users, through: :players
  has_many :rounds
end
