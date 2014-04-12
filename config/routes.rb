Cartogenesis::Application.routes.draw do

  root to: 'welcome#index'

  resources :games, except: :update

  get '/get_tiles', to: 'games#generate_board'

  post '/update_game', to: 'games#update'
end
