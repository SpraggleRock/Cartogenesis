class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.integer :game_id
      t.integer :user_id
      t.integer :points, default: 0
      t.string :name, default: 'newb'

      t.timestamps
    end
  end
end
