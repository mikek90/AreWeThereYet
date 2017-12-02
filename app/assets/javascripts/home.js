require([
  "esri/urlUtils",
  "esri/map",
  "esri/graphic",
  "esri/tasks/RouteTask",
  "esri/tasks/RouteParameters",

  "esri/tasks/FeatureSet",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",

  "esri/Color",
  "dojo/on",
  "dijit/registry",

  "dijit/layout/BorderContainer",
  "dijit/layout/ContentPane",
  "dijit/form/HorizontalSlider",
  "dijit/form/HorizontalRuleLabels"
], function (
  urlUtils, Map, Graphic, RouteTask, RouteParameters,
  FeatureSet, SimpleMarkerSymbol, SimpleLineSymbol,
  Color, on, registry
) {
  var map, routeTask, routeParams;
  var stopSymbol, routeSymbol, lastStop;

  urlUtils.addProxyRule({
    urlPrefix: "route.arcgis.com",
    proxyUrl: "/sproxy/"
  });

  map = new Map("map", {
    basemap : "streets",
    center : [-117.195, 34.057],
    zoom : 14
  });

  map.on("click", addStop);

  routeTask = new RouteTask("https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World");

  //setup the route parameters
  routeParams = new RouteParameters();
  routeParams.stops = new FeatureSet();
  routeParams.outSpatialReference = {
    "wkid" : 102100
  };

  routeTask.on("solve-complete", showRoute);
  routeTask.on("error", errorHandler);

  //define the symbology used to display the route
  stopSymbol = new SimpleMarkerSymbol().setStyle(SimpleMarkerSymbol.STYLE_CROSS).setSize(15);
  stopSymbol.outline.setWidth(4);
  routeSymbol = new SimpleLineSymbol().setColor(new dojo.Color([0, 0, 255, 0.5])).setWidth(5);

  //Adds a graphic when the user clicks the map. If 2 or more points exist, route is solved.
  function addStop(evt) {
    var stop = map.graphics.add(new Graphic(evt.mapPoint, stopSymbol));
    routeParams.stops.features.push(stop);

    if (routeParams.stops.features.length >= 2) {
      routeTask.solve(routeParams);
      lastStop = routeParams.stops.features.splice(0, 1)[0];
    }
  }

  //Adds the solved route to the map as a graphic
  function showRoute(evt) {
    map.graphics.add(evt.result.routeResults[0].route.setSymbol(routeSymbol));
  }

  //Displays any error returned by the Route Task
  function errorHandler(err) {
    alert("An error occured\n" + err.message + "\n" + err.details.join("\n"));

    routeParams.stops.features.splice(0, 0, lastStop);
    map.graphics.remove(routeParams.stops.features.splice(1, 1)[0]);
  }

});
