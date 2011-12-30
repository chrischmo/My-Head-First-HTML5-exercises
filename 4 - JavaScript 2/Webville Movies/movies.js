window.onload = init;

function init() {
	movie1 = new Movie("Plan 9 from Outer Space", "Cult Classic", 5, ["3:00pm", "7:00pm", "11:00pm"]);
	movie2 = new Movie("Forbidden Planet", "Classic Sci-Fi", 3, ["5:00pm", "9:00pm"]);
	movie3 = new Movie("Fear and Loathing in Las Vegas", "Cult Classic", 5, ["1:00pm", "3:00pm", "11:00pm"]);
	
	alert(movie1.getNextShowing());
	alert(movie2.getNextShowing());
	alert(movie3.getNextShowing());
}

function Movie (title, genre, rating, showtimes) {
	this.title = title;
	this.genre = genre;
	this.rating = rating;
	this.showtimes = showtimes;
	
	this.getNextShowing = function() {
		var now = new Date().getTime();
		for (var i = 0; i < this.showtimes.length; i++) {
		var showtime = getTimeFromString(this.showtimes[i]);
			if ((showtime - now) > 0) {
				return "Next showing of " + this.title + " is " + this.showtimes[i];
			}
		}
	};
}

function getTimeFromString(timeString) {
	var theTime = new Date();
	var time = timeString.match(/(\d+)(?::(\d\d))?\s*(p?)/);
	theTime.setHours( parseInt(time[1]) + (time[3] ? 12 : 0) );
	theTime.setMinutes( parseInt(time[2]) || 0 );
	return theTime.getTime();
}