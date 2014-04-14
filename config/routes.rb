Cartogenesis::Application.routes.draw do

  root to: 'welcome#index'

  resources :user, only: [ :update , :show, :create, :new]

  patch '/games/:id/start', to: "games#start_game", as: 'start_game'

  get '/games/:id/play', to: "games#play_game", as: 'play_game'

  get '/game_portal/:id', to: 'games#portal'

  resources :games do
    resources :chronicles do
      resources :turn_logs do
      end
    end
  end

  resources :board, only: [ :update , :show, :create]

  get '/create_board', to: 'board#create'




end
