window.onload = init;

function init() {
	alert(movie1.getNextShowing());
	var nextShowing = getNextShowing(movie2);
	alert(nextShowing);
	var nextShowing = getNextShowing(movie3);
	alert(nextShowing);
}

var movie1 = {
	title: "Plan 9 from Outer Space",
	genre: "Cult Classic",
	rating: 5,
	showtimes: ["3:00pm", "7:00pm", "11:00pm"],
	
	getNextShowing: function() {
	var now = new Date().getTime();
	for (var i = 0; i < this.showtimes.length; i++) {
		var showtime = getTimeFromString(this.showtimes[i]);
		if ((showtime - now) > 0) {
			return "Next showing of " + this.title + " is " + this.showtimes[i];
		}
	}
	return null;
	}
}
	
var movie2 = {
	title: "Forbidden Planet",
	genre: "Classic Sci-Fi",
	rating: 5,
	showtimes: ["5:00pm", "9:00pm"]
	}
	
var movie3 = {
	title: "Fear and Loathing in Las Vegas",
	genre: "Cult Classic",
	rating: 5,
	showtimes: ["1:00pm", "3:00pm", "11:00pm"]
	}
	
function getNextShowing(movie) {
	var now = new Date().getTime();
	
	for (var i = 0; i < movie.showtimes.length; i++) {
		var showtime = getTimeFromString(movie.showtimes[i]);
		if ((showtime - now) > 0) {
			return "Next showing of " + movie.title + " is " + movie.showtimes[i];
		}
	}
	return null;
}	

function getTimeFromString(timeString) {
	var theTime = new Date();
	var time = timeString.match(/(\d+)(?::(\d\d))?\s*(p?)/);
	theTime.setHours( parseInt(time[1]) + (time[3] ? 12 : 0) );
	theTime.setMinutes( parseInt(time[2]) || 0 );
	return theTime.getTime();
}
