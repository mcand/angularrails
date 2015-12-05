class AddCategoryAndAttachmentToFilm < ActiveRecord::Migration
  def change
    add_column :films, :category_id, :integer
    add_column :films, :attachment_id, :integer
  end
end
