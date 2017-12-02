$(document).ready(function() {
  var map = new L.Map('map');

  var url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attr = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';


  var openstreetmap = L.tileLayer(url, {
    id: 'openstreetmap',
    attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  });

  var bounds = new L.LatLngBounds(new L.LatLng(47.323989,8.108683), new L.LatLng(46.96485, 8.029803 ));

  var hg = L.control.heightgraph({
    width: window.outerWidth+50,
    height: 280,
    margins: {
      top: 10,
      right: 30,
      bottom: 55,
      left: 50
    },
    position: "bottomright",
    mappings: colorMappings
  });

  hg.addTo(map);

  hg.addData(geojson);

  L.geoJson(geojson).addTo(map);

  map.addLayer(openstreetmap).fitBounds(bounds);
});
