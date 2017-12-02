Rails.application.routes.draw do
  devise_for :users
  get :settings, to: "home#settings"

  resources :routes

  root to: 'home#index'

  get "sproxy", to: "sproxy#show"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
