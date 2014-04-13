Cartogenesis::Application.routes.draw do

  root to: 'welcome#index'

  patch '/games/:id/start', to: "games#start_game", as: 'start_game'

  get '/games/:id/play', to: "games#play_game", as: 'play_game'

  resources :games

  resources :board, only: [ :update , :show, :create]

  get '/create_board', to: 'board#create'
end
