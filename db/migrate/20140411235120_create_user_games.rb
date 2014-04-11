class CreateUserGames < ActiveRecord::Migration
  def change
    create_table :user_games do |t|
      t.integer :game_id
      t.integer :user_id

      t.timestamps
    end
  end
end
