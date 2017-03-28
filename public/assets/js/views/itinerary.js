var handleSelects = function() {
    /*
    $('#select-city').select2({
        placeholder: "Onde?",
        language: "pt-BR",      
        ajax: {
            url: '/api/cities/find_by_name',
            dataType: 'json',
            quietMillis: 150,
            minimumInputLength: 4,
            multiple: false,
            data: function (term, page) {
                //term.state = $('#select_state :selected').text();
                return term;
            },
            processResults: function (data, page) {
               return {
                    results: $.map(data, function (item) {
                       return {
                            text: item.properties.nome_municipio + ' - ' + item.properties.sigla,                       
                            id: item.properties.geo_codigo
                        }
                    })
                };
            },
            cache: true
        },
        //dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller        
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
    });

    $('#select-category').select2({
        placeholder: "Tipo",
        language: "pt-BR",      
    });
    */
}

var handleItinerary = function() {

    $( "#form-search" ).submit(function( event ) {
        loadData();
        event.preventDefault();        
    });
}

var Itinerary = function () {
    "use strict";
    return {
        //main function
        init: function () {
            handleSelects();
            handleItinerary();
        }
    };
}();