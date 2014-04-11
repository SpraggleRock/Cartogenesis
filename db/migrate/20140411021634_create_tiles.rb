class CreateTiles < ActiveRecord::Migration
  def change
    create_table :tiles do |t|
      t.integer :board_id
      t.string :type, default: "ocean"
      t.float :radius
      t.integer :a
      t.integer :b
      t.integer :c
      t.timestamps
    end
  end
end
