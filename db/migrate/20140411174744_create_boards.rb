class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.integer :radius
      t.float :tile_radius

      t.timestamps
    end
  end
end
