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
    html += '</div>';
    html += '</div>';
    return html;
}

var renderPlaceCards = function(place) {
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
/*
var renderHtmlPlaceItem = function(place) {
    var src      = (_.isObject(place.cover)) ? place.cover.source : null;    
    var html ='<li>';
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
    var html = '<div class="media">';
    html    += '<address>';
    html    += '<strong>' + category + '</strong><br />';
    html    += '<i class="fa fa-map-marker"></i> ' + renderText(place.location.street) + ' - ' + renderText(place.location.zip)  + '<br />';
    html    += renderText(place.location.city) + ' - ' + renderText(place.location.state)  + '<br />';    
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

var renderFacebookInfo = function(place) {
    var html = '<div class="media">';
    html += '<strong><i class="fa fa-facebook"></i>Facebook</strong>';
    if (place.were_here_count) {

    }

    return html;  
}

var renderPanelHeader = function(place) {
    var html = '<div class="panel-heading">';
    html += '<div class="pull-right header-place">';
    if (data.config.itinerary) {        
        html += '<a href="#" onclick="addPlace(' + place.id + ')" id="btn-add-place" data-toggle="modal" data-id="' + place.id + '" class="btn btn-primary btn-xs p-l-15 p-r-15 m-r-5">Adicionar Local</i></a>';
    }
    html += '<a href="#" onclick="closePlace()" class="btn btn-white btn-sm p-l-15 p-r-15"><i class="fa fa-times"></i></a>';
    html += '</div>';
    html += '<h4 class="panel-title">Informações</h4>';
    html += '</div>';
    return html;
}

function closePlace() {
    leftSidebar.hide();
}

var addPlace = function(place_id) {
    $.ajax({
        type: "POST",
        url: "/itinerary/add_place", 
        data: {
            itinerary_id: data.config.itinerary._id,
            user_id: data.config.user._id,
            place_id: place_id
        },
        cache: false,
        success: function(data) {            
            if (data.success) {  
                closePlace();
            }
        }
    }); 
}

var renderPlaceDetail = function(place) {
    var imgCover = (_.isObject(place.cover)) ? place.cover.source : null;
    var category = ((place.category_list) && (place.category_list.length > 0)) ? place.category_list[0].name : '';  
    var html = renderPanelHeader(place);    
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

