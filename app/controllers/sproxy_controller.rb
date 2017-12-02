class SproxyController < ApplicationController
  def show
    uri = URI.parse(request.env["QUERY_STRING"])

    query = Rack::Utils.parse_nested_query(uri.query)
    query["token"] = "YqpKjarLWG7cyfKz8WmpY2Eo9vlfj69A5GVawygqFNwOJNU7ybDWsTzM1WVeP763vHFcUW19awZIVhrtBxXNmzD1UMmvX3vjdqrGTigEr8c_ppnRQRgeVroE1o5_nkSkIcU4sqN3b7M0XufzyxtB9g.."

    uri.query = Rack::Utils.build_nested_query(query)

    resp = RestClient.get(uri.to_s)

    render body: resp.body, status: resp.code
  end
end
