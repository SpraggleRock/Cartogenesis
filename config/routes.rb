Cartogenesis::Application.routes.draw do

  root to: 'welcome#index'

  resources :games, except: [:create]

  resources :board, only: [ :update]

  get '/create_board', to: 'board#create'

  post '/game_portal', to: 'games#create'
end
