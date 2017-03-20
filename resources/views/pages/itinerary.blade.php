@extends('layouts.app')
@section('css')  
    <link href='https://api.mapbox.com/mapbox.js/v3.0.1/mapbox.css' rel='stylesheet' />
    <link href="assets/plugins/leaflet/leaflet.css" rel='stylesheet' />
    <link href="assets/plugins/Leaflet.ExtraMarkers-master/dist/css/leaflet.extra-markers.min.css" rel="stylesheet" />
    
    <style>
        .row-full-height {
            height: 100%;
        }
        .col-full-height {
            height: 100%;
            vertical-align: middle;
        }
    </style>    

@endsection        
@section('content')

<div id="content" class="content p-5">
    <div class="row" id="row-filter">
        <div class="col-md-12">
            <div class="tab-content">
                <div class="tab-pane fade active in" id="tab-filtro-escritorio">
                    <!--<div class="panel-body"> -->                    
                        <form id="form-pesquisa" class="form-inline">                                                        
                            <input type="hidden" name="_token" id="csrf-token" value="{{ Session::token() }}" />
                            <div class="form-group">
                                <div class="p-2">
                                    <select id="select-escritorio-1" style="width: 350px" name="escritorio-1" class="default-select2 form-control select-escritorio"></select>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="p-2">
                                    <select id="select-regiao-1" style="width: 185px" name="regiao-1" class="default-select2 form-control"></select>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="p-2">
                                    <select id="select-microregiao-1" style="width: 185px" name="microregiao-1" class="default-select2 form-control"></select>
                                </div>
                            </div>                      
                            <div class="form-group">
                                <div class="p-2">
                                    <select id="select-cidade-1" style="width: 350px" name="cidade-1" class="default-select2 form-control"></select>
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
            <!-- begin panel -->
            <div id="panel-base-map" class="panel panel-inverse">
                <div class="panel-heading">     
                    <!--                
                    <div class="panel-heading-btn">
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                    </div>
                    -->

                    <div class="btn-group pull-right m-l-5">                    
                        <button type="button" id="btnLimpar" class="btn btn-default btn-xs">Limpar</button>
                    </div>      

                    <div class="btn-group pull-right m-l-5">                    
                        <button type="submit" id="btnPesquisar" class="btn btn-primary btn-xs">Pesquisar</button>                          
                    </div>      

                    <div class="btn-group dropdown pull-right m-l-5">
                        <button type="button" class="btn btn-success btn-xs"><i class="fa fa-cog"></i> Opções </button>
                        <button type="button" class="btn btn-success btn-xs dropdown-toggle" data-toggle="dropdown">
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="#modal-legend-map" data-toggle="modal" data-token="{{ csrf_token() }}" id="btnLegenda">Configurar Legendas</a></li>      
                            <li><a href="#modal-filter-map" data-toggle="modal" data-token="{{ csrf_token() }}" id="btnFilter">Configurar Filtros</a></li>                                  
                            <li class="divider"></li>
                            <!--<li class="dropdown-submenu">
                                <a class="submenu-options" tabindex="-1" href="#">Exportar Cobranças (PDF)<span class="caret"></span></a>                            
                                <ul id="export-cobrancas-menu" class="dropdown-menu">-->
                                    <li><a id="btnExportPDFResumo" tabindex="-1" href="#">Exportar Resumo</a></li>                                    
                                    <li><a id="btnExportPDFCidade" tabindex="-1" href="#">Exportar Por Cidade</a></li>
                                    <li><a id="btnExportPDFCliente" tabindex="-1" href="#">Exportar Por Cliente</a></li>
                                <!--</ul>
                            </li>-->

                            <li><a href="#" id="btnExportRoute">Exportar Rota (PDF)</a></li>
                        </ul>
                    </div>  
                                                
                    <div id="group-legend" class="btn-group pull-right" data-toggle="buttons">
                    </div>

                    <h4 class="panel-title">Visualização de Cobranças no Mapa</h4>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <!--<div class="panel-body height-md p-0">-->
                        <div class="panel-body p-0" id="map-container" data-full-height="true">                         
                            <div id="map" class="height-full" style="z-index: 7"></div>
                        </div>                                                  
                    </div>  
                </div>
            </div>
            <!-- end panel -->
        </div>
        <!-- end col-12 -->
    </div>
    <!-- end row -->

    <!--
    <div class="map">
        <div id="map" class="height-full width-full"></div>
    </div>
-->
</div>



<!-- begin #content -->
<!--
<div id="content" class="content">
    <!-- begin page-header -->
    <!--<h1 class="page-header">Aqui vai o nome do Itinerário <small>header small text goes here...</small></h1>-->
    <!-- end page-header -->
    <!--
    <div class="panel panel-inverse">
        <div class="panel-heading">
            <div class="panel-heading-btn">
                <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
            </div>
            <h4 class="panel-title">Visualização no Mapa</h4>
        </div>        
        <div class="panel-body p-0" data-full-height="true">
            <div id="map2" class="height-full width-full" style="z-index: 7">
            </div>
        </div>    
    </div>
</div>
-->
<!-- end #content -->
@endsection        

@section('javascript')  
    <script src="assets/plugins/underscore/underscore-1.8.3-min.js"></script>
    <script src='https://api.mapbox.com/mapbox.js/v3.0.1/mapbox.js'></script>
    <script src="assets/plugins/leaflet/leaflet.js"></script>
    <script src="assets/plugins/Leaflet.ExtraMarkers-master/dist/js/leaflet.extra-markers.min.js"></script>
    <script src="assets/js/view-helper.js"></script>
    <!--<script src="assets/js/leaflet.js"></script>-->
    <script>
        $(document).ready(function() {
            View.init();
            //LeafletPlugin.init();            
        });
    </script>
@endsection        