require 'spec_helper'

feature "the homepage"  do
  scenario "the user can see the start game buton" do
    visit root_path
    expect(page).to have_button("Start Game")
  end
end
