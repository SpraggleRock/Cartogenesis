class CreateChronicles < ActiveRecord::Migration
  def change
    create_table :chronicles do |t|
      t.json :initial_board_json
      t.integer :game_id

      t.timestamps
    end
  end
end
