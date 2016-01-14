function closeScreen() {
	window.close()
}

$(document).ready(function(){ 
	document.getElementById("closeSpn").addEventListener("click", closeScreen);
})