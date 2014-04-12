class CreateAges < ActiveRecord::Migration
  def change
    create_table :ages do |t|
      t.integer :game_id
      t.text :age_history

      t.timestamps
    end
  end
end
