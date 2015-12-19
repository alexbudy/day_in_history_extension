var histIds = [] // all ids for current date
var currentFactListIdx // index for displayed fact

// dates listed as 'yyyy-mm-dd'
var today
var selectedDate

window.onload = function() {
	today = get_today_date()
	selectedDate = today //initially
	
	setHistIdsAndIdx()
	setSpansForSelectedDate()

	addButtonListeners()
}

function addButtonListeners() {
	document.getElementById("showAnotherBtn").addEventListener("click", showAnotherFact);
	document.getElementById("goBackBtn").addEventListener("click", goDayBack);
	document.getElementById("goFwdBtn").addEventListener("click", goDayForward);
}


function setSpansForSelectedDate() {
	setHeaderText()	
	setYearText()
	setFactText()
}

// onclick functions for the three buttons: tomorrow, yesterday, and another (today)
function showAnotherFact() {
	console.log('btn clicked')

	currentFactListIdx++;
	if (currentFactListIdx >= histIds.length) {
		resetCurrentFactIdx()
	}

	setSpansForSelectedDate()
}

function resetCurrentFactIdx() {
	currentFactListIdx = 0
}

function getCurrentFact() {
	return todayinhistory[histIds[currentFactListIdx]]
}

// left button was clicked
function goDayBack() {
	decrementDay()
	setHistIdsAndIdx()
	setSpansForSelectedDay()
}

// right button was clicked
function goDayForward() {
	incrementDay()
	setHistIdsAndIdx()
	setSpansForSelectedDay()
}

function incrementDay() {
	// TODO
}

function decrementDay() {
 	// TODO
 }

// sets history ids for the selected date
function setHistIdsAndIdx() {
	histIds = generateHistIdsArrayForSelectedDate()
	resetCurrentFactIdx()
}

// this function generates array of ids for the date today, and shifts based on year
// ex: if day starts at id 20 and goes to 25, array will be [20, 21, 22, 23, 24, 25],
// 		then shifted by [current year] mod [len(array)]
function generateHistIdsArrayForSelectedDate() {
	var startIdx = bin_search_get_start_idx(get_month_day_from_full_date(selectedDate))

	var ids = [startIdx]

	var idx = startIdx+1
	while (date_compare_ignore_yrs(selectedDate, todayinhistory[idx].date) == 0) {
		ids.push(idx)
		idx++;
	}

	// now shift here -> this preserves consistency across all users
	var yr = parseInt(selectedDate.substring(0, 3))
	var shftAmt = yr % ids.length

	while (shftAmt > 0) {
		ids.push(ids.shift())
		shftAmt--
	}

	return ids
}

// Today/Tomorrow/Yesterday/'Jan 26' in History,

function setHeaderText() {
	document.getElementById('span_header').innerHTML = "Today In History..." + getCurrentFact().date
}

function setYearText() {
	document.getElementById('span_year').innerHTML = getCurrentFact().date.substring(0, 4)
}

function setFactText() {
	document.getElementById('span_fact').innerHTML = getCurrentFact().event	
}

// returned as 'yyyy-mm-dd'
function get_today_date() {
	var today = new Date()
	var dd = today.getDate()
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd<10) {
		dd = '0'+dd
	}
	if (mm<10) {
		mm = '0'+mm
	}

	return yyyy + "-" + mm + "-" + dd
}

// index of todayinhistory[] array
// starting_date = 'mm-dd'
function bin_search_get_start_idx(date_to_match) {
	var startIndex  = 0,
        stopIndex   = todayinhistory.length - 1,
        middle      = Math.floor((stopIndex + startIndex)/2);

    var cnt = 0
	while (date_compare(date_to_match, get_month_day_from_list(middle)) != 0 && startIndex < stopIndex) {
		cnt++;
		if (date_compare(date_to_match, get_month_day_from_list(middle)) == 1) { // first date larger
			startIndex = middle + 1;
		} else {
			stopIndex = middle - 1;
		}

		middle = Math.floor((stopIndex+startIndex) / 2)
	}

	while (middle > 0 && date_compare(date_to_match, get_month_day_from_list(middle-1)) == 0) {
		middle--;
	}

	//console.log("Finding index of " + date_to_match + " took " + cnt + " loops, index found: " + middle)
	return middle;
}

function get_month_day_from_list(idx) {
	return get_month_day_from_full_date(todayinhistory[idx].date)
}

// protect if full_date doesnt have yr
// returns in form 'mm-dd'
function get_month_day_from_full_date(full_date) {
	if (full_date.split('-').length > 2) {
		return full_date.substring(5)
	} else {
		return full_date
	}
}

// same as function below, but if yrs are present in dates ignore them
function date_compare_ignore_yrs(d1, d2) {
	if (d1.split('-').length > 2) {
		d1 = get_month_day_from_full_date(d1)
	} 
	if (d2.split('-').length > 2) {
		d2 = get_month_day_from_full_date(d2)
	}

	return date_compare(d1, d2)
}

// compare two dates such as '03-26' and '07-26' -> return 1 if first larger, 2 if second, 0 if equal
function date_compare(d1, d2) {
	var m1 = parseInt(d1.split('-')[0])
	var m2 = parseInt(d2.split('-')[0])

	if (m1 > m2) {
		return 1
	} else if (m1 < m2) {
		return 2
	} 

	var day1 = parseInt(d1.split('-')[1])
	var day2 = parseInt(d2.split('-')[1])

	if (day1 > day2) {
		return 1
	} else if (day1 < day2) {
		return 2
	} else {
		return 0
	}
}

// ran this function just to test that my binary search works
function test_search() {
	var daysInMonth = [null, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

	for (var month = 1; month <= 12; month++) {
		for (var day = 1; day <= daysInMonth[month]; day++) {
			var month_day = month + "-" + day;
			var idx = bin_search_get_start_idx(month_day)

			if (idx == 0) {
				continue
			}
			if (date_compare(month_day, get_month_day_from_list(idx)) == 0 
				&& date_compare(month_day, get_month_day_from_list(idx-1)) == 1) {
				// no problem here
			} else {
				console.log("problem for " + month_day + ", index found: " + idx)
			}
		}
	}
}