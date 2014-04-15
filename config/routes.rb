Cartogenesis::Application.routes.draw do

  root to: 'welcome#index'

  resources :user
  get '/signin', to: 'user#new_session', as: 'signin'
  post '/sessions', to: 'user#create_session', as: 'sessions'
  delete '/sign_out', to: 'user#destroy_session', as: 'signout'

  patch '/games/:id/start', to: "games#start_game", as: 'start_game'

  get '/games/:id/play', to: "games#play_game", as: 'play_game'

  get '/game_portal/:id', to: 'games#portal'

  resources :games do
    resources :chronicles do
      resources :turn_logs do
      end
    end
  end

  resources :players, only: [:create]

  resources :board, only: [ :update , :show, :create]

  get '/create_board', to: 'board#create'

  get '/join/:game_slug', to: 'games#join_game'


end
