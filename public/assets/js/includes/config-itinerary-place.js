var handleComponents = function() {
    $('.datetimepicker').datetimepicker();
    $('#datetimepicker2').datetimepicker({
        format: 'LT'
    });
};

var renderText = function(text) {
    return (typeof text != 'undefined') ? text : '';
}

var renderConfigCover = function(img) {
    var html = '<div class="media">';
    html    += '<div class="media media-lg">';
    html    += '<a class="media">';
    html    += '<img src="' + img + '" alt="" class="media-object" style="width:100%"/>';
    html    += '</a>';
    html    += '</div>';
    html    += '</div>';
    return  html;
}

var renderConfigHeader = function(place) {
    var html = '<div class="media">';
    html    += '<div class="media-body">';
    html    += '<h4 class="media-heading">' + place.name + '</h4>';
    if (place.about) {
        html += '<p>' + place.about + '</p>';
    }
    html += '</div>';
    html += '</div>';
    return html;
}

var renderConfigAddress = function(place) {
    var category = ((place.category_list) && (place.category_list.length > 0)) ? place.category_list[0].name : place.category;  
    var distanceKm;
    if (place.location) {
            var lat1  = data.config.destination.latitude;    
            var lng1  = data.config.destination.longitude;
            var lat2  = place.location.latitude;
            var lng2  = place.location.longitude;
            var long2 = data.config.destination.longitude;
            distanceKm = getDistanceBetweenLocations(lat1, lng1, lat2, lng2) + ' Km';
    }    
    var html = '<div class="media">';
    html    += '<address>';
    html    += '<strong>' + category + '</strong><br />';
    html    += renderText(place.location.street) + ' - ' + renderText(place.location.zip)  + '<br />';
    html    += renderText(place.location.city) + ' - ' + renderText(place.location.state)  + '<br />';    
    if (distanceKm != null) {
        html += '<i class="fa fa-map-marker"></i> ' + distanceKm;
    }    
    html += '</address>';
    html += '</div>';
    return html;
}

var renderConfigDetail = function(place) {

    var imgCover = (_.isObject(place.cover)) ? place.cover.source : null;
    var category = ((place.category_list) && (place.category_list.length > 0)) ? place.category_list[0].name : '';      
    var html = '<div class="panel-body">';
    if (imgCover) {
        html += renderConfigCover(imgCover);
    }
    
    html += renderConfigHeader(place);        
    
    if (place.location) {
        html += renderConfigAddress(place);        
    }

    html += '</div>';
    return html;
}

var openConfigPlace = function(place) {
    console.log(place);
    var html = renderConfigDetail(place);
    $("#place-container-info").html(html);
    $("#config-itinerary-place").modal('show');
}

var ConfigItineraryPlace = function () {
    "use strict";
    return {
        //main function
        init: function () {
            handleComponents();
        }
    };
}();