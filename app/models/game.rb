class Game < ActiveRecord::Base
  has_many :tiles
  has_one :board
  has_many :users
  has_many :rounds



end
