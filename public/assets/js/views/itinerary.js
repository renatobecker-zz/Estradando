var handleSelects = function() {
    $('.default-select2').selectpicker({
        //style: 'btn-info',
        //size: 4
    });
}

var Itinerary = function () {
    "use strict";
    return {
        //main function
        init: function () {
            handleSelects();
            //handleInit();
        }
    };
}();