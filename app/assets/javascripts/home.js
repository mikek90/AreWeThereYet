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
    basemap : "osm",
    center : [19.962, 49.297],
    zoom : 12
  });

  map.on("click", addStop);

  // app = (typeof app === 'undefined') ? function () { } : app;
  // app.route = (typeof app.route === 'undefined') ? function () { } : app.route;

  routeResponse = {};
  requestPoints = [];

  routeTask = new RouteTask("https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World");

  //setup the route parameters
  routeParams = new RouteParameters();
  routeParams.stops = new FeatureSet();
  routeParams.directionsLengthUnits = "esriKilometers";
  routeParams.outSpatialReference = {
    "wkid" : 4326 //3857 //102100
  };
  routeParams.travelMode = { "attributeParameterValues": [{ "parameterName": "Restriction Usage", "attributeName": "Walking", "value": "PROHIBITED" }, { "parameterName": "Restriction Usage", "attributeName": "Preferred for Pedestrians", "value": "PREFER_LOW" }, { "parameterName": "Walking Speed (km/h)", "attributeName": "WalkTime", "value": 5 }], "description": "Follows paths and roads that allow pedestrian traffic and finds solutions that optimize travel time. The walking speed is set to 5 kilometers per hour.", "impedanceAttributeName": "WalkTime", "simplificationToleranceUnits": "esriMeters", "uturnAtJunctions": "esriNFSBAllowBacktrack", "restrictionAttributeNames": ["Preferred for Pedestrians", "Walking"], "useHierarchy": false, "simplificationTolerance": 2, "timeAttributeName": "WalkTime", "distanceAttributeName": "Miles", "type": "WALK", "id": "caFAgoThrvUpkFBW", "name": "Walking Time" };
  // routeParams.travelMode = {
  //   id: 1,
  //   name: "Januszek",
  //   desciption: "xxx"

  // };

  window.routeTask = routeTask;
  window.routeParams = routeParams;

  routeTask.on("solve-complete", showRoute);
  routeTask.on("error", errorHandler);

  //define the symbology used to display the route
  stopSymbol = new SimpleMarkerSymbol().setStyle(SimpleMarkerSymbol.STYLE_CROSS).setSize(15);
  stopSymbol.outline.setWidth(4);
  routeSymbol = new SimpleLineSymbol().setColor(new dojo.Color([0, 0, 255, 0.5])).setWidth(5);

  //Adds a graphic when the user clicks the map. If 2 or more points exist, route is solved.
  function addStop(evt) {
    requestPoints.push({"latitude": evt.mapPoint.getLatitude(), "longitude": evt.mapPoint.getLongitude()});
    var stop = map.graphics.add(new Graphic(evt.mapPoint, stopSymbol));
    routeParams.stops.features.push(stop);

    if (routeParams.stops.features.length >= 2) {
      routeTask.solve(routeParams);
      lastStop = routeParams.stops.features.splice(0, 1)[0];
    }
  });
});
