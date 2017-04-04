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

//add zoom control with your options
L.control.zoom({
    position:'topleft'
}).addTo(map);
*/

//var sidebarMebnu = L.control.sidebar('sidebar').addTo(map);
// create control and add to map

//var lc = L.control.locate({position: 'bottomright', flyTo: true}).addTo(map);
// request location update and set location
//lc.start();

var initMap = function(lat, lng) {
    map.setView([lat, lng], 17);
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

var getMarkerPopup = function(options) {        
    var content = "";
    content += '<strong>' + options.name + '</strong><br>';        
    /*
    content += '<strong>Grupo</strong>: ' + ((cliente.cliente_codigo_grupo > 0) ? cliente.cliente_codigo_grupo + ' - ' + cliente.cliente_nome_grupo : '') + '<br>';   
    content += '<strong>Bairro</strong>: ' + ((cliente.cliente_bairro) ? cliente.cliente_bairro : '') + '<br>';                                                 
    content += '<strong>Cidade/Estado</strong>: ' + cliente.cliente_cidade_nome + "/" + cliente.cliente_cidade_uf + '<br>';
    content += '<strong>Endereço</strong>: ' + cliente.cliente_endereco + '<br>';                      
    content += '<strong>Telefone</strong>: ' + cliente.cliente_telefone + '<br>';                      
    content += '<strong>Segmento</strong>: ' + cliente.cliente_segmento + '<br>';                              
    content += '<strong>Status Loja</strong>: ' + cliente.cliente_status_loja + '<br>';                              
    content += '<strong>Status Contato</strong>: ' + cliente.cliente_status_contato + '<br>';                                      
    content += '<strong>Dias Atraso</strong>: ' + $.number( cliente.cobranca_dias_atraso, 0, ",", "." )  + '<br>';              
    content += '<strong>Valor Atraso</strong>: R$ ' + $.number( cliente.cobranca_valor_atraso, 2, ",", "." )  + '<br>';      
    content += '<strong>Limite Crédito</strong>: R$ ' + $.number( cliente.cliente_limite_credito, 2, ",", "." )  + '<br>';              
    */                
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
    
    return content;                    
}

var addMarker = function(options) {
    var iconMarker = L.ExtraMarkers.icon({
        //icon: getIcon(options.category),// 'fa-cutlery',
        icon: options.marker.icon,
        markerColor: options.marker.color,
        shape: options.marker.shape,
        prefix: 'fa'
    });
    
    var marker = L.marker([options.location.latitude, options.location.longitude], {icon: iconMarker});
    //marker.bindPopup( getMarkerPopup(options) ) ;
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
    //loadData();
}

var clearMarkers = function() {
    //remover marcadores, menos os adicionados no roteiro
    markers.clearLayers();
}

var loadData = function() {

    clearMarkers();
    
    var params = {
        geolocation: currentPosition.coords,        
    };

    var term = $("#input-term").val();
    if (term) {
        params['query'] = term;
    }

    $.ajax({
        type: 'GET',
        url: '/api/places',
        dataType: 'json',
        data: params,
        success: function(result) {
            console.log(result);
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

var handleInit = function() {
    getLocation(setPosition);

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
        init: function () {
            handleInit();  
            handleRouting();          
        }
    };
}();