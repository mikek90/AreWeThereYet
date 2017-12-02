class SproxyController < ApplicationController
  def show
    uri = URI.parse(request.env["QUERY_STRING"])
    query = CGI.parse(uri.query).to_a
    query << ["token", ["Ebbfu9vkBVFhUI3c7qOgkGjDGPZBTvAr1clgih9kDXtZp7CEEQxx8Vlx_9Kfkfg5ljGiMULII3Mkb_7SUM141FDTI6yFR8v2h1jYw3kIlLg0kunQLGSPwXFWMPS1_O5_eZnYMvQBYwba2ryFVYqcYg.."]]
    query = query.map {|x| x.join("=") }.join("&")

    uri.query = query

    resp = RestClient.get(uri.to_s)

    render body: resp.body, status: resp.code
  end
end
