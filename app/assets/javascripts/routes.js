var points = [
  { "longitude": -126, "latitude": 1 },
  { "longitude": 1, "latitude": 1 }
];

class RouteForm {
  constructor(requestPoints) {
    this.routeForm = $('#new_route')
    this.requestPoints = requestPoints;
  }

  listen() {
    if (this.routeForm.length > 0) {
      this.routeForm.on('submit', (e) => {
        e.preventDefault();

        let body = {
          name: "My route",
          route_points_attributes: []
        };

        $.each(this.requestPoints, function(i, point) {
          body.route_points_attributes.push(point);
        });

        $.ajax({
          method: "POST",
          url: this.routeForm.attr('action'),
          processData: false,
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: JSON.stringify({ "route": body })
        }).done(function(data) {
          window.location = data.path;
        });
      });
    }
  }
}
