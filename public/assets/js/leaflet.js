var currentPosition;

var map = L.map('map', {
    zoomControl: false    
});

var map_url   = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
var map_token = 'pk.eyJ1IjoicmVuYXRvYmVja2VyIiwiYSI6ImNqMGJybnpjYTAzcDMyd296MzlnMzF6ajgifQ.11dY0tWRA3eIup5D3tLxKw';

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


var initMap = function(lat, lng) {
    map.setView([lat, lng], 15);
}

var addMarker = function(options) {
    //Using Leaflet.ExtraMarkers plugin
    var marker = L.ExtraMarkers.icon({
        icon: 'fa-cutlery',
        markerColor: 'blue',
        shape: 'square',
        prefix: 'fa'
    });
    
    L.marker([options.location.latitude, options.location.longitude], {icon: marker})
    .addTo(map)
    .bindPopup(options.name);
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
    //loadMarkers(position);
}

var loadMarkers = function(position, callback) {
    var pos = position || currentPosition;
    console.log(pos);
    if (!pos) {
        //alert("Local não definido, melhor esta mensagem!");
        if (callback) {
            callback();
        }
        return;
    }

    $.ajax({
        type: 'GET',
        url: '/api/search',
        dataType: 'json',
        data: {
            geolocation: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        },
        success: function(result) {
            let data = result.data;            
            _.each(data, function(item) {                
                if (item.location) {                        
                    addMarker(item);
                }                    
            });

            if (callback) {
                callback();
            }           
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