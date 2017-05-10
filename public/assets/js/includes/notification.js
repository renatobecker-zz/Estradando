var max_render_count = 5;

var handleNotification = function() {
    if (data.config.itinerary == null) return;    
    var message_channel = "channel_" + data.config.itinerary._id;
    var channel_itinerary = pusher.subscribe(message_channel);    
    channel_itinerary.bind('notification', function(data) {
        displayNotification(data.notification);
        refreshBadgeNotifications();
        listLatestNotifications();
    });    
};

$('#notifications-badge').on('click', function(e){
    resetBadgeNotifications();
    refreshDateNotifications();
});

var refreshDateNotifications = function() {
    $('.date-time').each(function(i, obj) {
        var originalValue = $(this).attr('value');
        var newStrDate = moment(originalValue).fromNow();
         $(this).html(newStrDate);
    });
}

var resetBadgeNotifications = function() {
    $("#label-notifications-badge").remove();
}

var refreshBadgeNotifications = function() {
    listIsOpen = $('#dropdown-notications').hasClass('open');
    if (listIsOpen == false) {
        var badge = $("#label-notifications-badge").html() || 0;
        badge++;

        if ($("#label-notifications-badge").length) {
            $("#label-notifications-badge").html(badge);
        } else {
            $("#notifications-badge").append('<span id="label-notifications-badge" class="label">' + badge + '</span>');      
        }       
    }
}

var showNotificationImage = function(data) {
	$.gritter.add({
		title: data.title,
		text: data.text,
		image: data.image,
		sticky: false,
		time: ''
	});
	return false;	
}

var displayNotification = function(notification) {
    if (notification.type == "member_accepted") {
        var id = notification.data.user_id;
        var members = data.config.itinerary.members_info; 
        var user = _.find(members, function(member) {
            return member._id == id;
        });

        if (user == null) return;

        var obj = {
            title : "Novo participante",
            text: notification.text,
            image: user.avatar
        }
        showNotificationImage(obj);
    }

    if (notification.type == "member_invited") {
        //Somente exibido no usuário convidado
        if (notification.data.user_id != data.config.user._id) return;

        var id = notification.data.creator_id;
        var members = data.config.itinerary.members_info; 
        var user = _.find(members, function(member) {
            return member._id == id;
        });

        if (user == null) return;

        var obj = {
            title : "Convite para Roteiro",
            text: notification.text,
            image: user.avatar
        }
        showNotificationImage(obj);
    }
}

var renderNotification = function(notification) {
    if (data.config.itinerary == null) false;    

    if (notification.type == "member_accepted") {
        var id = notification.data.user_id;
        var members = data.config.itinerary.members_info; 
        var user = _.find(members, function(member) {
            return member._id == id;
        });
        //Notificações não são exibidas no usuário origem
        if ( (user == null) || (data.config.user._id == user._id) ) return false;
        var dateTime = moment(notification.created_at).fromNow();

        var render = '<li class="media notification-class"><a href="javascript:;">';
        render     +='<div class="media-left"><img src="' + user.avatar + '" class="media-object" alt="" /></div>';
        render     +='<div class="media-body"><h6 class="media-heading">' + user.name + '</h6>';
        render     +='<p>' + notification.text + '</p><div value="' + notification.created_at + '" class="text-muted f-s-11 date-time">';
        render     += dateTime + '</div></div></a></li>';
        $("#notifications-list").prepend(render); //adiciona no início da lista
        return true;
    }    
}

var renderNotificationsHeader = function(count) {
    var text = (count > 0) ? "Notificações" : "Não há notificações";
    var render = '<li id="dropdown-notifications-header" class="dropdown-header">' + text + '</li>';
    $("#notifications-list").prepend(render);
}

var renderNotificationsFooter = function(count) {
    if ( count <= max_render_count) return;
    var render = '<li id="dropdown-notifications-footer" class="dropdown-footer text-center"><a href="javascript:;">Ver mais...</a></li>';
    $("#notifications-list").append(render);    
}

var loadNotifications = function(notifications) {
    var countRender = 0;
    $("#dropdown-notifications-header").remove();
    $("#dropdown-notifications-footer").remove();
    notifications = _.sortBy(notifications, function(o) { return o.created_at; });
    _.each(notifications, function(notification) {
        if ( (countRender > max_render_count) || (renderNotification(notification)) )  {
            countRender++;
        }
    });
    renderNotificationsHeader(countRender);
    renderNotificationsFooter(countRender);
}

var listLatestNotifications = function() {
    if (data.config.itinerary == null) return;    

    $.ajax({
        type: "GET",
        url: "/notifications", 
        data: {
            itinerary_id: data.config.itinerary._id,
            limit: 6
        },
        cache: false,
        success: function(notifications) { 
            loadNotifications(notifications)           
        }
    }); 
}

listLatestNotifications();

var Notification = function () {
	"use strict";
    return {
        //main function
        init: function () {
            handleNotification();
        }
    };
}();