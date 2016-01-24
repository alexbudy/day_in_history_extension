var optionValues = {}

$(document).ready(function(){ 
	$('body').hide();
	chrome.storage.sync.get({
	        'show-fact-newtab' : true, //default values here
	        'hide-creator-url' : false,
	        'rotate-facts-in-session' : false,
	    	'showYrOnWhichLine' : 'factLineId'

	    }, function(items) {
            optionValues = items
        	$('body').show();
            centerFact()
	});
});

function centerFact() {
	$('#bodyDiv').css({
        position: 'absolute',
        left: ($(window).width() - $('#bodyDiv').outerWidth())/2,
        top:  ($(window).height() - $('#bodyDiv').outerHeight())/2 - 75
    });

    $('#settings-img-div').css({
    	left: ($('#changeOptionsLink').position().left - $('#settings-img-div').width() - 3) 
    });

    // It takes a moment for the Chrome query/update so sometimes there is a flash of content
    // Hiding the Body makes it look blank/white until either redirected or shown
	$('body').hide();

	if (optionValues['hide-creator-url']) { // optionValues is global, comes from functionality.js
		$('#creatorUrl').hide()
	}

	if(!optionValues['show-fact-newtab']) {

		// Get the current Tab
		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
			var active = tabs[0].id;
          
            // Set the URL to the Local-NTP (New Tab Page)
			chrome.tabs.update(active, { url: "chrome-search://local-ntp/local-ntp.html" }, function() { });
		});

	// App is ON, show custom content
	} else {
		$('body').show();

	}
}

window.onresize = function(){ 
	centerFact()
}