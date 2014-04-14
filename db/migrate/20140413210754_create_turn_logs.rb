class CreateTurnLogs < ActiveRecord::Migration
  def change
    create_table :turn_logs do |t|
      t.string :board_json
      t.string :documentation
      t.integer :active_player_id
      t.integer :game_id
      t.integer :chronicle_id

      t.timestamps
    end
  end
end
