Rails.application.routes.draw do

    namespace :api do
      #v1
      match '/v1' => 'v1#index', via: [:get], defaults: { format: 'json' }

    end

    match '/download' => 'root#download', via: [:get]

    root :to => 'root#index'
    match "*path", to: redirect("/"), via: [:get, :post] # handles /fake/path/whatever

end
