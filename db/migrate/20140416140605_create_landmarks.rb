class CreateLandmarks < ActiveRecord::Migration
  def change
    create_table :landmarks do |t|
      t.string :name
      t.text :description
      t.string :tile_id
      t.string :type

      t.timestamps
    end
  end
end
