Pusher.logToConsole = true;
var pusher = new Pusher(data.config.pusher.app_key);
var leftSidebar;
var routePoints = [];

var handleMoments = function() {
    moment.locale('pt-BR');
}

var handleItinerary = function() {

    leftSidebar = L.control.sidebar('sidebar-place-detail', {
        closeButton: true,
        position: 'left'
    });
    map.addControl(leftSidebar);
    
    map.on('click', function () {
        leftSidebar.hide();
    })
    data.config.default_categories = defaultCategories();
    if ( (data.config.itinerary) && (data.config.itinerary.destination) ) {
        successLocation(data.config.itinerary.destination);
    }
    loadItineraryPlaces();
}

var defaultCategories = function() {
    return _.filter(data.config.catalog_categories, function(category) {
        return category.default == true; 
    });
}

var addItineraryPlace = function(place) {
    facebookPlace(place.place_id, function(response) {        
        data.config.itinerary.places_info.push(response);
        //place_index++;
        if (response.location) {
            var place_info  = response;
            var marker = markerPoint(1);
            place_info.marker = marker;
            place_info.in_route = true;
            addMarker(place_info, markerDetailClick);    
        }                
    });  
    if (place.location) {
        addRoute(place.location.latitude, place.location.longitude);
        //routes.push(L.latLng(place.location.latitude, place.location.longitude));
    }  
}

var loadItineraryPlaces = function() {
    if (data.config.itinerary == null) return;
    clearRoute();
    clearMarkers();
    if (data.config.destination) {
        addRoute(data.config.destination.latitude, data.config.destination.longitude);
    }   

    data.config.itinerary.places_info = [];
    if (data.config.itinerary.places) {
        var place_index = 0;
        _.each(data.config.itinerary.places, function(place) { 
            addItineraryPlace(place);
        }); 
        map.addLayer(markers);        
    }
}

var groupCategory = function(place) {
    var group, list;
    if ((data) && (data.config) && (data.config.catalog_categories)) {
        list = data.config.catalog_categories;
    }
    if ((list) && ((place.category_list) && (place.category_list.length > 0))) {
        for (var i = 0; i < place.category_list.length; i++) {
            var category_name = place.category_list[i].name;
            group = (_.find(list, function(category) {
                return _.contains(category.group, category_name);
            }));   

            if (group) break; 
        }
    }
    return group;
};

var markerGroup = function(group) {
    var marker = {
        icon: (group) ? group.icon : "fa-location-arrow",
        color: ((group) && (group.color)) ? group.color : "green",
        iconColor: ((group) && (group.iconColor)) ? group.iconColor : "white"
    }
    return marker;
}

var markerPoint = function(pointNumber) {
    var marker = {
        number: pointNumber,
        color: "violet",
        iconColor: "white",
        shape: "square"
    }
    return marker;
}

var markerDetailClick = function(data) {
    //leftSidebar.toggle();    
    var html = renderPlaceDetail(data.target.options.data);
    leftSidebar.setContent(html);
    leftSidebar.scrollTop;
    $('#sidebar-place-detail').scrollTop(0);
    leftSidebar.show();    
}

var addItineraryPoints = function(points) {

}

var loadPlaces = function(response) {   
    var itineraryPoints = (data.config.itinerary) ? data.config.itinerary.places : [];
    var placeFound;
    _.each(response.data, function(place) { 
        placeFound = (_.find(itineraryPoints, function(point) {
            return point.place_id == place.id;
        }));   
        if (placeFound == null) {
            var group = groupCategory(place);               
            if (group) {
                var marker = markerGroup(group);
                place.marker = marker;
                addMarker(place, markerDetailClick);    
            }                    
        }
    });
    map.addLayer(markers);
    if (!response.paging) {  
        /*
        renderHtmlPlacesResult(response.data, function(html){
            leftSidebar.setContent(html);
            leftSidebar.show();    
        })*/
    }
}    

var handleDateRangePicker = function() {
    $('.input-daterange').datepicker({
        todayHighlight: true,
        format: 'dd/mm/yyyy',                
        language: 'pt-BR',
        autoclose: true       
    });
};

$('#modal-create-itinerary').on('hidden.bs.modal', function (e) {
    $("#alert-container").addClass("hide");
    var form = document.getElementById("form-create-itinerary");
    form.reset();
});

$('#modal-create-itinerary').find('.modal-footer #ActCreateItinerary').on('click', function(){

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        }
    });

    $.ajax({
        type: "POST",
        url: "/itinerary/store", 
        data: {
            name : $('#itinerary-name').val(),
            start_date : $('#itinerary-start-date').val(),
            end_date : $('#itinerary-end-date').val(),
            destination : data.config.destination
        },
        cache: false,
        success: function(data) {
            if (data.success) {                
                $("#modal-create-itinerary").modal('hide'); 
                var urlSuccess = "itinerary/" + data.data._id;
                window.location.href = urlSuccess;
            } else {
                validateErrors(data.errors);
            }
        }
    });
    return false;
});

var validateErrors = function(errors) {
    $( "#alert-container" ).empty();
    for (var property in errors) {
        if (errors.hasOwnProperty(property)) {
            var items = errors[property];
            if($.isArray(items)) {
                _.each(items, function(item) {
                    $( "#alert-container" ).append( "<p>" + item + "</p>" );
                });    
            }    
        }
    }    
    $("#alert-container").removeClass("hide");
}

var inviteCallback = function(response) {
    var ids = response["to"];
    if (ids) {
        for (var i = 0; i < ids.length; ++i) {
            inviteRequest(data.config.itinerary._id, ids[i]);
        }
    }
}

var inviteRequest = function(itinerary, friend) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        }
    });

    $.ajax({
        type: "POST",
        url: "/itinerary/invite", 
        data: {
            id : itinerary,
            friend_id: friend
        },
        cache: false,
        success: function(data) {
            //console.log(data);
        }
    });    
}

var excludeIds = function() {
    var excludes = _.pluck(data.config.itinerary.members_info, "provider_user_id");
    console.log(excludes);
    return excludes;
}

var inviteItinerary = function() {
    var url = data.config.redirect_invite_url + data.config.itinerary._id;
    var exclude_ids = excludeIds();
    facebookInviteFriends(data.config.itinerary.name, url, inviteCallback, exclude_ids);
}

var loadDefaultPlaces = function() {
    loadData(loadPlaces);
}

var loadData = function(callback, filters) {
    leftSidebar.hide();
    //clearMarkers();
    var params = {
        geolocation: data.config.destination
    };

    if (filters) {
        params["distance"] = filters.distance;
        _.each(filters.term, function( term ) {
            params["query"] = term;
            facebookSearch(params, callback);
        });        
        return;
    }
    facebookSearch(params, callback);    
};

var handlePusher = function() {
    if (data.config.itinerary == null) return;    
    var message_channel = "channel_" + data.config.itinerary._id;
    var channel_itinerary = pusher.subscribe(message_channel);    
    channel_itinerary.bind('itinerary', function(obj) {
        data.config.itinerary = obj.data;
        loadItineraryPlaces();
    });
    channel_itinerary.bind('notification', function(obj) {
        if (obj.notification.type == "place_added") {
            addItineraryPlace(obj.notification.data);
        }
    });        
}

var Itinerary = function () {
	"use strict";
	return {
        //main function
        init: function () {
        	handleItinerary();
            handlePusher();
            handleDateRangePicker();
            handleMoments();
        }
    };
}();