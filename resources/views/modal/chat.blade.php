<!-- #modal-dialog -->
<div class="modal fade" id="modal-chat">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">Mensagens</h4>
            </div>
            <div class="modal-body">
                <div class="panel-body bg-silver">
                    <div id="scroll-chat" data-scrollbar="true" data-height="225px">
                        <ul class="chats" id="chat-list-message"></ul>
                    </div>
                </div>
                <div class="panel-footer">
                    <!--<form name="send_message_form" data-id="message-form">-->
                        <div class="input-group">
                            <input type="text" class="form-control input-sm" name="message" id="input-chat-message" placeholder="Digite sua mensagem">
                            <span class="input-group-btn">
                                <button class="btn btn-primary btn-sm" id="ActnSendMessage" type="button">Enviar</button>
                            </span>
                        </div>
                    <!--</form>-->
                </div>
            </div>
            <!-- end panel -->    
        </div>    
    </div>            
</div>        