class SproxyController < ApplicationController
  def show
    uri = URI.parse(request.env["QUERY_STRING"])

    query = Rack::Utils.parse_nested_query(uri.query)
    query["token"] = "DSGpwttS6T_VlW_UYehQAsmW3WnwgbxfD65d8u5uKMIndeTTZFcu0iVq2ZzMdnw1eYcwLErwKehFsmBuNrUB6Txq-juFmcrF5SMRNuc6ZYZvsf521TtTKaopOEI2iKac-K38vl8lsuh7dF-nmiIUVg.."

    uri.query = Rack::Utils.build_nested_query(query)

    resp = RestClient.get(uri.to_s)

    render body: resp.body, status: resp.code
  end
end
