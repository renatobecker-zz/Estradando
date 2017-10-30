<!-- #modal-dialog -->
<div class="modal fade" id="modal-filter-places">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">Filtrar pontos de interesse</h4>
            </div>
            <div class="modal-body">
                <div class="panel-body">
                    <form class="form-horizontal" id="form-filter-places">
                        <div class="form-group">
                            <div class="col-md-12">
                                <input type="text" class="form-control" name="name" id="search-term" placeholder="Informe os termos de pesquisa" />
                            </div>
                        </div>                        
                        <div class="form-group">
                            <div class="col-md-12">
                                <select class="default-select2 form-control" id="select-filter-category" placeholder="Selecione uma Categoria" style="width:100%"></select>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12">
                                <select class="default-select2 form-control" id="select-filter-sub-category" placeholder="Selecione uma Sub-Categoria" style="width:100%"></select>
                            </div>
                        </div>
                        <!--
                        <div class="form-group">
                            <div class="col-md-12">
                                <input type="text" class="form-control" name="input-term" id="input-term" placeholder="Texto Livre" />
                            </div>
                        </div>
                        -->
                        <div class="form-group">
                            <div class="col-md-12">
                                <input type="text" id="range-filter-max-distance" name="max-distance" value="" />
                            </div>
                        </div>
                        <!-- //será usado nos filtros adicionais
                        <div class="form-group">
                            <div class="col-md-12">
                                <input type="text" id="range-filter-price" name="price" value="" />
                            </div>
                        </div>
                        -->
                        <!--
                        <div class="form-group">                            
                            <div class="col-md-12">
                                <div class="input-group input-daterange">
                                    <input type="text" class="form-control" name="start-date" id="itinerary-start-date" placeholder="Data Inicial" />
                                    <span class="input-group-addon">até</span>
                                    <input type="text" class="form-control" name="end-date" id="itinerary-end-date" placeholder="Data Final" />
                                </div>
                            </div>                    
                        </div>  
                        --> 
                    </form>                        
                    <!-- end panel -->
                </div>
                <div id="alert-filter-container" class="alert alert-danger m-b-5 hide"></div>                    
                <div class="modal-footer">
                    <a href="javascript:;" class="btn btn-sm btn-white" data-dismiss="modal">Cancelar</a>
                    <a href="javascript:;" class="btn btn-sm btn-success" id="ActFilterPlaces">Confirmar</a>
                </div>
            </div>
        </div>
    </div>
</div>
