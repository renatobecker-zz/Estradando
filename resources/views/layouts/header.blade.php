        <!-- begin #header -->
        <div id="header" class="header navbar navbar-default navbar-fixed-top">
            <!-- begin container-fluid -->
            <div class="container-fluid">
                <div class="navbar-header hidden-xs">
                    <a href="javascript:;" class="navbar-brand"><span class="navbar-logo"></span> Estradando</a>
                </div>
                
                <!-- begin header navigation right -->
                <ul class="nav navbar-nav navbar-right">
                    @if (isset($itinerary))
                        <li>
                            <a href="#modal-chat" data-toggle="modal" id="chat-badge" class="dropdown-toggle f-s-14">
                                <i class="fa fa-commenting-o fa-fw"></i>
                            </a>                    
                        </li>
                        <li class="dropdown">
                            <a href="javascript:;" data-toggle="dropdown" class="dropdown-toggle f-s-14">
                                <i class="fa fa-bell-o"></i>
                                <span class="label">5</span>
                            </a>
                            <ul class="dropdown-menu media-list pull-right animated fadeInDown">
                                <li class="dropdown-header">Notifications (5)</li>
                                <li class="media">
                                    <a href="javascript:;">
                                        <div class="media-left"><i class="fa fa-bug media-object bg-red"></i></div>
                                        <div class="media-body">
                                            <h6 class="media-heading">Server Error Reports</h6>
                                            <div class="text-muted f-s-11">3 minutes ago</div>
                                        </div>
                                    </a>
                                </li>
                                <li class="media">
                                    <a href="javascript:;">
                                        <div class="media-left"><img src="/assets/img/user-1.jpg" class="media-object" alt="" /></div>
                                        <div class="media-body">
                                            <h6 class="media-heading">John Smith</h6>
                                            <p>Quisque pulvinar tellus sit amet sem scelerisque tincidunt.</p>
                                            <div class="text-muted f-s-11">25 minutes ago</div>
                                        </div>
                                    </a>
                                </li>
                                <li class="media">
                                    <a href="javascript:;">
                                        <div class="media-left"><img src="/assets/img/user-2.jpg" class="media-object" alt="" /></div>
                                        <div class="media-body">
                                            <h6 class="media-heading">Olivia</h6>
                                            <p>Quisque pulvinar tellus sit amet sem scelerisque tincidunt.</p>
                                            <div class="text-muted f-s-11">35 minutes ago</div>
                                        </div>
                                    </a>
                                </li>
                                <li class="media">
                                    <a href="javascript:;">
                                        <div class="media-left"><i class="fa fa-plus media-object bg-green"></i></div>
                                        <div class="media-body">
                                            <h6 class="media-heading"> New User Registered</h6>
                                            <div class="text-muted f-s-11">1 hour ago</div>
                                        </div>
                                    </a>
                                </li>
                                <li class="media">
                                    <a href="javascript:;">
                                        <div class="media-left"><i class="fa fa-envelope media-object bg-blue"></i></div>
                                        <div class="media-body">
                                            <h6 class="media-heading"> New Email From John</h6>
                                            <div class="text-muted f-s-11">2 hour ago</div>
                                        </div>
                                    </a>
                                </li>
                                <li class="dropdown-footer text-center">
                                    <a href="javascript:;">View more</a>
                                </li>
                            </ul>
                        </li>                                        
                    @endif    

                    <li class="dropdown navbar-user">        
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                            <img src=" {{ Auth::user()->avatar }} " alt="" /> 
                            <span class="hidden-xs">{{ Auth::user()->name }}</span> <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu animated fadeInLeft">
                            @if (isset($itinerary))
                                <!-- somente se for o criador-->
                                @if ($itinerary->creator_id == Auth::user()->_id)
                                    <li><a href='#' onclick="inviteItinerary();"><i class="fa fa-facebook"></i> Convidar amigos</a></li>    
                                @endif    
                            @else
                                <li><a href="#modal-create-itinerary" data-toggle="modal" id="BtnCreateItinerary"> Criar Roteiro</a></li>                                  
                                <!--somente se existirem roteiros-->
                                <li><a href="#modal-show-itineraries" data-toggle="modal" id="BtnItineraries"> Meus Roteiros</a></li>                                
                                <li><a href="#modal-set-location" data-toggle="modal"><i class="fa fa-map-marker"></i> Alterar localização</a>                                
                            @endif    

                            <!--<li><a href="javascript:;">Edit Profile</a></li>
                            <li><a href="javascript:;"><span class="badge badge-danger pull-right">2</span> Inbox</a></li>
                            <li><a href="javascript:;">Calendar</a></li>
                            <li><a href="javascript:;">Setting</a></li>
                            <li class="divider"></li>
                            -->
                            <li><a href="#modal-filter-places" data-toggle="modal" id="BtnPlaces"><i class="fa fa-search"></i> Pesquisar pontos de interesse</a></li>                                                                                        
                            <li class="divider"></li>
                            <li><a href="/itinerary/logout"><i class="fa fa-sign-out"></i> Sair</a></li>
                        </ul>
                    </li>
                </ul>                
                <!-- end header navigation right -->
            </div>
            <!-- end container-fluid -->
        </div>
        <!-- end #header -->
@include('modal.create-itinerary')
@include('modal.set-location-map')
@include('modal.filter-places')
@include('modal.chat')
