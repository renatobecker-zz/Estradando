<!-- #modal-dialog -->
<div class="modal fade" id="config-itinerary-place">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">Configurar local</h4>
            </div>
            <div class="modal-body">
                <div class="panel-body">
                    <form class="form-horizontal" id="form-config-itinerary-place">
                        <div class="form-group">
                            <label class="control-label col-md-3">Data e Horário</label>
                            <div class="col-md-9">
                                <div class="input-group date datetimepicker" id="dtp-local-date">
                                    <input type="text" class="form-control" placeholder="Informe data e local"/>
                                    <span class="input-group-addon">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group" id="place-container-info"></div>    
                    </form>                        
                    <!-- end panel -->
                </div>
                <div id="alert-container" class="alert alert-danger m-b-5 hide"></div>                    
                <div class="modal-footer">
                    <a href="javascript:;" class="btn btn-sm btn-white" data-dismiss="modal">Cancelar</a>
                    <a href="javascript:;" class="btn btn-sm btn-success" id="ActAddPlace">Confirmar</a>
                </div>
            </div>
        </div>
    </div>
</div>
