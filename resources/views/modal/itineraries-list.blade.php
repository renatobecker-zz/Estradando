<!-- #modal-dialog -->
<div class="modal fade" id="modal-itineraries-list">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">               
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">Meus Roteiros</h4>
            </div>
            <div class="modal-body" id="itineraries-body">
                <div class="height-sm" data-scrollbar="true">
                    <table class="table" id="itineraries-list-table">
                        <thead>
                            <tr>
                                <th>Período</th>
                                <th>Nome</th>
                            </tr>
                        </thead>
                        <tbody id="itineraries-list-body"></tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <a href="javascript:;" class="btn btn-sm btn-white" data-dismiss="modal">Fechar</a>
                    <!--<a href="javascript:;" class="btn btn-sm btn-success" id="ActSetLocation">Confirmar</a>-->
                </div>                
            </div>
        </div>
    </div>
</div>