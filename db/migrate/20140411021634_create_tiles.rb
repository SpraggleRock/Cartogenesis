class CreateTiles < ActiveRecord::Migration
  def change
    create_table :tiles do |t|
      t.integer :board_id
      t.string :terrain, default: "ocean"
      t.float :radius
      t.string :coordinates
      t.timestamps
    end
  end
end
