<!-- begin wrapper -->
<div class="wrapper bg-silver-lighter clearfix wrapper-controls">
	<!--
	<div class="btn-group m-r-5">
		<a href="#" class="btn btn-white btn-sm"><i class="fa fa-reply"></i></a>
	</div>
	-->
	<div class="btn-group m-r-5">
		<a href="#modal-filter-places" data-toggle="modal" class="btn btn-white btn-sm p-l-15 p-r-15" title="Pesquisar locais"><i class="fa fa-filter"></i></a>
	</div>
	<div class="pull-right">
		<div class="btn-group btn-toolbar">
            @if ($itinerary->creator_id == Auth::user()->_id)
				<a href='#' onclick="inviteItinerary();" class="btn btn-white btn-sm p-l-15 p-r-15" title="Convidar amigos"><i class="fa fa-facebook"></i></a>
            @endif    
			<a href="#" class="btn btn-white btn-sm p-l-15 p-r-15" title="Participantes"><i class="fa fa-users"></i></a>			
			<a href="#" class="btn btn-white btn-sm p-l-15 p-r-15" title="Configurações"><i class="fa fa-gear"></i></a>
		</div>
		<div class="btn-group m-l-5">
			<a href="/home" class="btn btn-white  btn-sm" title="Sair do Roteiro"><i class="fa fa-times"></i></a>
		</div>
	</div>
</div>
<!-- end wrapper -->
