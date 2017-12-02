class Route < ApplicationRecord
  belongs_to :user
  has_many :route_points
end
