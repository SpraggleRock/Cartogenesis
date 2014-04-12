Cartogenesis::Application.routes.draw do

  root to: 'welcome#index'

  resources :games

  get '/get_tiles', to: 'games#generate_board'

  post '/update_game', to: 'games#update'
end
