window.onload = getMyLocation;

function getMyLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayLocation, displayError);
	} else {
		alert("Oops, no geolocation support!");
	}
}

function displayLocation(position) { 
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	
	// shows the user's position
	var div = document.getElementById("location");
	div.innerHTML = "You are at Latitude: " + latitude + ", Logitude: " + longitude;
	div.innerHTML += " (with " + position.coords.accuracy + " meters accuracy)"; 
	
	// added this part to display the distance to WickedlySmart HQ
	var km = computeDistance(position.coords, ourCoords);
	var distance = document.getElementById("distance");
	distance.innerHTML = "You are " + km + " km apart from the WickedlySmart HQ";
	
	// this part is responsible for displaying the user position on a map from Google Maps
	showMap(position.coords);
} 

function displayError(error){
	var errorTypes = {
		0: "Unknown error",
		1: "Permission denied by user",
		2: "Position not available",
		3: "Request timed out"
	};
	var errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 2) {
		errorMessage = errorMessage + " " + error.message;
	}
	
	var div = document.getElementById("location");
	div.innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);

	var radius = 6371; // radius of the Earth in km
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
					Math.cos(startLatRads) * Math.cos(destLatRads) *
					Math.cos(startLongRads - destLongRads)) * radius;
					
	return distance;
}

// helper function for computeDistance
function degreesToRadians(degrees) {
	var radians = (degrees * Math.PI)/180;
	return radians;
}

// coordinates of the WickedlySmart HQ
var ourCoords = {
	latitude: 47.624851,
	longitude: -122.52099
}

// global map variable for Google Maps
var map;

function showMap(coords) {
	// initialize arguments for Google Maps
	var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
	var mapOptions = {
		zoom: 10,
		center: googleLatAndLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	// display map
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
	
	// add marker to map
	var title = "Your location";
	var content = "Latitude: " + coords.latitude + ", Longitude: " + coords.longitude;
	addMarker(map, googleLatAndLong, title, content);
}

function addMarker(map, latlong, title, content) {
	var markerOptions = {
		position: latlong,
		map: map,
		title: title,
		clickable: true
	};
	var marker = new google.maps.Marker(markerOptions);
	
	var infoWindowOptions = {
		content: content,
		position: latlong,
	}
	var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	
	google.maps.event.addListener(marker, "click", function() {
		infoWindow.open(map);
	});
}