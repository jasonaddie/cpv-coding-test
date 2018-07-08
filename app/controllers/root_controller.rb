class RootController < ApplicationController

  # GET /
  def index
    # get all parent codes
    @parent_codes = Cpv.parent_codes

  end

  # GET /download
  def download
    send_file 'data/cpv_2008.csv',
      :type => 'text/csv; header=present',
      :disposition => "attachment"
  end

end