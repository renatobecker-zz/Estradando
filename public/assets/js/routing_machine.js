var array_routes      = [];
var routing           = null;
var route_object      = null;
var routes_info       = [];
var route_features    = []; //usado para encontrar um local em rotas

function getInstrGeoJson(instr,coord) {
    var formatter = new L.Routing.Formatter({
        language: 'pt'
    });
    var instrPts = {
        type: "FeatureCollection",
        features: []
    };
    for (var i = 0; i < instr.length; ++i) {
        var g = {
            "type": "Point",
            "coordinates": [coord[instr[i].index].lng, coord[instr[i].index].lat]
        };

        var info = null;

        if ( ['Head', 'WaypointReached', 'DestinationReached'].indexOf(instr[i].type) > -1 ) {

            if ((instr[i].type !== 'Head') || (i==0)) {

                var point = turf.point([coord[instr[i].index].lat, coord[instr[i].index].lng]);
                //var fc = turf.featureCollection(clientes_features);
                //var nearest = turf.nearest(point, fc);
                
                //if ((nearest) && (nearest.hasOwnProperty("properties"))) {
                    /*
                    var cliente_obj = _.find(clientes_temp, function(cliente) {
                        return cliente._id == nearest.properties.cliente_id; 
                    });                                
                    if (cliente_obj) {
                        info = {
                            cliente  : cliente_obj.cliente_nome,
                            bairro   : cliente_obj.cliente_bairro,
                            endereco : cliente_obj.cliente_endereco,
                            cidade   : cliente_obj.cliente_cidade_nome,
                            estado   : cliente_obj.cliente_cidade_uf
                        }
                    }    
                    */
                //}
            }    
        }

        var p = {
            "instruction": formatter.formatInstruction(instr[i], i),
            "distance" : formatter.formatDistance(instr[i].distance, i),
            "icon" : formatter.getIconName(instr[i], i),
            "info": info,
            "start": (instr[i].type == 'Head')
        };

        instrPts.features.push({
            "geometry": g,
            "type": "Feature",
            "properties": p
        });
    }
    console.log(instrPts);
    return instrPts;
}

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
    routing.on('routeselected', function(e) {
        var coord = e.route.coordinates;
        var instr = e.route.instructions;
        var instruction = getInstrGeoJson(instr,coord);
        route_object = instruction;
    });        

    routing.on('routesfound', function(e) {
        routes_info = e.routes;
    });            
};

var addRouteFeature = function(obj) {
    
}

var clearRoute = function() {
    if (!routing) return;

    array_routes   = [];
    route_object   = null;
    routes_info    = [];
    route_features = [];
    //routing.removeFrom(map);
    routing.setWaypoints(array_routes);
    map.closePopup();
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