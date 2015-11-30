class CreateCaterories < ActiveRecord::Migration
  def change
    create_table :caterories do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
