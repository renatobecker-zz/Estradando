        FB.init({
            appId      : '458270001173171',
            xfbml      : true,
            cookie     : true,
            status     : true,
            version    : 'v2.8'
        });
/*
var handleInit = function(response) {
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '458270001173171',
            xfbml      : true,
            cookie     : true,
             status     : true,
            version    : 'v2.8'
        });
    };
*/
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/pt_BR/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));    
//}    
        
var facebookGraph = function(url, p, callback) {
    FB.api(
        url,
        p,
        function (response) {
            if (response && !response.error) {
                if (callback) {
                    callback(response);
                }

                if (response.paging) {
                    facebookGraph(response.paging.next, p, callback);
                }
            }
        }
    );    
}

var facebookSearch = function(params, callback) {
    var distance = (params.distance) ? params.distance : 1000;
    var center = params.geolocation.latitude + "," + params.geolocation.longitude;
    var p = {
        "distance": distance,
        "limit": 500,
        "center": center,
        "q": (params.query ? params.query : ""),
        "type": "place",                
        "fields": "id,name,location,overall_rating,overall_star_rating,price_range,rating_count,hours,about,category,category_list,cover,restaurant_services,restaurant_specialties,website,parking,food_styles,payment_options,phone",//,events,current_location,description,contact_address,single_line_address,place_topic,name_with_location_descriptor,fan_count,general_info,is_always_open,is_permanently_closed,likes,link,were_here_count,checkins",
        "locale": "pt_BR"
    }
    console.log(p);
    facebookGraph("/search", p, callback);
}

var facebookInviteFriends = function(msg, url, callback, excludes) {
        FB.ui({
            method: 'apprequests',
            message: msg,
            redirect_uri: url,
            data: url,
            exclude_ids: excludes,
            title: "Seleção de amigos",
            new_style_message: true
        }, callback);
    }

var Facebook = function () {
    "use strict";
    return {
        //main function
        init: function () {
            //handleInit();
        }
    };
}();