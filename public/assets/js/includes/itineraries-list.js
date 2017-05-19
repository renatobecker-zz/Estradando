var loadItineraries = function() {
    $("#itineraries-list-table tbody").empty();
    var html = '';
    _.each(data.config.itineraries, function(item) { 
            var date = moment.unix(item.start_date.$date.$numberLong);
            var strDate = moment(date).format('DD/MM/YYYY');
            html += '<tr>';        
            html += '<td>' + strDate + '</td>';
            html += '<td>' + item.name + '</td>';                
            html += '</tr>';                            
            $("#itineraries-list-body").append( html );            
    });    
}
/*
$('#modal-itineraries-list').on('shown.bs.modal', function (e) {

});
*/

var ItinerariesList = function () {
    "use strict";
    return {
        //main function
        init: function () {
            loadItineraries();
        }
    };
}();