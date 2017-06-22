$('#modal-set-location').find('.modal-footer #ActCancelLocation').on('click', function() {
    if (data.config.destination == null) {
        window.top.location.href = "/logout";
    }
});

$('#modal-set-location').on('hidden.bs.modal', function (e) {
    //$("#alert-container").addClass("hide");
    var form = document.getElementById("form-set-location");
    form.reset();
});

var set_default_location = function(place) {
    var location = {
        name: place.name,        
        address: place.formatted_address,        
        address_components: place.address_components,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng()
    };

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        }
    });

    $.ajax({
        type: "POST",
        url: "/set_default_location", 
        data: {
            default_location : location
        },    
        cache: false,
        success: function(obj) {            
            if (obj.success) {  
                successLocation(obj.data);
                $("#modal-set-location").modal('hide'); 
            }
        }
    });
    return false;
};

var initAutocomplete = function() {
    var input = document.getElementById('input-map-location');
    var searchBox = new google.maps.places.SearchBox(input);    

    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();        
        if (places.length == 0) {
            return;
        }
        if (places.length == 1) {
            set_default_location(places[0]);
        }            
    });
}

function geocodeLatLng(latitude, longitude, callback) {
    var latlng = {lat: latitude, lng: longitude};
    var geocoder = new google.maps.Geocoder;
    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                if (callback) {
                    callback(results[0]);
                } else {
                    return results[0];
                }
            }
        }  
        
        return null;  
    });
}    