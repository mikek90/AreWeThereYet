class Route < ApplicationRecord
  belongs_to :user
  has_many :route_points

  accepts_nested_attributes_for :route_points
end
