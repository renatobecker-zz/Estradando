var currentChatPage = 1;

$.ajaxSetup({
    headers: { 'X-CSRF-Token' : $('meta[name=_token]').attr('content') }
});

var handleChat = function() {
	if (data.config.itinerary == null) return;    
    var message_channel = "channel_" + data.config.itinerary._id;
    var channel = pusher.subscribe(message_channel);    
	channel.bind('message', function(data) {
    	var message = data.message;
    	renderMessage(message, function() {
    		scrollToBottom();
    	});   
    	refreshBadgeMessages();
	});
}

var refreshDateMessages = function() {
    $('.date-time').each(function(i, obj) {
        var originalValue = $(this).attr('value');
        var newStrDate = moment(originalValue).fromNow();
         $(this).html(newStrDate);
    });
}

var scrollToBottom = function() {
    //$("#chat-list-message").animate({ scrollTop: $('#chat-list-message').prop("scrollHeight")}, 500);
    $("#scroll-chat").animate({scrollTop: $('ul#chat-list-message li:last').offset().top - 30}, 250);
}

$('#modal-chat').on('shown.bs.modal', function (e) {
	resetBadgeModal();
    refreshDateMessages();
    $("#input-chat-message").focus();
});

$('#modal-chat').find('.panel-footer #ActnSendMessage').on('click', function(e){
	sendMessage();
});

$("#input-chat-message").keypress(function(event) {
    if (event.which == 13) {
    	sendMessage();
    }
});

var renderMessage = function(message, callback) {
   	var user = _.find(data.config.itinerary.members_info, function(member) {
		return member._id == message.user_id;
   	});

   	if (user == null) return;

   	var direction = (data.config.user._id == message.user_id) ? "right" : "left";
   	var dateTime = moment(message.created_at).fromNow();
   	var render = '<li class="' + direction +'"><span value="' + message.created_at + '" class="date-time">';
   	render += dateTime +'</span><a href="javascript:;" class="name">';
   	render += user.name + '</a><a href="javascript:;" class="image">';
   	render += '<img alt="" src="' + user.avatar + '"/></a>';
   	render += '<div class="message">' + message.message + '</div></li>';
   	$("#chat-list-message").append(render);
   	if (callback) {
   		callback();
   	}    
   	console.log('renderMessage');
}

var sendMessage = function() {

	var messageText = $("#input-chat-message").val();
	$("#input-chat-message").val("");
	if (messageText == "") return;

    $.ajax({
        type: "POST",
        url: "/messages", 
        data: {
            itinerary_id: data.config.itinerary._id,
            user_id: data.config.user._id,
            message: messageText
        },
        cache: false,
        success: function(data) {            
            if (data.success) {  
            	//nothing to do..
            }
        }
    });	
}

var resetBadgeModal = function() {
	$("#label-chat-badge").remove();
}

var refreshBadgeMessages = function() {
	modalIsOpen = $('#modal-chat').hasClass('in');
	if (modalIsOpen == false) {
		var badge = $("#label-chat-badge").html() || 0;
		badge++;

		if ($("#label-chat-badge").length) {
			$("#label-chat-badge").html(badge);
		} else {
			$("#chat-badge").append('<span id="label-chat-badge" class="label">' + badge + '</span>');		
		}		
	}
}

var refreshMessages = function(messages) {
	messages = _.sortBy(messages, function(o) { return o.created_at; });
	_.each(messages, function(message) {
		renderMessage(message);
	});
	scrollToBottom();
}

var listMessages = function() {
    if (data.config.itinerary == null) return;    

    $.ajax({
        type: "GET",
        url: "/messages", 
        data: {
            itinerary_id: data.config.itinerary._id,
            page: currentChatPage
        },
        cache: false,
        success: function(messages) { 
            refreshMessages(messages)           
        }
    }); 
}

listMessages();

var ChatMessages = function () {
    "use strict";
    return {
        init: function () {
            handleChat();
        }
    };
}();