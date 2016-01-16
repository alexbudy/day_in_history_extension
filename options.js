function saveOptions() {
	localStorage[this.id] = this.checked
}

var defaults = {
	'show-fact-newtab' : true,
	'hide-creator-url' : false,
}

var chkBoxes=document.getElementsByName("options")
for (var i = 0; i < chkBoxes.length; i++) {
	var chkBox = chkBoxes[i]
	chkBox.addEventListener('click', saveOptions)

	chkBox.checked = localStorage[chkBox.id] || defaults[chkBox.id]
}

function saveRadioOpts() {
	localStorage[this.]
}
radiobtn = document.getElementById("theid");
radiobtn.checked = true;