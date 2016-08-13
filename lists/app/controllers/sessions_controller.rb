class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email]) 
    error_message = "Email and/or password do not match our records."
    if user and user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
    else
      render json: {error: error_message}
    end
  end

  def destroy
    session.clear
    render plain: "logout successful"
  end
end
