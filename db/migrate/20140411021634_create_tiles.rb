class CreateTiles < ActiveRecord::Migration
  def change
    create_table :tiles do |t|
      t.integer :game_id
      t.string :type
      t.float :radius
      t.integer :a
      t.integer :b
      t.integer :c
      t.timestamps
    end
  end
end
