function saveOptions() {
	var obj = {}
	obj[this.id] = this.checked

	chrome.storage.sync.set(obj)
}

// radio box options
function saveRadioOpts() {
	var obj = {}
	obj['showYrOnWhichLine'] = this.id

	chrome.storage.sync.set(obj)
}

chrome.storage.sync.get({
        'show-fact-newtab' : true, //default values here
        'hide-creator-url' : false,
        'rotate-facts-in-session' : false,
    	'showYrOnWhichLine' : 'factLineId'
    }, function(items) {
		var chkBoxes=document.getElementsByName("options")
		var radioBoxes=document.getElementsByName("yrOnOptions")

		for (var i = 0; i < chkBoxes.length; i++) {
			var chkBox = chkBoxes[i]
			chkBox.addEventListener('click', saveOptions)

			chkBox.checked = items[chkBox.id]
		}

		for (var i = 0; i < radioBoxes.length; i++) {
			var radioBox = radioBoxes[i]
			radioBox.addEventListener('click', saveRadioOpts)
			
			if (items['showYrOnWhichLine'] == radioBox.id) {
				radioBox.checked = true
			}
		}

});


