var getDistanceBetweenLocations = function(latOrig, longOrig, latDest, longDest) {
	var p1 = new google.maps.LatLng(latOrig, longOrig);
	var p2 = new google.maps.LatLng(latDest, longDest);
	//Cálculo em Km's
	return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
}
