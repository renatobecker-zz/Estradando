@extends('layouts.app')
@section('css')  
<link href="/assets/plugins/leaflet/leaflet.css" rel='stylesheet' />
<link href="/assets/plugins/Leaflet.ExtraMarkers-master/dist/css/leaflet.extra-markers.min.css" rel="stylesheet" />
<link href="/assets/plugins/leaflet-locatecontrol/dist/L.Control.Locate.min.css" rel="stylesheet"/>
<link href="/assets/css/views/leaflet-custom-popup.css" rel="stylesheet"/>
<link href="/assets/plugins/select2/dist/css/select2.min.css" rel="stylesheet" />
<link href="/assets/plugins/leaflet-sidebar/src/L.Control.Sidebar.css" rel="stylesheet"/>
<link href="/assets/plugins/ionRangeSlider/css/ion.rangeSlider.css" rel="stylesheet" />
<link href="/assets/plugins/ionRangeSlider/css/ion.rangeSlider.skinNice.css" rel="stylesheet"/>

<!--<link href="assets/plugins/leaflet-routing-machine/dist/leaflet-routing-machine.css" rel="stylesheet"/>-->
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
<script src="/assets/plugins/leaflet-locatecontrol/dist/L.Control.Locate.min.js" charset="utf-8"></script>
<script src="/assets/plugins/leaflet-sidebar/src/L.Control.Sidebar.js"></script>
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
<script src="/assets/js/includes/set-location-map.js"></script>
<script src="/assets/js/includes/filter-places.js"></script>
<script src="/assets/js/includes/chat.js"></script>
<script src="/assets/js/includes/notification.js"></script>
<!--<script src="assets/plugins/leaflet-custom-searchbox-master/dist/leaflet.customsearchbox.min.js"></script>-->
<!--<script src="assets/plugins/leaflet-routing-machine/dist/leaflet-routing-machine.min.js"></script>-->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyADvJvC_tbot0jWdVF6yKijrjXPicN3EFY&libraries=places&callback=initAutocomplete" async defer></script>
<script>
    $(document).ready(function() {        
        Notification.init();
        Itinerary.init();  
        LeafletPlugin.init(loadDefaultPlaces);
        FilterPlaces.init();
        ChatMessages.init();
    });
</script>
@endsection        