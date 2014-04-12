class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.integer :board_size
      t.integer :game_id

      t.timestamps
    end
  end
end
