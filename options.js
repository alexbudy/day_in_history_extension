function saveOptions() {
	localStorage[this.id] = this.checked
}

var defaults = {
	'show-fact-newtab' : true,
	'hide-creator-url' : false,
	'rotate-facts-in-session' : false
}

var chkBoxes=document.getElementsByName("options")
for (var i = 0; i < chkBoxes.length; i++) {
	var chkBox = chkBoxes[i]
	chkBox.addEventListener('click', saveOptions)

	chkBox.checked = (localStorage[chkBox.id] == 'true') || 
						(!(chkBox.id in localStorage) && defaults[chkBox.id])
}

// radio box options
function saveRadioOpts() {
	localStorage['showYrOnWhichLine'] = this.id
}

var radioBoxes=document.getElementsByName("yrOnOptions")
for (var i = 0; i < radioBoxes.length; i++) {
	var radioBox = radioBoxes[i]
	radioBox.addEventListener('click', saveRadioOpts)
	
	if (!('showYrOnWhichLine' in localStorage) && radioBox.id == 'headerLineId') { // default value
		radioBox.checked = true
	} else if (localStorage['showYrOnWhichLine'] == radioBox.id) {
		radioBox.checked = true
	}
}