var array_routes = [];
var routing      = null;
var route_object = null;
var routes_info  = [];

var handleRouting = function() {
    //Routes plugin
    if (routing) return;

    if (data.config.itinerary == null) return;

    routing = new L.Routing.control({
        //position: 'bottomleft',
        router: L.Routing.mapbox(data.config.mapbox.token),
        createMarker: function() { return null; },
        draggableWaypoints: false,
        showAlternatives: true,
        language: 'pt',
        show: false,
        collapsible: true,
        waypoints: [],
    });
        
    map.addControl(routing);
    /*
    routing.on('routeselected', function(e) {
        var coord = e.route.coordinates;
        var instr = e.route.instructions;
        var instruction = getInstrGeoJson(instr,coord);
        route_object = instruction;
    });        
	*/
    routing.on('routesfound', function(e) {
        routes_info = e.routes;
    });            
};

var clearRoute = function() {
    if (!routing) return;

    array_routes = [];
    route_object = null;
    routes_info  = [];
    //routing.removeFrom(map);
    routing.setWaypoints(array_routes);
    map.closePopup();
    console.log('limpou rota');
    }

var routeExist = function(latlng) {
        var index = -1;
        for(var i = 0, len = array_routes.length; i < len; i++) {
            if ((array_routes[i].lat === latlng.lat) && (array_routes[i].lng === latlng.lng) ) {
                index = i;
                break;
            }
        }
        return index;
    }        

var addRoute = function(latitude, longitude) {
    if (!routing) return;    
    array_routes.push(L.latLng(latitude, longitude));
    //routing.spliceWaypoints(routing.getWaypoints().length - 1, 1, latlng);
    routing.setWaypoints(array_routes);
    map.closePopup();
}

var addRoutes = function(routes) {    
    if (!routing) return;    
    routing.setWaypoints(routes);
    map.closePopup();
}

var removeRoute = function(latlng) {
    if (!routing) return;
    var index = routeExist(latlng);
    if (index > -1) {
        (array_routes.length > 2) ? array_routes.splice(index,1) : array_routes = [];            
        routing.setWaypoints(array_routes);
    }
    map.closePopup();
}

var LeafletRoutingMachine = function () {
    "use strict";
    return {
        //main function
        init: function () {
            handleRouting();  
        }
    };
}();