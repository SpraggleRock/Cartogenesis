class CreateTiles < ActiveRecord::Migration
  def change
    create_table :tiles do |t|
      t.integer :game_id
      t.integer :x_coord
      t.integer :y_coord
      t.timestamps
    end
  end
end
