class Users::SessionsController < Devise::SessionsController

   protected

   # This method tell sessions#create method to redirect to home#index when login fails.
   def auth_options
      { scope: resource_name, recall: 'home#index' }
   end

end
