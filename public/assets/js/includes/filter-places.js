var handleSelect2 = function() {
    $(".default-select2").select2({
        language: "pt-BR"
    });
};

var handleIonRangeSlider = function() {
    $('#range-filter-max-distance').ionRangeSlider({
        min: 0,
        max: 50,
        from: 5,
        //type: 'single',
        prefix: "Distância ",
        postfix: " KM",
        grid: true,
        step: 0.5
    });

    $("#range-filter-price").ionRangeSlider({
        type: "double",
        grid: true,
        min: 0,
        max: 3,        
        from: 0,
        to: 3,
        prefix: "Preço ",
        values: ["$", "$$", "$$$", "$$$$"]
    });    
};

var loadFilters = function(callback) {
    var distance_mts = $("#range-filter-max-distance").val() * 1000;
    var filters = {
        term: [],
        distance: distance_mts
    };
    /*
    var sub_category_name = $("#select-filter-sub-category").val();
    if (sub_category_name !== "") {
        filters["term"] = [sub_category_name];
        get_original_category(filters, callback);
        return;
    }
    
    var category_name = $("#select-filter-category").val();
    var obj = _.find(data.config.catalog_categories, function(category) {
            return category.name == category_name; 
        });        

    if (obj) {
        filters['term'] = obj.group;
    };
    get_original_category(filters, callback);
    */
    var search_term = $("#search-term").val();
    filters['term'] = search_term;
    callback(filters);
}

var get_original_category = function(filters, callback) {
    $.ajax({
        type: "GET",
        url: "/api/original_category", 
        data: {
            term: filters['term']
        },
        cache: false,
        success: function(obj) {
            filters['term'] = obj.data; 
            if (callback) {
                callback(filters);
            } else {
                return filters;
            }
        }
    }); 
}

var loadSelectCategories = function() {
    $("#select-filter-category").html('').select2('data', {id: null, text: null});
    var selectCategoryData = [{id:"", text:""}]; //Placeholder
    _.each( data.config.catalog_categories, function( category ) {
        selectCategoryData.push({
            id: category.name,
            text: category.name
        })
    });
    selectCategoryData = _.sortBy(selectCategoryData, function(o) { return o.text; });
    $("#select-filter-category").html('').select2({
        placeholder: "Selecione uma Categoria",
        data: selectCategoryData
    }).on("change", function (e) { 
        loadSelectSubCategories();
    });
};

var loadSelectSubCategories = function() {
    var name = $("#select-filter-category").val();
    var obj = _.find(data.config.catalog_categories, function(category) {
            return category.name == name; 
        });

    $("#select-filter-sub-category").html('').select2('data', {id: null, text: null});
    var selectSubCategoryData = [{id:"", text:""}]; //Placeholder
    if (obj) {
        _.each( obj.group, function( sub ) {
            selectSubCategoryData.push({
                id: sub,
                text: sub
            })
        });
    };
    selectSubCategoryData = _.sortBy(selectSubCategoryData, function(o) { return o.text; });
    $("#select-filter-sub-category").html('').select2({
        placeholder: "Selecione uma Sub-Categoria",
        data: selectSubCategoryData
    });    
};

var handleSelectData = function() {
    loadSelectCategories();
    loadSelectSubCategories();  
}

$('#modal-filter-places').on('hidden.bs.modal', function (e) {
    $("#alert-filter-container").addClass("hide");
    $("#ActFilterPlaces").removeClass("disabled");
    var form = document.getElementById("form-filter-places");
    //handleSelectData();
});

$('#modal-filter-places').find('.modal-footer #ActFilterPlaces').on('click', function(e){
    $("#ActFilterPlaces").addClass("disabled"); 
    $( "#alert-filter-container" ).empty();
    var query = $("#search-term").val();
    var category_name = $("#select-filter-category").val();
    if ( ((query == "") || (query == null)) &&
         ((category_name == "") || (category_name == null)) ) {
        $("#alert-filter-container").append( "<p>Informe um termo ou selecione uma Categoria para pesquisa.</p>" );
        $("#alert-filter-container").removeClass("hide");
        $("#ActFilterPlaces").removeClass("disabled"); 
        return;
    }
    $("#alert-filter-container").addClass("hide");
    loadFilters(function(filters) {
        loadData(loadPlaces, filters);
        $('#modal-filter-places').modal('hide');
    });
});

var FilterPlaces = function () {
    "use strict";
    return {
        //main function
        init: function () {
            handleSelect2();
            handleIonRangeSlider();      
            handleSelectData();    
        }
    };
}();