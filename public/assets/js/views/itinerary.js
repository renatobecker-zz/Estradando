Pusher.logToConsole = true;
var pusher = new Pusher(data.config.pusher.app_key);
var leftSidebar;
var routePoints = [];
var currentSideBarPlaceID = null;

var handleMoments = function() {
    moment.locale('pt-BR');
}

var handleItinerary = function() {

    leftSidebar = L.control.sidebar('sidebar-place-detail', {
        closeButton: true,
        position: 'left'
    });

    leftSidebar.on('hidden', function () {
        currentSideBarPlaceID = null;
    });     

    map.addControl(leftSidebar);
    
    map.on('click', function () {
        leftSidebar.hide();
    });

    data.config.default_api_categories = defaultApiCategories();
    if ( (data.config.itinerary) && (data.config.itinerary.destination) ) {
        successLocation(data.config.itinerary.destination);
    }
    loadItineraryPlaces();
    listMembers();
}

var defaultApiCategories = function() {
    return _.filter(data.config.api_categories, function(category) {
        return category.default == true; 
    });
}

var removeItineraryPlace = function(place_id) {
    var marker = findPlaceMarker(place_id);
    if (marker) {
        removeMarker(marker._leaflet_id);
    }
    data.config.itinerary.places_info = _.reject(data.config.itinerary.places_info, function(obj) { return obj.id === place_id; });
    data.config.itinerary.places = _.reject(data.config.itinerary.places, function(obj) { return obj.place_id === place_id; });

    if (place_id == currentSideBarPlaceID) {
        leftSidebar.hide();
    }
}

var addItineraryPlace = function(place, bounce) {
    facebookPlace(place.place_id, function(response) {   
        data.config.itinerary.places_info.push(response);
        //place_index++;
        if (response.location) {
            var place_info  = response;
            var user = _.find(data.config.itinerary.members_info, function(member) {
                return member._id == place.user_id;
            });
            if (user) {
                place_info.user = user;
            }
            var marker = markerPoint(response);
            place_info.marker = marker;
            place_info.in_route = true;
            place_info.place_datetime = place.place_datetime;

            addMarker(place_info, markerDetailClick, bounce);    
        }                
    });  
    if (place.location) {
        addRoute(place.location.latitude, place.location.longitude);
    }  
}

var loadItineraryPlaces = function() {
    clearMarkers();
    if (data.config.itinerary == null) return;

    if(data.config.itinerary.hasOwnProperty("places") == false) {
        data.config.itinerary["places"] = [];
    }

    clearRoute();
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

var markerPoint = function(options) {    
    var marker = {
        //number: pointNumber,
        color: "violet",
        iconColor: "white",
        shape: "square",
        innerHTML: options.user ? '<img class="circular-image-marker" src="' + options.user.avatar + '">' : '',
    }
    return marker;
}

var markerDetailClick = function(data) {
    //leftSidebar.toggle(); 
    var html = renderPlaceDetail(data.target.options.data, data.target._leaflet_id);
    leftSidebar.setContent(html);
    leftSidebar.scrollTop;
    $('#sidebar-place-detail').scrollTop(0);
    currentSideBarPlaceID = data.target.options.data.id;
    leftSidebar.show(); 
}

var addItineraryPoints = function(points) {

}

var loadPlaces = function(response, params) {  
    var itineraryPoints = (data.config.itinerary) ? data.config.itinerary.places : [];
    var placeFound;
    _.each(response.data, function(place) { 
        if ( (params)  && (params.price_range) && (place.price_range) ) {
            var price_length = place.price_range.length;
            if ( (price_length < params.price_range.min) || (price_length > params.price_range.max) ) return;
        }
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

$('#modal-itinerary-data').on('hidden.bs.modal', function (e) {
    $("#alert-container").addClass("hide");
    var form = document.getElementById("form-itinerary-data");
    form.reset();
});

$('#modal-itinerary-data').find('.modal-footer #ActSaveItinerary').on('click', function(){

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
                $("#modal-itinerary-data").modal('hide'); 
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
    //console.log(excludes);
    return excludes;
}

var inviteItinerary = function() {
    var url = data.config.redirect_invite_url + data.config.itinerary._id;
    var exclude_ids = excludeIds();
    facebookInviteFriends(data.config.itinerary.name, url, inviteCallback, exclude_ids);
}

var loadDefaultPlaces = function() {
    var default_list = [];
    var filters      = {};

    _.each(data.config.default_api_categories, function( category ) {
        if (category.default) {
            default_list.push('"' + category.original + '"');
        }
    });

    filters['categories'] = default_list;
    filters['limit']      = 200;  
    loadData(loadPlaces, filters);
}

var loadData = function(callback, filters) {
    leftSidebar.hide();
    loadItineraryPlaces();

    var params = {
        geolocation: data.config.destination
    };

    params = $.extend({}, params, filters);

    /*
    if (filters) {
        params["query"] = filters.term;
        params["distance"] = filters.distance;
        params["limit"] = filters.limit;
        params["categories"] = filters.categories;
        //facebookSearch(params, callback);
        /*
        _.each(filters.term, function( term ) {
            params["query"] = term;
            facebookSearch(params, callback);
        });        
        */
        //return;
    //}

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
            if (obj.notification.data.user_id != data.config.user._id) {            
                //remove o marker default
                removeItineraryPlace(obj.notification.data.place_id);
                //adicionar o marker do usuário
                data.config.itinerary.places.push(obj.notification.data);                                  
                addItineraryPlace(obj.notification.data, true);
            }    
        }
    });        
    channel_itinerary.bind('notification', function(obj) {
        if (obj.notification.type == "place_removed") {
            if (obj.notification.user_id != data.config.user._id) {
                removeItineraryPlace(obj.notification.data.place_id);
            }
        }

        if (obj.notification.type == "member_accepted") {
            listMembers();
        }

    });        
}

var renderMember = function(member) {
    if (data.config.itinerary == null) return;   

    var isCreator = (member._id == data.config.itinerary.creator_id);

    var render = '<li class="media"><a href="javascript:;">';
    render     +='<div class="media-left"><img src="' + member.avatar + '" class="media-object" alt="" /></div>';    
    render     +='<div class="media-body"><h6 class="media-heading">' + member.name + '</h6>';
    render     +='<p>' + (isCreator ? 'Criador' : 'Convidado')  + '</p>';
    render     += '</div></a></li>';
    $("#users-list").append(render);

}

var listMembers = function() {
    if (data.config.itinerary == null) return;    
    $("#users-list").empty();
    var members = _.sortBy(data.config.itinerary.members_info, function(o) { return o.name; });
    var render = '<li id="dropdown-users" class="dropdown-header">Participantes (' + members.length + ')</li>';
    $("#users-list").append(render);

    _.each(members, function(member) {
        renderMember(member);
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