class AddAncestryToCpvs < ActiveRecord::Migration[5.2]
  def change
    add_column :cpvs, :ancestry, :string
    add_index :cpvs, :ancestry
  end
end
