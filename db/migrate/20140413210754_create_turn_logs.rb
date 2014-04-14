class CreateTurnLogs < ActiveRecord::Migration
  def change
    create_table :turn_logs do |t|
      t.json :board_json
      t.text :documentation
      t.integer :active_player_id
      t.integer :game_id
      t.integer :chronicle_id

      t.timestamps
    end
  end
end
