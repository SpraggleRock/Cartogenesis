class AddIndexToTilesTable < ActiveRecord::Migration
  def change
    add_index :tiles, :coordinates
  end
end

