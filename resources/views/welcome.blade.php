<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8"> <![endif]-->
<!--[if !IE]><!-->
<html lang="pt_BR">
<!--<![endif]-->
<head>
	<meta charset="utf-8" />
	<title>Estradando | Bem-vindo!</title>
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
	<meta content="" name="description" />
	<meta content="" name="author" />
	
	<!-- ================== BEGIN BASE CSS STYLE ================== -->
	<link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
	<link href="front/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
	<link href="front/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
	<link href="front/css/animate.min.css" rel="stylesheet" />
	<link href="front/css/style.min.css" rel="stylesheet" />
	<link href="front/css/style-responsive.min.css" rel="stylesheet" />
	<link href="front/css/theme/orange.css" id="theme" rel="stylesheet" />
	<!-- ================== END BASE CSS STYLE ================== -->

    <!-- ================== BEGIN PAGE CSS ================== -->
    <link href="assets/plugins/bootstrap-social/bootstrap-social.css" rel="stylesheet" />
    <!-- ================== END PAGE CSS ================== -->
	
	<!-- ================== BEGIN BASE JS ================== -->
	<script src="front/plugins/pace/pace.min.js"></script>
	<!-- ================== END BASE JS ================== -->
    <style>
        /*
        .img-full-screen {
            height: 100%;
            width: 100%;
        }*/
        .content-bg img {
            width: 100%;
            height: 100%;
        }

        #facebook-btn-style {
            line-height: 50px;
        }
    </style>
</head>
<body data-spy="scroll" data-target="#header-navbar" data-offset="51">
    <!-- begin #page-container -->
    <div id="page-container" class="fade">
        <!-- begin #header -->
        <div id="header" class="header navbar navbar-transparent navbar-fixed-top">
            <!-- begin container -->
            <div class="container">
                <!-- begin navbar-header -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#header-navbar">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a href="#home" class="navbar-brand">
                        <span class="brand-logo"></span>
                        <span class="brand-text">
                            E<span class="text-theme">s</span>tradando
                        </span>
                    </a>
                </div>
                <!-- end navbar-header -->
                <!-- begin navbar-collapse -->
                <div class="collapse navbar-collapse" id="header-navbar">
                    
                    <ul class="nav navbar-nav navbar-right">                    
                        <li class="active dropdown">
                            <li><a href="#service" data-click="scroll-to-target">Funcionalidades</a></li>
                        <!--
                            <a href="#home" data-click="scroll-to-target" data-toggle="dropdown">HOME <b class="caret"></b></a>
                            <ul class="dropdown-menu dropdown-menu-left animated fadeInDown">
                                <li><a href="index.html">Page with Transparent Header</a></li>
                                <li><a href="index_inverse_header.html">Page with Inverse Header</a></li>
                                <li><a href="index_default_header.html">Page with White Header</a></li>
                                <li><a href="extra_element.html">Extra Element</a></li>
                            </ul>
                        </li>
                        <li><a href="#about" data-click="scroll-to-target">ABOUT</a></li>
                        <li><a href="#team" data-click="scroll-to-target">TEAM</a></li>

                        <li><a href="#service" data-click="scroll-to-target">SERVICES</a></li>
                        <li><a href="#work" data-click="scroll-to-target">WORK</a></li>
                        <li><a href="#client" data-click="scroll-to-target">CLIENT</a></li>
                        <li><a href="#pricing" data-click="scroll-to-target">PRICING</a></li>
                        <li><a href="#contact" data-click="scroll-to-target">CONTACT</a></li                    
                        -->
                    </ul>                    
                </div>
                <!-- end navbar-collapse -->
            </div>
            <!-- end container -->
        </div>
        <!-- end #header -->
        
        <!-- begin #home -->
        <div id="home" class="content has-bg home">
            <!-- begin content-bg -->
            <div class="content-bg">
                <img src="front/img/map-location-pin.jpg" alt="Home" />
            </div>
            <!-- end content-bg -->
            <!-- begin container -->
            <div class="container home-content">
                <h1>Bem-vindo ao Estradando</h1>
                <h4>Uma nova maneira de criar roteiros para viagens e passeios</h4>
                <a href="{{ url('/login/facebook') }}" class="btn btn-social btn-facebook"><i id="facebook-btn-style" class="fa fa-facebook"></i> Login com Facebook</a>
                <br />
                <br />
                Faça login com sua conta do Facebook para ter uma melhor experiência no Estradando
            </div>
            <!-- end container -->
        </div>
        <!-- end #home -->        
        <!-- begin services -->
        <div id="service" class="content" data-scrollview="true">
            <!-- begin container -->
            <div class="container" data-animation="true" data-animation-type="fadeInDown">
                <h2 class="content-title">Funcionalidades e Recursos</h2>
                <!-- begin row -->
                <div class="row p-t-30">
                    <!-- begin col-3 -->
                    <div class="col-md-3 col-sm-6">
                        <div class="service service-vertical">
                            <div class="icon bg-theme" data-animation="true" data-animation-type="bounceIn"><i class="fa fa-code"></i></div>
                            <div class="info">
                                <h4 class="title">Re-usable Code</h4>
                                <p class="desc">Aenean et elementum dui. Aenean massa enim, suscipit ut molestie quis, pretium sed orci. Ut faucibus egestas mattis.</p>
                            </div>
                        </div>
                    </div>
                    <!-- end col-3 -->
                    <!-- begin col-3 -->
                    <div class="col-md-3 col-sm-6">
                        <div class="service service-vertical">
                            <div class="icon bg-theme" data-animation="true" data-animation-type="bounceIn"><i class="fa fa-paint-brush"></i></div>
                            <div class="info">
                                <h4 class="title">Clean & Careful Design</h4>
                                <p class="desc">Etiam nulla turpis, gravida et orci ac, viverra commodo ipsum. Donec nec mauris faucibus, congue nisi sit amet, lobortis arcu.</p>
                            </div>
                        </div>
                    </div>
                    <!-- end col-3 -->
                    <!-- begin col-3 -->
                    <div class="col-md-3 col-sm-6">
                        <div class="service service-vertical">
                            <div class="icon bg-theme" data-animation="true" data-animation-type="bounceIn"><i class="fa fa-file"></i></div>
                            <div class="info">
                                <h4 class="title">Well Documented</h4>
                                <p class="desc">Ut vel laoreet tortor. Donec venenatis ex velit, eget bibendum purus accumsan cursus. Curabitur pulvinar iaculis diam.</p>
                            </div>
                        </div>
                    </div>
                    <!-- end col-3 -->
                    <!-- begin col-3 -->
                    <div class="col-md-3 col-sm-6">
                        <div class="service service-vertical">
                            <div class="icon bg-theme" data-animation="true" data-animation-type="bounceIn"><i class="fa fa-code"></i></div>
                            <div class="info">
                                <h4 class="title">Re-usable Code</h4>
                                <p class="desc">Aenean et elementum dui. Aenean massa enim, suscipit ut molestie quis, pretium sed orci. Ut faucibus egestas mattis.</p>
                            </div>
                        </div>
                    </div>
                    <!-- end col-3 -->
                </div>
                <!-- end row -->
            </div>
            <!-- end container -->
        </div>
        <!-- end services -->
        
        <!-- begin #footer -->
        <div id="footer" class="footer">
            <div class="container">
                <div class="footer-brand">
                    <div class="footer-brand-logo"></div>
                    Estradando
                </div>
                <p>
                    &copy; Copyright 2017 <br />                    
                </p>
                <p class="social-list">
                    <a href="#"><i class="fa fa-facebook fa-fw"></i></a>
                    <!--
                    <a href="#"><i class="fa fa-instagram fa-fw"></i></a>
                    <a href="#"><i class="fa fa-twitter fa-fw"></i></a>
                    <a href="#"><i class="fa fa-google-plus fa-fw"></i></a>
                    <a href="#"><i class="fa fa-dribbble fa-fw"></i></a>
                    -->
                </p>
            </div>
        </div>
        <!-- end #footer -->
        
        <!-- begin theme-panel -->
        <!--
        <div class="theme-panel">
            <a href="javascript:;" data-click="theme-panel-expand" class="theme-collapse-btn"><i class="fa fa-cog"></i></a>
            <div class="theme-panel-content">
                <ul class="theme-list clearfix">
                    <li><a href="javascript:;" class="bg-purple" data-theme="purple" data-click="theme-selector" data-toggle="tooltip" data-trigger="hover" data-container="body" data-title="Purple">&nbsp;</a></li>
                    <li><a href="javascript:;" class="bg-blue" data-theme="blue" data-click="theme-selector" data-toggle="tooltip" data-trigger="hover" data-container="body" data-title="Blue">&nbsp;</a></li>
                    <li class="active"><a href="javascript:;" class="bg-green" data-theme="default" data-click="theme-selector" data-toggle="tooltip" data-trigger="hover" data-container="body" data-title="Default">&nbsp;</a></li>
                    <li><a href="javascript:;" class="bg-orange" data-theme="orange" data-click="theme-selector" data-toggle="tooltip" data-trigger="hover" data-container="body" data-title="Orange">&nbsp;</a></li>
                    <li><a href="javascript:;" class="bg-red" data-theme="red" data-click="theme-selector" data-toggle="tooltip" data-trigger="hover" data-container="body" data-title="Red">&nbsp;</a></li>
                </ul>
            </div>
        </div>
        -->
        <!-- end theme-panel -->
    </div>
    <!-- end #page-container -->
	
	<!-- ================== BEGIN BASE JS ================== -->
	<script src="front/plugins/jquery/jquery-1.9.1.min.js"></script>
	<script src="front/plugins/jquery/jquery-migrate-1.1.0.min.js"></script>
	<script src="front/plugins/bootstrap/js/bootstrap.min.js"></script>
	<!--[if lt IE 9]>
		<script src="front/crossbrowserjs/html5shiv.js"></script>
		<script src="front/crossbrowserjs/respond.min.js"></script>
		<script src="front/crossbrowserjs/excanvas.min.js"></script>
	<![endif]-->
	<script src="front/plugins/jquery-cookie/jquery.cookie.js"></script>
	<script src="front/plugins/scrollMonitor/scrollMonitor.js"></script>
	<script src="front/js/apps.min.js"></script>
	<!-- ================== END BASE JS ================== -->
	
	<script>    
	    $(document).ready(function() {
	        App.init();
	    });
	</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-53034621-1', 'auto');
  ga('send', 'pageview');

</script>
</body>
</html>
