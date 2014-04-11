class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.text :game_svg

      t.timestamps
    end
  end
end
