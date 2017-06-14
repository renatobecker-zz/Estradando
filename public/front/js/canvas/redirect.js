FB.init({
    appId      : '1998894127063898',
    xfbml      : true,
    cookie     : true,
    status     : true,
    version    : 'v2.8'
});

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/pt_BR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));    

function getFacebookToken(callback) {
	FB.getLoginStatus(function(response) {
  		if (response.status === 'connected') {
    		var obj = {
    			uid: response.authResponse.userID,
    			accessToken: response.authResponse.accessToken
    		}
    		if (callback) {
				callback(obj)
    		}    		
  		} else if (response.status === 'not_authorized') {
  			 if (callback) {
  			 	callback(null);
  			 }
  		} else {
  			 if (callback) {
  			 	callback(null);
  			 }
  		}
 	});
}

function deleteRequests(list, callback) {	
	for (var i = 0; i < list.length; i++) {
	  	FB.api(list[i], 'delete', function(response) {
	  		if (callback) {
	  			callback();
	  		}
  		});
	}
}

function getAllUrlParams(url) {
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  var obj = {};
  if (queryString) {
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      var a = arr[i].split('=');
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];
      if (obj[paramName]) {
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        if (typeof paramNum === 'undefined') {
          obj[paramName].push(paramValue);
        }
        else {
          obj[paramName][paramNum] = paramValue;
        }
      }
      else {
        obj[paramName] = paramValue;
      }
    }
  }
  return obj;
}

getFacebookToken(function(data){
  var default_url = 'https://estradando.com.br';
	if (data) {
		var params = getAllUrlParams().request_ids;
		var decoded = decodeURIComponent(params);
		var list = decoded.split(',');
		if ((list) && (list.length > 0)) {
			var requestId = list[0];
			FB.api('/'+requestId, function(response){ 
                if ((response) && (!response.error) && (response.to)) {
                    var redirect_url = response.data + '/' + response.to.id;
                    var redirect_message = response.message;
                    deleteRequests(list, function(){
                        if (redirect_url) {
                            var btn = document.getElementsByName("btn-accept-invite");                            
                            if ((btn) && (btn.length > 0)) {
                              btn[0].href = redirect_url;
                            }
                            var msgText = document.getElementsByName("itinerary-name");                            
                            if ((msgText) && (msgText.length > 0)) {
                              msgText[0].textContent = redirect_message;
                            }
                            return;
                        }   
                    });             
                }
			}); 
        }	
    }
})
