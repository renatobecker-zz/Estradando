var handleItinerary = function() {

}

var renderHtmlPlaceDetail = function(place) {
	var html;
	html +='<li>';
	html +='<div class="result-image">';
	html +='		<a href="javascript:;"><img src="assets/img/gallery/gallery-7.jpg" alt=""></a>';
	html +='	</div>';
	html +='	<div class="result-info">';
	html +='		<h4 class="title"><a href="javascript:;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a></h4>';
	html +='		<p class="location">United State, BY 10089</p>';
	html +='		<p class="desc">';
	html +='			Nunc et ornare ligula. Aenean commodo lectus turpis, eu laoreet risus lobortis quis. Suspendisse vehicula mollis magna vel aliquet. Donec ac tempor neque, convallis euismod mauris. Integer dictum dictum ipsum quis viverra.';
	html +='		</p>';
	html +='		<div class="btn-row">';
	html +='			<a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Analytics" data-original-title="" title=""><i class="fa fa-fw fa-bar-chart-o"></i></a>';
	html +='			<a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Tasks" data-original-title="" title=""><i class="fa fa-fw fa-tasks"></i></a>';
	html +='			<a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Configuration" data-original-title="" title=""><i class="fa fa-fw fa-cog"></i></a>';
	html +='			<a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Performance" data-original-title="" title=""><i class="fa fa-fw fa-tachometer"></i></a>';
	html +='			<a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Users" data-original-title="" title=""><i class="fa fa-fw fa-user"></i></a>';
	html +='		</div>';
	html +='</div>';
	html +='	<!--';
	html +='	<div class="result-price">';
	html +='		$102,232 <small>PER MONTH</small>';
	html +='		<a href="javascript:;" class="btn btn-inverse btn-block">View Details</a>';
	html +='	</div>';
	html +='	-->';
	html +='</li>';
	return html;
}

var renderHtmlPlacesResult = function(places) {
	var html;
	html +='<div class="row">';
	html +='<div class="result-container">';
	html +='<ul class="result-list">';
	_.each(places, function(place) {                
		html += renderHtmlPlaceDetail(place);
	});
	html +='</ul>';
	html +='</div>';
	html +='</div>';
	return html;
}

function submitForm(e) {
	if (e.keyCode == 13) {
		loadData(fuction(data) {
			
		});
		event.preventDefault();        
	}
}

var Itinerary = function () {
	"use strict";
	return {
        //main function
        init: function () {
        	handleItinerary();
        }
    };
}();