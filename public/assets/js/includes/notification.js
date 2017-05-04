var handleNotification = function() {
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

var Notification = function () {
	"use strict";
    return {
        //main function
        init: function () {
            handleNotification();
        }
    };
}();