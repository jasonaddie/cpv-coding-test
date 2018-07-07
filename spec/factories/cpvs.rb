FactoryBot.define do
  factory :cpv do
    code { Faker::Number.number(8) }
    original_code { "#{Faker::Number.number(8)}-#{Faker::Number.number(1)}" }
    description { Faker::Food.dish }
  end
end