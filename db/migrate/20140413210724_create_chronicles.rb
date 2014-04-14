class CreateChronicles < ActiveRecord::Migration
  def change
    create_table :chronicles do |t|
      t.string :initial_board
      t.integer :game_id

      t.timestamps
    end
  end
end
