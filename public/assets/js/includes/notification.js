var handleNotification = function() {
    if (data.config.itinerary == null) return;    
    var message_channel = "channel_" + data.config.itinerary._id;
    var channel_itinerary = pusher.subscribe(message_channel);    
    channel_itinerary.bind('notification', function(data) {
        displayNotification(data.notification);
        refreshBadgeNotifications();
    });    
	/*
	$('#add-regular').click( function() {
		$.gritter.add({
			title: 'This is a regular notice!',
			text: 'This will fade out after a certain amount of time. Sed tempus lacus ut lectus rutrum placerat. ',
			image: 'assets/img/user-3.jpg',
			sticky: false,
			time: ''
		});
		return false;
	});
	$('#add-without-image').click(function(){
		$.gritter.add({
			title: 'This is a notice without an image!',
			text: 'This will fade out after a certain amount of time.'
		});
		return false;
	});

	$("#remove-all").click(function(){
		$.gritter.removeAll();
		return false;
	});
	*/
};

$('#notifications-badge').on('click', function(e){
    resetBadgeNotifications();
});

var resetBadgeNotifications = function() {
    $("#label-notifications-badge").remove();
}

var refreshBadgeNotifications = function() {
    listIsOpen = $('#dp-notications').hasClass('open');
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

var Notification = function () {
	"use strict";
    return {
        //main function
        init: function () {
            handleNotification();
        }
    };
}();