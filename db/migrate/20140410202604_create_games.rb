class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :round_counter, default: 0
      t.integer :turn_counter, default: 0
      t.string :active_player
      t.timestamps
    end
  end
end
