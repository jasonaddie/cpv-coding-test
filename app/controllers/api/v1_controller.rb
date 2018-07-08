class Api::V1Controller < ApplicationController

  def index
    render json: Year.name_details(params[:id]), each_serializer: YearNameSerializer, :callback => params[:callback]
  end


end