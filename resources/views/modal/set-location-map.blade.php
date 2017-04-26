<!-- #modal-dialog -->
<div class="modal fade" id="modal-set-location">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">               
                <h4 class="modal-title">Definir Localização</h4>
            </div>
            <div class="modal-body">
                <div class="panel-body">
                    <form class="form-horizontal"  onsubmit="return false" id="form-set-location">
                        <div class="form-group col-md-12 xs-margin">
                            <input type="text" class="form-control control-form-full" id="input-map-location" placeholder="Informe o destino desejado" />
                        </div>
                    </form>
                </div>
                <div id="alert-location-container" class="alert alert-danger m-b-5 hide"></div>                    
                <div class="modal-footer">
                    <a href="javascript:;" class="btn btn-sm btn-white" id="ActCancelLocation" data-dismiss="modal">Cancelar</a>
                    <!--<a href="javascript:;" class="btn btn-sm btn-success" id="ActSetLocation">Confirmar</a>-->
                </div>
            </div>
        </div>
    </div>
</div>