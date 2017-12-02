class CreateTrack
  NOT_SECRET_API_KEY = "58d904a497c67e00015b45fcbb27e7c9b709411365c87b97d5912f3c".freeze

  Point = Struct.new(:longitude, :latitude)
  def initialize
    @points = []
  end

  def add_point(longitude, latitude)
    @points << Point.new(longitude, latitude)
  end

  def call_service
    RestClient.get(osm_url)
  end

  private

  def osm_url
     "https://api.openrouteservice.org/directions?coordinates=#{coordinates_string}&profile=foot-hiking&preference=fastest&units=m&language=en&geometry=true&geometry_format=polyline&geometry_simplify=false&instructions=true&instructions_format=text&roundabout_exits=false&maneuvers=false&continue_straight=false&elevation=true&optimized=true&api_key=#{NOT_SECRET_API_KEY}"
  end

  def coordinates_string
    @points.map do |point|
      "#{point.longitude},#{point.latitude}"
    end.join("%7C")
  end
end
