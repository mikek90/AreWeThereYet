class RoutesController < ApplicationController
  def new
    @route = Route.new
  end

  def create
    @route = current_user.routes.new(route_params)

    track = CreateTrack.new
    @route.route_points.each do |point|
      track.add_point(point.longitude, point.latitude)
    end
    @route.json_response = track.call_service
    @route.save

    render json: { route_id: @route.id, path: route_path(@route.id) }
  end

  def preview

  end

  def show
    @route = current_user.routes.includes(:route_points).find(params[:id])
    @route_json = {
      name: @route.name,
      route_points: @route.route_points.map do |point|
        { longitude: point.longitude, latitude: point.latitude }
      end
    }
  end

  private

  def route_params
    params.require(:route).permit(:name, route_points_attributes: [:longitude, :latitude])
  end
end
