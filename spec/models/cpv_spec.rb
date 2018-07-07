require 'rails_helper'

RSpec.describe Cpv, type: :model do

  # Validation tests
  it { should validate_presence_of(:code) }
  it { should validate_presence_of(:original_code) }
  it { should validate_presence_of(:description) }

  it { should validate_length_of(:code).is_equal_to(8)}
  it { should validate_length_of(:original_code).is_equal_to(10)}

end
