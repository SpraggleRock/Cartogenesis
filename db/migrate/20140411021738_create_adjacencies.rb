class CreateAdjacencies < ActiveRecord::Migration
  def change
    create_table :adjacencies do |t|
      t.integer :tile_id
      t.integer :neighbor_id
      t.timestamps
    end
  end
end
