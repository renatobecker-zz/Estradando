var renderText = function(text) {
    return (typeof text != 'undefined') ? text : '';
}

var renderPlaceRating = function(place) {
    var rating = Math.round(place.overall_star_rating);
    var html = '<div class="media">';
    html +='<div class="gallery m-0">';
    
    if (place.price_range) {
        html += '<div class="pull-right">';
        html += 'Preço: <strong>' + place.price_range + '</strong>';
        html += '</div>';
    }    
    
    html += '<strong>Avaliações</strong> (' + place.rating_count + ')';
    html += '<div class="rating">';
    for (var i = 1; i <= 5; i++) {
        var activeClass = (i > rating) ? "" : " active";
        html +='<span class="star' + activeClass + '"></span>';            
    }
    html += '</div>';
    if (place.were_here_count) {
        var html_were_here = (place.were_here_count > 1) ? " pessoas estiveram aqui" : " pessoa esteve aqui";
        html += '<small>' + place.were_here_count + html_were_here + '</small>';
    }
    html += '</div>';
    html += '</div>';
    return html;
}

var renderPlaceParking = function(place) {
    var html = '<div class="media">';
    html    += '<address>';
    html    += '<strong><i class="fa fa-fw fa-car"></i> Estacionamento</strong><br />';
    var html_parking = "";
    if (_.isObject(place.parking)) {
        if (place.parking.lot == 1) {
            html_parking += "Privativo<br />";
        }

        if (place.parking.street == 1) {
            html_parking += "Via Pública<br />";
        } 

        if (place.parking.valet == 1) {
            html_parking += "Manobrista<br />";
        }    
    }
    if (html_parking == "") return;
    html += html_parking;
    html += '</address>';
    html += '</div>';
    return  html;
}

var renderPlacePayments = function(place) {
    var cards = [];    

    if (_.isObject(place.payment_options)) {
        if ((place.payment_options.amex == 1) || (place.payment_options.mastercard == 1) || (place.payment_options.visa == 1)) {
            cards.push('<i class="fa fa-fw fa-credit-card"></i> Cartão de Crédito<br />');        
        }        
        if (place.payment_options.cash_only == 1) {
            cards.push('<i class="fa fa-fw fa-money"></i> Dinheiro<br />');        
        }        
    }

    if (cards.length == 0) return;

    var html = '<div class="media">';
    //html    += '<address>';
    html    += '<strong>Formas de Pagamento</strong><br />';

    _.each(cards, function(card) {                
        html += card;
    });    
    return html;
}

/*
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
*/

var renderPlaceCover = function(img) {
    var html = '<div class="media">';
    html    += '<div class="media media-lg">';
    html    += '<a class="media">';
    html    += '<img src="' + img + '" alt="" class="media-object" style="width:100%"/>';
    html    += '</a>';
    html    += '</div>';
    html    += '</div>';
    return  html;
}

var renderPlaceHeader = function(place) {
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

var renderPlaceAddress = function(place) {
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
    html    += '</address>';
    html += '</div>';
    return html;
}

var renderPlaceContact = function(place) {
    var html = '';
    if (place.phone) {
        html += '<address>'
        var phoneNum = place.phone.match(/\d+/gi).join("");
        html += '<strong>Telefone</strong><br />';
        html += '<a href="tel:' + phoneNum + '"><i class="fa fa-phone"></i> ' + place.phone + '</a>';
        html += '</address>'
    }   
    if (place.website) {   
        html += '<address>' 
        html += '<strong>Site</strong><br />';
        html += '<a href="' + place.website + '" target="_blank">' + place.website + '</a>';
        html += '</address>'        
    }    
    return html;
}

var renderPlaceHours = function(place) {
    var days_eng = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    var days_pt  = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    var html = '<div class="media">';
    html    += '<table class="table">';
    html    += '<thead><tr><th>Dia</th><th>Abre</th><th>Fecha</th></tr></thead>';
    html    += '<tbody>';
    _.each(days_eng, function(day, i) { 
        var hour_open_day  = day + '_1_open';
        var hour_close_day = day + '_1_close'; 
        var hour_open_value = '-';
        var hour_close_value = '-';
        if (place.hours.hasOwnProperty(hour_open_day)) {       
            hour_open_value = place.hours[hour_open_day];
        };
        if (place.hours.hasOwnProperty(hour_close_day)) {       
            hour_close_value = place.hours[hour_close_day];
        };
        html    += '<tr>';        
        html    += '<td>' + days_pt[i] + '</td>';
        html    += '<td>' + hour_open_value + '</td>';
        html    += '<td>' + hour_close_value + '</td>';                
        html    += '</tr>';                            
    });    
    html    += '</tbody>';
    html    += '</table>';    
    html += '</div>';
    return html;
}

var renderPlaceFoodStyles = function(styles) {
    var html = '<address>' 
    html += '<strong>Estilo de Gastronomia</strong><br />';
    html += styles.join(", "); 
    html += '</address>'        
    return html;
}

var renderPlaceRestaurantSpecialties = function(restaurant_specialties) {
    var html = '<address>';
    html += '<strong>Especialidades</strong><br />';
    var specialties = [];
    if (restaurant_specialties.breakfast) {
        specialties.push('Café da Manhã');
    }
    if (restaurant_specialties.lunch) {
        specialties.push('Almoço');
    }
    if (restaurant_specialties.dinner) {
        specialties.push('Jantar');
    }
    if (restaurant_specialties.coffee) {
        specialties.push('Cafés');
    }
    if (restaurant_specialties.drink) {
        specialties.push('Bebidas');
    }
    html    += specialties.join(", "); 
    html += '</address>'        
    return html;    
};

var renderPlaceButton = function(place, marker_id) {
    if (data.config.itinerary == null) return;

    placeObj = (_.find(data.config.itinerary.places, function(item) {
        return item.place_id == place.id;
    }));

    var html;
    if (placeObj == null) {
        var latitude  = (place.location) ? place.location.latitude : 0;
        var longitude = (place.location) ? place.location.longitude : 0;
        html = '<a href="#" onclick="addPlace()" id="btn-add-place" data-id="' + place.id + '" data-location-lat="' + latitude + '" data-location-lng="' + longitude + '" class="btn btn-primary btn-xs p-l-15 p-r-15 m-r-5">Adicionar Local</a>';        
    } else if (( data.config.itinerary.creator_id == data.config.user._id ) || ( data.config.user._id == placeObj.user_id )) {
        html  = '<a href="#" onclick="removePlace(' + place.id + ',' + marker_id + ')" id="btn-remove-place" data-id="' + place.id + '" data-marker-id ="' + marker_id + '" class="btn btn-danger btn-xs p-l-15 p-r-15 m-r-5">Remover</a>';                
    }
    return html;
}

var renderConfigPlaceInfo = function(place, marker_id) {
    if (data.config.itinerary == null) return;
    placeObj = (_.find(data.config.itinerary.places_info, function(item) {
        return item.id == place.id;
    }));

    var htmlResult;
    if (placeObj) {
        //exibe dados do local
        htmlResult = '<div class="underline m-b-10"></div>';
        htmlResult += '<div class="media media-xs clearfix">';
        htmlResult += '<a href="javascript:;" class="pull-left"><img class="media-object rounded-corner place-user-image" alt="" src="' + placeObj.user.avatar + '"></a>';
        htmlResult += '<div class="media-body">';
        htmlResult += '<span class="email-from text-inverse f-w-600"><i class="fa fa-clock-o fa-fw"></i>Segunda-Feira - 8: 30 AM</span>';
        if (( data.config.itinerary.creator_id == data.config.user._id ) || ( data.config.user._id == placeObj.user_id )) {
            htmlResult += '<a href="#" id="btn-config-place" data-id="' + place.id + '" data-marker-id ="' + marker_id + '" class="btn btn-inverse btn-sm m-l-5"><i class="fa fa-cog"></i></a>';                
        }
        htmlResult += '<br><span class="email-to">Sugerido por:</span><span class="email-from text-inverse f-w-600 m-l-5">';
        htmlResult += placeObj.user.name;
        htmlResult += '</span>';        
        htmlResult += '</div><div class="underline m-b-5 p-b-15"></div></div>';        
    }    

    return htmlResult;
}    

var renderPanelHeader = function(place, marker_id) {
    var html = '<div class="panel-heading">';
    html += '<div class="pull-right header-place">';
    var htmlButton = renderPlaceButton(place, marker_id);
    if (htmlButton) {
        html += htmlButton;
    }
    html += '<a href="#" onclick="closePlace()" class="btn btn-white btn-sm p-l-15 p-r-15"><i class="fa fa-times"></i></a>';
    html += '</div>';
    html += '<h4 class="panel-title">Informações</h4>';
    html += '</div>';

    var htmlConfigPlace = renderConfigPlaceInfo(place, marker_id);
    if (htmlConfigPlace) {
        html += '<div class="panel-heading">';
        html += htmlConfigPlace;
        html += '</div>';
    }
    return html;
}

function closePlace() {
    leftSidebar.hide();
}

var addPlace = function() {
    var element = $("#btn-add-place");
    var id  = element.data("id");
    var lat = element.data("location-lat");
    var lng = element.data("location-lng");    
    $.ajax({
        type: "POST",
        url: "/itinerary/add_place", 
        data: {
            itinerary_id: data.config.itinerary._id,
            user_id: data.config.user._id,
            place_id: id,
            location: {
                latitude: lat,
                longitude: lng
            }
        },
        cache: false,
        success: function(obj) {            
            if (obj.success) {  
                //remove o marker default
                removeItineraryPlace(obj.data.place_id);                      
                data.config.itinerary.places.push(obj.data);                  
                addItineraryPlace(obj.data, true);
                closePlace();
            }
        }
    }); 
}

var removePlace = function(place_id, marker_id) {
    $.ajax({
        type: "POST",
        url: "/itinerary/remove_place", 
        data: {
            itinerary_id: data.config.itinerary._id,
            user_id: data.config.user._id,
            place_id: place_id
        },
        cache: false,
        success: function(data) { 
            console.log(data);           
            if (data.success) {  
                closePlace();
                removeMarker(marker_id);
                removeItineraryPlace(place_id);
            }
        }
    }); 
}

var renderPlaceDetail = function(place, marker_id) {
    var imgCover = (_.isObject(place.cover)) ? place.cover.source : null;
    var category = ((place.category_list) && (place.category_list.length > 0)) ? place.category_list[0].name : '';  
    var html = renderPanelHeader(place, marker_id);    
    html += '<div class="panel-body p-t-5">';
    if (imgCover) {
        html += renderPlaceCover(imgCover);
    }
    
    html += renderPlaceHeader(place);        
    
    if (place.overall_star_rating) {
       html += renderPlaceRating(place);         
    }

    if (place.location) {
        html += renderPlaceAddress(place);        
    }

    if (place.restaurant_specialties) {
        html += renderPlaceRestaurantSpecialties(place.restaurant_specialties);
    }

    if (place.food_styles) {
        html += renderPlaceFoodStyles(place.food_styles);
    }

    if ((place.phone)  || (place.website)) {
        html += renderPlaceContact(place);
    }   

    var html_payment = renderPlacePayments(place);
    if (html_payment != null) {
        html += html_payment;
    }

    var html_parking = renderPlaceParking(place);
    if (html_parking != null) {
        html += html_parking;
    }
    
    if (place.hours) {
        html += renderPlaceHours(place);        
    }

    //html += renderFacebookInfo(place);

    /*
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

    html += '</div>';
    return html;
}

