class Chronicle < ActiveRecord::Base
  has_many :turn_logs
  has_one :game
end
