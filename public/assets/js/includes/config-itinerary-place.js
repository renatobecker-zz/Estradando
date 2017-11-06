var id;
var lat;
var lng;
var place;

var handleComponents = function() {
    $('.datetimepicker').datetimepicker({
//       dateFormat : "dd/mm/yy",
        //format: "dd/mm/yyyy",
        format: 'DD-MM-YYYY HH:mm',
        showClear: true,
        showClose: true,
        //sideBySide: true,
        locale: moment.locale('pt-BR')
    });
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

var addPlaceToItinerary = function(datetime, callback) {
    
    $.ajax({
        type: "POST",
        url: "/itinerary/add_place", 
        data: {
            itinerary_id: data.config.itinerary._id,
            user_id: data.config.user._id,
            place_id: this.id,
            place_datetime: datetime,
            location: {
                latitude: this.lat,
                longitude: this.lng
            }
        },
        cache: false,
        success: function(obj) {            
            if (obj.success) {  
                //remove o marker default
                removeItineraryPlace(obj.data.place_id);                      
                data.config.itinerary.places.push(obj.data);                  
                addItineraryPlace(obj.data, true);

                if (callback) {
                    callback();
                }
            }
        }
    }); 
}

$('#config-itinerary-place').find('.modal-footer #ActAddPlace').on('click', function(e){
    $("#ActAddPlace").addClass("disabled"); 
    $( "#alert-filter-container" ).empty();
    var local_datetime = $("#dtp-input").val();
    if ( (local_datetime == "") || (local_datetime == null) ) {
        $("#alert-container-place").append( "<p>Informe data e horário válidos.</p>" );
        $("#alert-container-place").removeClass("hide");
        $("#ActAddPlace").removeClass("disabled"); 
        return;
    }
    $("#alert-container-place").addClass("hide");
        addPlaceToItinerary(local_datetime, function() {
            $("#ActAddPlace").removeClass("disabled");         
            $('#config-itinerary-place').modal('hide');        
        });
});

var openConfigPlace = function(place, info) {
    this.place = place;
    this.id  = info.id;
    this.lat = info.lat;
    this.lng = info.lng;
    $('#dtp-input').val("");

    if (data.config.itinerary) {
        var startDate = moment.unix(data.config.itinerary.start_date.$date.$numberLong);
        var endDate = moment.unix(data.config.itinerary.end_date.$date.$numberLong);        
        //var datetime;

        //$('#dtp-local-date').datepicker('setDate', datetime);
        //.datetimepicker( "option", "maxDate",  endDate );
        //$('#dtp-local-date').datepicker( "option", "maxDate",  endDate );

        if (place.place_datetime) {       
            var $dp = $('#dtp-local-date').data("DateTimePicker");     
            $dp.date( moment.unix(place.place_datetime.$date.$numberLong) );        
        }    

        var title = "Configurar local - " + moment(startDate).format('DD/MM/YY');
        if (data.config.itinerary.start_date.$date.$numberLong !== 
            data.config.itinerary.end_date.$date.$numberLong) {
            title += " até " + moment(endDate).format('DD/MM/YY');
        }
        $("#config-itinerary-place-title").html(title);
    }
    
    var html = renderConfigDetail(place);
    $("#place-container-info").html(html);
    $("#alert-container-place").addClass("hide");
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