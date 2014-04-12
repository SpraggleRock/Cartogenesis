class Game < ActiveRecord::Base
  has_many :tiles
  has_one :board

end
