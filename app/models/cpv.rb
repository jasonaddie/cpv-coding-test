class Cpv < ApplicationRecord
  has_ancestry

  ##################
  ## VALIDATIONS
  ##################
  validates_presence_of :code, :original_code, :description
  validates :code, length: {is: 8}
  validates :original_code, length: {is: 10}

  ##################
  ## SCOPES
  ##################
  def self.parent_codes
    where('ancestry is null').order(description: :asc)
  end
end
