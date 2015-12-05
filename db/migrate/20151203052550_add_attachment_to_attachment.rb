class AddAttachmentToAttachment < ActiveRecord::Migration
  def up
    add_attachment :attachments, :image
  end

  def down
    remove_attachment :attchments, :image
  end
end
