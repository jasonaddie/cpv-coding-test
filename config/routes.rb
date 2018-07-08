Rails.application.routes.draw do

    namespace :api do
      #v1
      match '/v1/cpv' => 'v1#cpv', via: [:get], defaults: { format: 'json' }
      match '/v1/children' => 'v1#children', via: [:get], defaults: { format: 'json' }
      match '/v1/search' => 'v1#search', via: [:get], defaults: { format: 'json' }

    end

    match '/download' => 'root#download', via: [:get]

    root :to => 'root#index'
    match "*path", to: redirect("/"), via: [:get, :post] # handles /fake/path/whatever

end
