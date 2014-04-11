# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140411211911) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "adjacencies", force: true do |t|
    t.integer  "tile_id"
    t.integer  "neighbor_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "boards", force: true do |t|
    t.integer  "board_size"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "games", force: true do |t|
    t.text     "game_svg"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tiles", force: true do |t|
    t.integer  "board_id"
    t.string   "type"
    t.float    "radius"
    t.integer  "a"
    t.integer  "b"
    t.integer  "c"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tiles", ["a", "b", "c"], name: "hex_coords", using: :btree

end
