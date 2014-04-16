Cartogenesis::Application.routes.draw do

  root to: 'welcome#index'

  resources :user
  get '/signin', to: 'user#new_session', as: 'signin'
  post '/sessions', to: 'user#create_session', as: 'sessions'
  delete '/sign_out', to: 'user#destroy_session', as: 'signout'

  get '/games/:id/start', to: "games#start_game", as: 'start_game'

  patch '/games/:id/leave', to: "games#leave_game", as: 'leave_game'

  get '/game_portal/:id', to: 'games#portal'

  get '/turn_logs/:id', to: 'turn_logs#return_json'

  post '/landmark/', to: 'landmarks#create', as: 'create_landmark'

  resources :games do
    resources :chronicles do
      resources :turn_logs do
      end
    end
  end

  get '/test3d', to: 'games#test3d'

  resources :games

  resources :board, only: [ :update , :show, :create]

  get '/create_board', to: 'board#create'

  get '/join/:game_slug', to: 'games#join_game'

  get '/play/:game_slug', to: "games#play_game", as: 'play_game'

  post '/players/:game_slug', to: "players#create", as: 'players'
end
