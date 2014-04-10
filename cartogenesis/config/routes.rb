Cartogenesis::Application.routes.draw do

  root to: 'welcome#index'

  resources :game, only: [:new]

end
