$('#modal-set-location').find('.modal-footer #ActCancelLocation').on('click', function(){
    window.top.location.href = "/logout";
});

$('#modal-set-location').on('hidden.bs.modal', function (e) {
    //$("#alert-container").addClass("hide");
    var form = document.getElementById("form-set-location");
    form.reset();
});

var set_default_location = function(position) {
    
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        }
    });

    $.ajax({
        type: "POST",
        url: "/set_default_location", 
        data: {
            default_location: {
                latitude: position.lat(),
                longitude: position.lng()                                
            }
        },
        cache: false,
        success: function(data) {            
            if (data.success) {  
                successLocation({ 
                    latitude: position.lat(),
                    longitude: position.lng()                
                });
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
            console.log(places[0]);
            var position = places[0].geometry.location;
            set_default_location(position);
        }            
    });
}    