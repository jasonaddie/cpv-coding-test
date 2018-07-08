class CpvSerializer < ActiveModel::Serializer
  attributes :code, :description, :has_children

  def has_children
    object.has_children?
  end

end
