Cartogenesis::Application.routes.draw do

  root to: 'welcome#index'

  resources :games, except: [:update, :create]

  resources :board, only: [ :update]

  get '/create_board', to: 'board#create'

  post '/update_game', to: 'games#update'

  post '/game_portal', to: 'games#create'
end
