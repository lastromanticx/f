Rails.application.routes.draw do
  root to: 'welcome#home'

  resources :tags

  resources :users, only: [:show]

  resources :lists do

    resources :tasks  
  end

  get '/search', to: 'lists#search'
  post '/search', to: 'lists#search'

  resources :tasks
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end