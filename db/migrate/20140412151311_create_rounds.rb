class CreateRounds < ActiveRecord::Migration
  def change
    create_table :rounds do |t|
      t.integer :game_id
      t.text :round_history

      t.timestamps
    end
  end
end
