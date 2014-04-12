class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.integer :game_id
      t.integer :user_id
      t.integer :points
      t.string :player_name

      t.timestamps
    end
  end
end
