class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :title
      t.integer :index
      t.references :project
		t.references :user
      t.string :file
      

      t.timestamps
    end
    add_index :tracks, :project_id
    add_index :tracks, :user_id
  end
end
