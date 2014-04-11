require 'spec_helper'

describe GamesController do
  describe '#create' do
    before(:each) do
      @game_data = {game: {svg: "svg string"}}
    end
    it 'creates a new game object' do
      game = double(:game)
      Game.should_receive(:create).and_return(game)
      expect{post :create, @game_data}.to change{Game.count}.by(1)
    end

    it 'redirects to game#show' do
      post :create, @game_data
      expect(response).to redirect_to game_path
    end
  end
end
