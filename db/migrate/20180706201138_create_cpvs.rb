class CreateCpvs < ActiveRecord::Migration[5.2]
  def change
    create_table :cpvs do |t|
      t.string :code, limit: 8
      t.string :original_code, limit: 10
      t.string :description

      t.timestamps
    end

    add_index :cpvs, :code
    add_index :cpvs, :description
  end
end
