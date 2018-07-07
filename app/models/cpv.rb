class Cpv < ApplicationRecord
  has_ancestry

  ##################
  ## VALIDATIONS
  ##################
  validates_presence_of :code, :original_code, :description
  validates :code, length: {is: 8}
  validates :original_code, length: {is: 10}


end
