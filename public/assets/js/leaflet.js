var currentPosition;
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
*/
//add zoom control with your options
L.control.zoom({
    position:'topleft'
}).addTo(map);

L.control.locate({
    flyTo: true
}).addTo(map);

var initMap = function(lat, lng) {
    map.setView([lat, lng], 14);
}

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

var addMarker = function(options) {
    var iconMarker = L.ExtraMarkers.icon({
        icon: 'fa-cutlery',
        markerColor: 'blue',
        shape: 'square',
        prefix: 'fa'
    });
    
    var marker = L.marker([options.location.latitude, options.location.longitude], {icon: iconMarker});
    marker.bindPopup(options.name);
    markers.addLayer(marker);
    //.openPopup();    
}

function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);        
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function setPosition(position) {
    currentPosition = position;
    initMap(position.coords.latitude, position.coords.longitude);
    //addLocation(position.coords);
    loadData(position);
}

var clearMarkers = function() {
    //remover marcadores, menos os adicionados no roteiro
    markers.clearLayers();
}

var loadData = function(position) {

    clearMarkers();

    $.ajax({
        type: 'GET',
        url: '/api/places',
        dataType: 'json',
        data: {geolocation: position.coords},
        success: function(result) {
            let data = result.data;            
            _.each(data, function(item) {                
                //loadMarkers(position, item.name);
                addMarker(item);
            });
            map.addLayer(markers);
        },
        error: function() {
            //
        }                
    });
  
};

var loadMarkers = function(position, query) {

    params = {
            geolocation: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        };    

    if (query) {
        params['query'] = query;
    }    

    $.ajax({
        type: 'GET',
        url: '/api/places',
        dataType: 'json',
        data: params,
        success: function(result) {
            let data = result.data;            
            _.each(data, function(item) {                
                if (item.location) {                        
                    addMarker(item);
                }                    
            });
        },
        error: function() {
            //
        }                
    });
}

var handleInit = function() {
    getLocation(setPosition);
};

var LeafletPlugin = function () {
    "use strict";
    return {
        //main function
        init: function () {
            handleInit();            
        }
    };
}();