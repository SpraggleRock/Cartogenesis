class Round < ActiveRecord::Base
  belongs_to :game
  has_many :users through :game
  after_initialize :assign_round_points

  def assign_round_points


end
