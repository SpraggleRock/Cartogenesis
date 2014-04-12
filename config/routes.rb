Cartogenesis::Application.routes.draw do

  root to: 'welcome#index'

  patch '/games/:id/start', to: "games#start_game", as: 'start_game'

  resources :board, only: [ :update ]

  get '/create_board', to: 'board#create'

  post '/game_portal', to: 'games#create'
end
