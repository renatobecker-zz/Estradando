@extends('layouts.app')
@section('css')  
<link href="assets/plugins/leaflet/leaflet.css" rel='stylesheet' />
<link href="assets/plugins/Leaflet.ExtraMarkers-master/dist/css/leaflet.extra-markers.min.css" rel="stylesheet" />
<link href="assets/plugins/bootstrap-select/bootstrap-select.min.css" rel="stylesheet" />
@endsection        
@section('content')
<!-- begin #content -->
<div id="content" class="content p-5">
    <!-- begin page-header -->
    <!--<h1 class="page-header">Aqui vai o nome do Itinerário <small>header small text goes here...</small></h1>-->
    <!-- end page-header -->
    <div class="row" id="row-filter">
        <div class="col-md-12">
            <div class="tab-content">
                <div class="tab-pane fade active in">
                    <!--<div class="panel-body"> -->                    
                    <form id="form-search" class="form-inline"> 
                        <input type="hidden" name="_token" id="csrf-token" value="{{ Session::token() }}" />
                        <div class="form-group col-md-3">
                            <div class="p-2">
                                <input type="text" class="form-control" id="input-term" placeholder="Pesquisar" />
                            </div>
                        </div>
                        <div class="form-group col-md-3">
                            <div class="p-2">
                                <select id="select-city" class="default-select2 form-control"></select>
                            </div>
                        </div>
                        <div class="form-group col-md-3">
                            <div class="p-2">
                                <select id="select-category" class="default-select2 form-control"></select>
                            </div>
                        </div>                      
                    </form>
                    <!--</div>-->
                </div>
            </div>
        </div>
        <!-- end col-12 -->
    </div>
    <!-- end row -->
    <div class="row" id="row-map">
        <!-- begin col-12 -->
        <div class="col-md-12">
            <div class="panel panel-inverse">
                <div class="panel-heading">
                    <div class="panel-heading-btn">
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                    </div>
                    <h4 class="panel-title">Visualização no Mapa</h4>
                </div>        
                <div class="panel-body p-0" data-full-height="true">
                    <div id="map" class="height-full width-full" style="z-index: 7">
                    </div>
                </div>    
            </div>
        </div>    
        <!-- end col-12 -->
    </div>
    <!-- end row -->
</div>
<!-- end #content -->
@endsection        

@section('javascript')  
<script src="assets/plugins/underscore/underscore-1.8.3-min.js"></script>
<script src="assets/plugins/leaflet/leaflet.js"></script>
<script src="assets/plugins/Leaflet.ExtraMarkers-master/dist/js/leaflet.extra-markers.min.js"></script>
<script src="assets/js/leaflet.js"></script>
<script src="assets/js/view-helper.js"></script>
<script src="assets/js/views/itinerary.js"></script>
<script src="assets/plugins/bootstrap-select/bootstrap-select.min.js"></script>
<script>
    $(document).ready(function() {        
        LeafletPlugin.init();             
        Itinerary.init();             
    });
</script>
@endsection        