class Chronicle < ActiveRecord::Base
  has_many :turn_logs
  belongs_to :game
end
