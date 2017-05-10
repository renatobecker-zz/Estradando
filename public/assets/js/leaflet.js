/*
var mapLocation = {
    origin: {
        latitude: 0,
        longitude: 0
    },
    destination: {
        latitude: 0,
        longitude: 0        
    }
}
*/
var onSearchLocation = null;

var mapOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function successLocation(position) {
    data.config.destination = position;

    map.setView([position.latitude, position.longitude], 15);
    map.flyTo(
        [position.latitude, position.longitude]
    );   

    if (onSearchLocation) {
        onSearchLocation();
    } 
};

function errorLocation(err) {
    console.warn('ERRO(' + err.code + '): ' + err.message);
    //Quando o erro é de permissão do usuário
    if (err.code == 1) {
        setLocationForm();
    }
}

var setLocationForm = function() {
    $("#modal-set-location").modal({
        backdrop: 'static',
        keyboard: false
    }); 
}

var mapMarkers = [];
var markers = new L.FeatureGroup();

var map = L.map('map', {
    zoomControl: false    
});

var map_url   = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
var map_token = 'pk.eyJ1IjoicmVuYXRvYmVja2VyIiwiYSI6ImNqMGJybnpjYTAzcDMyd296MzlnMzF6ajgifQ.11dY0tWRA3eIup5D3tLxKw';

L.tileLayer(map_url, {
    //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: map_token
}).addTo(map);

/*
map.on('moveend', function(e) {
   var bounds = map.getBounds();
   console.log(bounds);
});
*/
/*
var light     = L.tileLayer(map_url, {id: 'mapbox.light', accessToken: map_token}),
    streets   = L.tileLayer(map_url, {id: 'mapbox.streets', accessToken: map_token}),
    satellite = L.tileLayer(map_url, {id: 'mapbox.satellite', accessToken: map_token});

map.locate({
    setView: true, 
    maxZoom: 18, 
    layers: [streets, light, satellite]      
});  

var baseLayers = {
    "Streets": streets,
    "Light": light,
    "Satellite": satellite
};
    
L.control.layers(baseLayers, null, {position: 'topleft'}).addTo(map);
map.addLayer(streets);//Default

//add zoom control with your options
L.control.zoom({
    position:'topleft'
}).addTo(map);
*/
var addLocation = function(coords) {
    var marker = L.ExtraMarkers.icon({
        icon: 'fa-location-arrow',
        markerColor: 'red',
        //shape: 'square',
        prefix: 'fa'
    });
    
    L.marker([coords.latitude, coords.longitude], {icon: marker})
    .addTo(map)
    .bindPopup("Sua localização atual");  
}

var getMarkerPopup = function(options) {        
    var content = "";
    content += '<strong>' + options.name + '</strong><br>';        
    /*
    if ((options.cover) && (options.cover.source)) {
        var slideshowContent = '<br><div class="image active">' +
        '<img src="' + options.cover.source + '"/>' +
        '</div>';        

        content +=  '<div id="' + options._id + '" class="popup">' +                            
        '<div class="slideshow">' +
        slideshowContent +
        '</div>' +
        '</div>';    
    }   
    */
    return content;                    
}

var addMarker = function(options, callback) {
    var iconMarker = L.ExtraMarkers.icon({
        icon: options.marker.icon,
        markerColor: options.marker.color,
        iconColor: options.marker.iconColor,
        shape: (options.marker.shape) ? options.marker.shape : "circle",
        prefix: 'fa'
    });
    //var location = (options.type == "event") ? options.place.location : options.location;
    var marker = L.marker([options.location.latitude, options.location.longitude], {icon: iconMarker, data: options});
    marker.on('click', clickZoom);
    if (callback) {
        marker.on('click', callback);
    }
    marker.bindPopup(getMarkerPopup(options));
    markers.addLayer(marker);
    //.openPopup();    
}

function getLocation() {
    if (data.config.destination) {
        successLocation(data.config.destination);
        return;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, errorLocation, mapOptions);        
    } else {
        alert("Geolocalização não é suportada neste browser.");
    }
}

function setPosition(position) {
    successLocation(position.coords);
}

var clearMarkers = function() {
    markers.clearLayers();
}

function clickZoom(e) {
    map.flyTo(e.target.getLatLng());
}

var handleRouting = function() {
    /*
    var routing = new L.Routing.control({
        position: 'bottomleft',
        router: L.Routing.mapbox(map_token),
        createMarker: function() { return null; },
        draggableWaypoints: false,
        showAlternatives: true,
        language: 'pt',
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
    */     
}

var handleInit = function(callback) {
    getLocation();

    $(window).resize(function(){
        map._onResize();
    });

    $(document).ready(function() {
        map._onResize();
    });

};

var LeafletPlugin = function () {
    "use strict";
    return {
        //main function
        init: function (onSearchLocationCallback) {
            onSearchLocation = onSearchLocationCallback;     
            handleInit();  
            handleRouting();          
        }
    };
}();