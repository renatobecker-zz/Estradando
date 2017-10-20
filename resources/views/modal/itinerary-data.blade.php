<!-- #modal-dialog -->
<div class="modal fade" id="modal-itinerary-data">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">Dados do Roteiro</h4>
            </div>
            <div class="modal-body">
                <div class="panel-body">
                    <form class="form-horizontal" id="form-itinerary-data">
                        <div class="form-group">
                            <label class="col-md-3 control-label">Nome</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" name="name" id="itinerary-name" placeholder="Nome do Roteiro" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">Período</label>
                            <div class="col-md-9">
                                <div class="input-group input-daterange">
                                    <input type="text" class="form-control" name="start-date" id="itinerary-start-date" placeholder="Data Inicial" />
                                    <span class="input-group-addon">até</span>
                                    <input type="text" class="form-control" name="end-date" id="itinerary-end-date" placeholder="Data Final" />
                                </div>
                            </div>                    
                        </div>               
                    </form>                        
                    <!-- end panel -->
                </div>
                <div id="alert-container" class="alert alert-danger m-b-5 hide"></div>                    
                <div class="modal-footer">
                    <a href="javascript:;" class="btn btn-sm btn-white" data-dismiss="modal">Cancelar</a>
                    <a href="javascript:;" class="btn btn-sm btn-success" id="ActSaveItinerary">Confirmar</a>
                </div>
            </div>
        </div>
    </div>
</div>
