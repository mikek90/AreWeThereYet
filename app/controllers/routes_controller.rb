class RoutesController < ApplicationController
  def new
    @route = Route.new
  end
end
