var map = new L.Map('map');
//Melhorar a leitura dos parâmetros como var name = '{{ env('NAME') }}';
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicmVuYXRvYmVja2VyIiwiYSI6ImNqMGJybnpjYTAzcDMyd296MzlnMzF6ajgifQ.11dY0tWRA3eIup5D3tLxKw'
}).addTo(map);

var initMap = function(lat, lng) {
    map.setView([lat, lng], 13);
}

var addMarker = function(options) {
    L.marker([options.location.latitude, options.location.longitude]).addTo(map)
    .bindPopup(options.name);
    //.openPopup();    
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function setPosition(position) {
    initMap(position.coords.latitude, position.coords.longitude);
    //addMarker(position.coords.latitude, position.coords.longitude);
}

var loadMarkers = function() {
    $.ajax({
        type: 'GET',
        url: '/search',
        //dataType: 'json',
        success: function(result) {
            let data = result.data;            
            _.map(data, function(item) {
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
    getLocation();
    loadMarkers();
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