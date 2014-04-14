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

ActiveRecord::Schema.define(version: 20140413210754) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "adjacencies", force: true do |t|
    t.integer  "tile_id"
    t.integer  "neighbor_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ages", force: true do |t|
    t.integer  "game_id"
    t.text     "age_history"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "boards", force: true do |t|
    t.integer  "board_size"
    t.integer  "game_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "chronicles", force: true do |t|
    t.string   "initial_board"
    t.integer  "game_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "games", force: true do |t|
    t.integer  "round_counter", default: 1
    t.integer  "turn_counter",  default: 1
    t.integer  "active_player"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "players", force: true do |t|
    t.integer  "game_id"
    t.integer  "user_id"
    t.integer  "points",     default: 0
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tiles", force: true do |t|
    t.integer  "board_id"
    t.string   "terrain",     default: "ocean"
    t.float    "radius"
    t.string   "coordinates"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tiles", ["coordinates"], name: "index_tiles_on_coordinates", using: :btree

  create_table "turn_logs", force: true do |t|
    t.string   "board_json"
    t.string   "documentation"
    t.integer  "active_player_id"
    t.integer  "game_id"
    t.integer  "chronicle_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "username"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
