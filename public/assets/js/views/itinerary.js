Pusher.logToConsole = true;
var pusher = new Pusher(data.config.pusher.app_key);
var leftSidebar;

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
}

var defaultCategories = function() {
    return _.filter(data.config.catalog_categories, function(category) {
        return category.default == true; 
    });
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

var markerDetailClick = function(data) {
    //leftSidebar.toggle();    
    var html = renderPlaceDetail(data.target.options.data);
    leftSidebar.setContent(html);
    leftSidebar.scrollTop;
    $('#sidebar-place-detail').scrollTop(0);
    leftSidebar.show();    
}

var loadPlaces = function(response) {    
    console.log(response);
    _.each(response.data, function(place) { 
        var group = groupCategory(place);               
        if (group) {
            var marker = markerGroup(group);
            place.marker = marker;
            addMarker(place, markerDetailClick);    
        }                    
    });
    map.addLayer(markers);
    console.log(response.data);
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
            end_date : $('#itinerary-end-date').val()
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
    return _.pluck(data.config.itinerary.members_info, "provider_user_id");
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
    clearMarkers();
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