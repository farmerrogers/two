class AddWavToTracks < ActiveRecord::Migration
  def change
    add_column :tracks, :wav, :string
  end
end
