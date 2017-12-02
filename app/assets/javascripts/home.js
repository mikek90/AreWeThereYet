$(document).on('ready turbolinks:load', function() {
  if ($('#map').length > 0) {
    var map = new L.Map('map');

    var url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attr = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';


    var latlngs = []

    let form = new RouteForm(latlngs)
    form.listen()

    map.on('click', function(e) {
      latlngs.push({ latitude: e.latlng.lat, longitude: e.latlng.lng });
      var newMarker = new L.marker(e.latlng).addTo(map);
    });

    var openstreetmap = L.tileLayer(url, {
      id: 'openstreetmap',
      attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });

    var bounds = new L.LatLngBounds(new L.LatLng(47.323989,8.108683), new L.LatLng(46.96485, 8.029803 ));

    //    var hg = L.control.heightgraph({
    //      width: window.outerWidth+50,
    //      height: 280,
    //      margins: {
    //        top: 10,
    //        right: 30,
    //        bottom: 55,
    //        left: 50
    //      },
    //      position: "bottomright",
    //      mappings: colorMappings
    //    });
    //
    //    hg.addTo(map);
    //
    //    hg.addData(geojson);
    //
    //    L.geoJson(geojson).addTo(map);

    map.addLayer(openstreetmap).fitBounds(bounds);
  }
});
