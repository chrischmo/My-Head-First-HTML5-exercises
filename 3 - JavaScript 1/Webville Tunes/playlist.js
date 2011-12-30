window.onload = init;
function init() {
	var button = document.getElementById("addButton");
	button.onclick = handleButtonClick;
	loadPlaylist();
	}
function handleButtonClick() {
	var textInput = document.getElementById("songTextInput");
	var songName = textInput.value;
	if (songName == ""){
		alert("Nothing to add - please enter a song name!");
	} else {
		var li = document.createElement("li");
		li.innerHTML = songName;
		var ul = document.getElementById("playlist");
		ul.appendChild(li);
		save(songName);
		}
	}