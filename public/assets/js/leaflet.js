var currentLocationMarker;
var onSearchLocation = null;
var pulsingIcon = L.icon.pulse({iconSize:[12,12],color:'green'});
var mapOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function successLocation(location) {
    data.config.destination = location;

    console.log(location);
    map.setView([location.latitude, location.longitude], 15);
    setPositionControl(location.latitude, location.longitude, location.address);
    map.flyTo(
        [location.latitude, location.longitude]
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

L.tileLayer(data.config.mapbox.url, {
    //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: data.config.mapbox.token
}).addTo(map);

//map.locate({setView: true, maxZoom: 16});

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
*/

var setPositionControl = function(lat, lng, desc) {
    if (currentLocationMarker) {
        map.removeLayer(currentLocationMarker);
    }
    currentLocationMarker = L.marker([lat, lng],{icon: pulsingIcon});
    map.addLayer(currentLocationMarker);
    currentLocationMarker.bindPopup(desc || "Sua posição atual");
    //.openPopup();        
}

function onLocationFound(e) {
    /*
    var radius = e.accuracy / 2;
    L.marker(e.latlng).addTo(map)
        .bindPopup("Sua localização atual").openPopup();         
    L.circle(e.latlng, radius).addTo(map);
    */
    setPositionControl(e.latitude, e.longitude);
}
map.on('locationfound', onLocationFound);

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