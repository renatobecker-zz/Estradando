        FB.init({
            appId      : '135642750273727',
            xfbml      : true,
            cookie     : true,
            status     : true,
            version    : 'v2.8'
        });
/*
var handleInit = function(response) {
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '135642750273727',
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
        
var requestCallback = function(response) {
    var ids = response["to"];
    for (var i = 0; i < ids.length; ++i) {
        //"ids[i]" is what you want.              
    }
}

var facebookInviteFriends = function() {
        FB.ui({
            method: 'apprequests',
            message: 'Nova solicitação de Estradando',
            redirect_uri: 'localhost:8000/itinerary',
            title: "Seleção de amigos",
            new_style_message: true
        }, requestCallback);
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