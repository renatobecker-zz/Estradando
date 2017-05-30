@extends('layouts.app')

@section('css')  
<link href="/assets/plugins/leaflet/leaflet.css" rel='stylesheet' />
<link href="/assets/plugins/leaflet-sidebar/src/L.Control.Sidebar.css" rel="stylesheet"/>
<link href="/assets/plugins/Leaflet.ExtraMarkers-master/dist/css/leaflet.extra-markers.min.css" rel="stylesheet" />
<!--<link href="/assets/plugins/leaflet-locatecontrol/dist/L.Control.Locate.min.css" rel="stylesheet"/>-->
<link href="/assets/css/views/leaflet-custom-popup.css" rel="stylesheet"/>
<link href="/assets/plugins/select2/dist/css/select2.min.css" rel="stylesheet" />
<link href="/assets/plugins/ionRangeSlider/css/ion.rangeSlider.css" rel="stylesheet" />
<link href="/assets/plugins/ionRangeSlider/css/ion.rangeSlider.skinNice.css" rel="stylesheet"/>
<link href="/assets/plugins/leaflet-icon-pulse-master/src/L.Icon.Pulse.css" rel="stylesheet"/>
<link href="/assets/plugins/leaflet-routing-machine/dist/leaflet-routing-machine.css" rel="stylesheet"/>

<style>
    .map {
        left: 0;
    }
    /*
    puts the google places autocomplete dropdown results above the bootstrap modal 1050 zindex.
    */
    .pac-container {
        z-index: 1051 !important;
    }    

    /*Padding Top for mobile only (Navbar)*/
    @media (max-width: 767px) {
        .map {
            top: 54px !important;
        }
    }    

    .leaflet-container {
        font:unset;
    }    

    .wrapper-controls {
        padding: 10px !important;
    }

    .fa {
        font-family: FontAwesome;    
    }    
    
    .circular-image-marker {
        border-radius:  50px;
        width: 25px;
        height: 25px;
    }    

</style>
@endsection        
@section('content')
<!-- begin #content -->
<div id="content" class="content content-full-width">
    <!-- begin page-header -->
    <!--<h1 id="current-location-description" class="page-header">Porto Alegre, RS</h1> <!-- <small>header small text goes here...</small></h1>-->
    <!-- end page-header -->
    <!-- begin map content -->
    <div class="map">         
        @if (isset($itinerary))
            @include('includes.itinerary-menu')
        @else
            @include('includes.wrapper-menu')        
        @endif    
        <div id="map" class="height-full width-full"></div>
    </div>
</div>        
<!-- end #content -->
@endsection        

@section('javascript')  
<script src="https://js.pusher.com/4.0/pusher.min.js"></script>
<script src="/assets/plugins/underscore/underscore-1.8.3-min.js"></script>
<script src="/assets/plugins/leaflet/leaflet.js"></script>
<script src="/assets/plugins/Leaflet.ExtraMarkers-master/dist/js/leaflet.extra-markers.min.js"></script>
<!--<script src="/assets/plugins/leaflet-locatecontrol/dist/L.Control.Locate.min.js" charset="utf-8"></script>-->
<script src="/assets/plugins/leaflet-sidebar/src/L.Control.Sidebar.js"></script>
<script src="/assets/plugins/leaflet-icon-pulse-master/src/L.Icon.Pulse.js" /></script>
<script src="/assets/js/leaflet.js"></script>
<script src="/assets/js/view-helper.js"></script>
<script src="/assets/js/views/itinerary.js"></script>
<script src="/assets/plugins/select2/dist/js/select2.min.js"></script>
<script src="/assets/plugins/select2/dist/js/i18n/pt-BR.js"></script>
<script src="/assets/plugins/ionRangeSlider/js/ion-rangeSlider/ion.rangeSlider.min.js"></script>
<script src="/assets/plugins/bootstrap-daterangepicker/moment.js"></script>
<script src="/assets/plugins/gritter/js/jquery.gritter.js"></script>
<script src="/assets/plugins/moment/moment-with-locales.min.js"></script>
<script src="/assets/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.pt-BR.min.js"></script>
<script src="/assets/plugins/leaflet-routing-machine/dist/leaflet-routing-machine.min.js"></script>
<script src="http://api.tiles.mapbox.com/mapbox.js/plugins/turf/v3.0.11/turf.min.js"></script>
<script src="/assets/js/includes/set-location-map.js"></script>
<script src="/assets/js/includes/filter-places.js"></script>
<script src="/assets/js/includes/chat.js"></script>
<script src="/assets/js/includes/notification.js"></script>
<script src="/assets/js/includes/place-detail.js"></script>
<script src="/assets/js/routing_machine.js"></script>
<script src="/assets/js/includes/itineraries-list.js"></script>
<!--<script src="assets/plugins/leaflet-custom-searchbox-master/dist/leaflet.customsearchbox.min.js"></script>-->
<script src="/assets/plugins/leaflet.bouncemarker-master/bouncemarker.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyADvJvC_tbot0jWdVF6yKijrjXPicN3EFY&libraries=places,geometry&callback=initAutocomplete" async defer></script>
<script src="/assets/js/google_maps.js"></script>
leaflet.bouncemarker-master
<script>
    $(document).ready(function() {        
        Notification.init();
        LeafletRoutingMachine.init();        
        Itinerary.init();  
        LeafletPlugin.init(loadDefaultPlaces);
        FilterPlaces.init();
        ChatMessages.init();
        ItinerariesList.init();
    });
</script>
@endsection        

@include('includes.sidebar-place-detail')
@include('modal.create-itinerary')
@include('modal.set-location-map')
@include('modal.filter-places')
@include('modal.itineraries-list')
