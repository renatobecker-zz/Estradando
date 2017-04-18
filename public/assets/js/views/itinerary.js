var handleItinerary = function() {
    map.on('click', function () {
        //rightsidebar.hide();
    })
}

var renderRating = function(place) {
    var html ='<div class="rating">';
    for (var i = 1; i <= 5; i++) {
        var activeClass = (i > place.overall_star_rating) ? "" : " active";
        html +='<span class="star' + activeClass + '"></span>';            
    }
    html +='</div>';
    return html;
}

var renderCards = function(place) {
    var cards = [];
    
    if ((_.isObject(place.parking)) && 
        ((place.parking.lot == 1) || (place.parking.street == 1) || (place.parking.valet == 1))) {
        cards.push('<a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Parking" data-original-title="" title=""><i class="fa fa-fw fa-car"></i></a>');
}

if (_.isObject(place.payment_options)) {
    if ((place.payment_options.amex == 1) || (place.payment_options.mastercard == 1) || (place.payment_options.visa == 1)) {
        cards.push('<a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Credit Card" data-original-title="" title=""><i class="fa fa-fw fa-credit-card"></i></a>');        
    }        
    if (place.payment_options.cash_only == 1) {
        cards.push('<a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Cash" data-original-title="" title=""><i class="fa fa-fw fa-money"></i></a>');        
    }        
}

return cards;
}

var renderHtmlPlaceItem = function(place) {
    var src      = (_.isObject(place.cover)) ? place.cover.source : null;
    var category = ((place.category_list) && (place.category_list.length > 0)) ? place.category_list[0].name : '';	
    var html ='<li>';
    /*
    if (src) {
        html +='<div class="result-image">';
        html +='        <a href="javascript:;"><img src="' + src +'" alt=""></a>';
        html +='</div>';        
    }
    */
    html +='<div class="gallery">';
    html +='<div class="image-info">';
    html +='<div class="result-info">';
    html +='<h3 class="title">' + place.name + '</h3>';
    if (place.about) {
        html +='<p class="desc">' + place.about + '</p>';
    }
    if (place.price_range) {
        //html += '<div class="pull-right"><a href="javascript:;">' + place.price_range + '</a></div>';        
    }
    html += renderRating(parseInt(place));    
    html +='<p class="location"><i class="fa fa-map-marker"></i> ' + place.location.city + '</p>';
    /*
    html +='    <p class="location">' + category + '</p>';
    */

    var cardsList = renderCards(place);
    if ((cardsList) && (cardsList.length > 0)) {
        html +='<div class="btn-row">';    
        _.each(cardsList, function(card) {                
            html += card;
        });    
        html +='</div>';    
    }

    html +='</div>';
    html +='</div>';
    html +='</div>';
    /*
	html +='	<!--';
	html +='	<div class="result-price">';
	html +='		$102,232 <small>PER MONTH</small>';
	html +='		<a href="javascript:;" class="btn btn-inverse btn-block">View Details</a>';
	html +='	</div>';
	html +='	-->';
    */
    html +='</li>';
    return html;
}

var renderHtmlPlacesResult = function(places, callback) {
	var html ='<div class="row">';
   html +='<div class="result-container">';
   html +='<ul class="result-list">';
   _.each(places, function(place) {                
      html += renderHtmlPlaceItem(place);
  });
   html +='</ul>';
   html +='</div>';
   html +='</div>';
   if (callback) {
    callback(html)
} else
return html;
}

var renderHtmlPlaceDetail = function(place) {
    var src      = (_.isObject(place.cover)) ? place.cover.source : null;
    var category = ((place.category_list) && (place.category_list.length > 0)) ? place.category_list[0].name : '';  
    
    /*
    if (src) {
        html +='<div class="result-image">';
        html +='        <a href="javascript:;"><img src="' + src +'" alt=""></a>';
        html +='</div>';        
    }*/
    var html =  '<div class="image gallery-group-1">';
    html += '<div class="image-inner">';
    html += '<a href="assets/img/gallery/gallery-1.jpg" data-lightbox="gallery-group-1">';
    html += '<img src="assets/img/gallery/gallery-1.jpg" alt="" />';
    html += '</a>';
    html += '<p class="image-caption">';
    html += '#1382 - 3D Arch';
    html += '</p>';
    html += '</div>';
    html += '<div class="image-info">';
    html += '<h5 class="title">Lorem ipsum dolor sit amet</h5>';
    html += '<div class="pull-right">';
    html += '<small>by</small> <a href="javascript:;">Sean Ngu</a>';
    html += '</div>';
    html += '<div class="rating">';
    html += '<span class="star active"></span>';
    html += '<span class="star active"></span>';
    html += '<span class="star active"></span>';
    html += '<span class="star"></span>';
    html += '<span class="star"></span>';
    html += '</div>';
    html += '<div class="desc">';
    html += 'Nunc velit urna, aliquam at interdum sit amet, lacinia sit amet ligula. Quisque et erat eros. Aenean auctor metus in tortor placerat, non luctus justo blandit.';
    html += '</div>';
    html += '</div>';
    html += '</div>';
        /*
    if (place.about) {
        html +='<p class="desc">' + place.about + '</p>';
    }
    if (place.price_range) {
        //html += '<div class="pull-right"><a href="javascript:;">' + place.price_range + '</a></div>';        
    }
    html += renderRating(parseInt(place));    
    html +='<p class="location"><i class="fa fa-map-marker"></i> ' + place.location.city + '</p>';
    
    html +='    <p class="location">' + category + '</p>';
    

    var cardsList = renderCards(place);
    if ((cardsList) && (cardsList.length > 0)) {
        html +='<div class="btn-row">';    
            _.each(cardsList, function(card) {                
                html += card;
            });    
        html +='</div>';    
    }

    html +='</div>';
    html +='</div>';
    html +='</div>';
    /*
    html +='    <!--';
    html +='    <div class="result-price">';
    html +='        $102,232 <small>PER MONTH</small>';
    html +='        <a href="javascript:;" class="btn btn-inverse btn-block">View Details</a>';
    html +='    </div>';
    html +='    -->';
    
    html +='</li>';*/
    return html;
}

function submitForm(e) {
	if (e.keyCode == 13) {
        //rightsidebar.hide();
        loadData(loadPlaces);
        event.preventDefault();        
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

var loadPlaces = function(response) {    
    //rightsidebar.hide();
    _.each(response.data, function(place) { 
        var group = groupCategory(place);               
        if (group) {
            var marker = markerGroup(group);
            place.marker = marker;
            addMarker(place);    
        }                    
    });
    map.addLayer(markers);
    console.log(response.data);
    if (!response.paging) {  
        renderHtmlPlacesResult(response.data, function(html){
            //rightsidebar.setContent(html);
            //rightsidebar.show();    
        })
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
            //"ids[i]" is what you want.      
            console.log(ids[i]);        
        }
    }
}

var inviteItinerary = function() {
    var url = data.config.redirect_invite_url + data.config.itinerary._id;
    facebookInviteFriends(data.config.itinerary.name, url, inviteCallback);
}

var Itinerary = function () {
	"use strict";
	return {
        //main function
        init: function () {
        	handleItinerary();
            handleDateRangePicker();
        }
    };
}();