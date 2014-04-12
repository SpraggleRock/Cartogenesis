class Game < ActiveRecord::Base
  has_many :tiles
  has_one :board
  has_many :users through :users_games
  has many :users_games
  has_many :rounds
end
