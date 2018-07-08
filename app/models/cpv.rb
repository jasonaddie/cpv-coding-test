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
  def self.sorted
    order(description: :asc)
  end

  def self.parent_codes
    where('ancestry is null').sorted
  end

  def self.search(q=nil)
    if q.nil?
      Cpv.none
    else
      where(["code ilike ? or description ilike ?", "#{q}%", "%#{q}%"])
    end
  end
end
