class AddJsonResponseToRoutes < ActiveRecord::Migration[5.1]
  def change
    add_column :routes, :json_response, :text
  end
end
