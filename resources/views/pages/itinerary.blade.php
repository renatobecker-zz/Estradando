@extends('layouts.app')
@section('css')  
    <link href='https://api.mapbox.com/mapbox.js/v3.0.1/mapbox.css' rel='stylesheet' />
    <link href="assets/plugins/leaflet/leaflet.css" rel='stylesheet' />
    <link href="assets/plugins/Leaflet.ExtraMarkers-master/dist/css/leaflet.extra-markers.min.css" rel="stylesheet" />

@endsection        
@section('content')
<!-- begin #content -->
<div id="content" class="content">
    <!-- begin page-header -->
    <!--<h1 class="page-header">Aqui vai o nome do Itinerário <small>header small text goes here...</small></h1>-->
    <!-- end page-header -->
    <div class="panel panel-inverse">
        <div class="panel-heading">
            <div class="panel-heading-btn">
                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
            </div>
            <h4 class="panel-title">Visualização no Mapa</h4>
        </div>        
        <div class="panel-body" data-full-height="true">
            <div id="map" class="height-full" style="z-index: 7"></div>
        </div>
        
    </div>
</div>
<!-- end #content -->
@endsection        

@section('javascript')  
    <script src="assets/plugins/underscore/underscore-1.8.3-min.js"></script>
    <script src='https://api.mapbox.com/mapbox.js/v3.0.1/mapbox.js'></script>
    <script src="assets/plugins/leaflet/leaflet.js"></script>
    <script src="assets/plugins/Leaflet.ExtraMarkers-master/dist/js/leaflet.extra-markers.min.js"></script>
    <script src="assets/js/view-helper.js"></script>
    <script src="assets/js/leaflet.js"></script>
    <script>
        $(document).ready(function() {
            View.init();
            LeafletPlugin.init({
            });
            
        });
    </script>
@endsection        