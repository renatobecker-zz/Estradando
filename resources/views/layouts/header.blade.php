        <!-- begin #header -->
        <div id="header" class="header navbar navbar-default navbar-fixed-top">
            <!-- begin container-fluid -->
            <div class="container-fluid">
                <div class="navbar-header hidden-xs">
                    <a href="javascript:;" class="navbar-brand">
                        <span class="navbar-logo"></span> 
                        @if (isset($itinerary))
                            Estradando - {{ $itinerary->name }}
                        @else
                            Estradando      
                        @endif
                    </a>
                </div>
                
                <!-- begin header navigation right -->
                <ul class="nav navbar-nav navbar-right">
                    @if (isset($itinerary))
                    <li class="dropdown" id="dropdown-users">
                        <a href="javascript:;" data-toggle="dropdown" id="users-badge" class="dropdown-toggle f-s-14">
                            <i class="fa fa-group"></i>                                
                        </a>
                        <ul id="users-list" class="dropdown-menu media-list dropdown-menu-left animated fadeInDown">
                        </ul>
                    </li>                                        
                    <li>
                        <a href="#modal-chat" data-toggle="modal" id="chat-badge" class="dropdown-toggle f-s-14">
                            <i class="fa fa-commenting-o fa-fw"></i>
                        </a>                    
                    </li>
                    <li class="dropdown" id="dropdown-notications">
                        <a href="javascript:;" data-toggle="dropdown" id="notifications-badge" class="dropdown-toggle f-s-14">
                            <i class="fa fa-bell-o"></i>                                
                        </a>
                        <ul id="notifications-list" class="dropdown-menu media-list dropdown-menu-left animated fadeInDown">
                        </ul>
                    </li>                                        
                    @endif    

                    <li class="dropdown navbar-user">        
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                            <img src=" {{ Auth::user()->avatar }} " alt="" /> 
                            <span class="">{{ Auth::user()->name }}</span> <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu animated fadeInLeft">
                            <!--li class="divider"></li>-->
                            <li><a href="/itinerary/logout"><i class="fa fa-sign-out"></i> Sair</a></li>
                        </ul>
                    </li>
                </ul>                
                <!-- end header navigation right -->
            </div>
            <!-- end container-fluid -->
        </div>
        <!-- end #header -->
        @include('modal.chat')
