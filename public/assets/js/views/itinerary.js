var handleItinerary = function() {
 
}

function submitForm(e) {
    if (e.keyCode == 13) {
        loadData();
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